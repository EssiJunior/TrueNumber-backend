const usersModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

module.exports.register = async (req, res) => {
    try {
        const { name, email, phoneNumber, password, role } = req.body;

        const existingUser = await usersModel.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'Email already in use.' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await usersModel.create({
            name,
            email,
            phoneNumber,
            role,
            password: hashedPassword,
        });

        res.status(201).json({ msg: 'Account created.', user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed.' });
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await usersModel.findOne({ email });

        if (!user) return res.status(400).json({ msg: 'Invalid credentials.' });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ msg: 'Invalid credentials.' });

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed.' });
    }
};

module.exports.logout = async (req, res) => {
    res.status(200).json({ msg: 'Logged out successfully.' });
};