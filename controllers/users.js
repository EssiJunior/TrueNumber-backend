const usersModel = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';

module.exports.register = async (req, res) => {
    try {
        const { name, email, phoneNumber, password, balance, role } = req.body;

        const existingUser = await usersModel.findOne({ email });
        if (existingUser) return res.status(400).json({ msg: 'Email already in use.' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await usersModel.create({
            name,
            email,
            phoneNumber,
            role,
            balance,
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

module.exports.getUser = async (req, res) => {
    try {
        const user = await usersModel.findById(req.userId).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found.' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve user.' });
    }
};

module.exports.getUsers = async (req, res) => {
    try {
        const users = await usersModel.find().select('-password');
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve users.' });
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        const updates = { name: req.body.name, email: req.body.email, phoneNumber: req.body.phoneNumber, balance: req.body.balance, role: req.body.role };

        const updatedUser = await usersModel.findByIdAndUpdate(req.params.id, updates, { new: true }).select('-password');
        if (!updatedUser) return res.status(404).json({ msg: 'User not found.' });

        res.status(200).json({ msg: 'User updated.', user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user.' });
    }
};

module.exports.changeUserRole = async (req, res) => {
    try {
        const { role } = req.body;
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ msg: 'Invalid role.' });
        }

        const updatedUser = await usersModel.findByIdAndUpdate(req.params.id, { role }, { new: true }).select('-password');
        if (!updatedUser) return res.status(404).json({ msg: 'User not found.' });

        res.status(200).json({ msg: 'User role updated.', user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update role.' });
    }
};

module.exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await usersModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ msg: 'User not found.' });

        res.status(200).json({ msg: `User ${deletedUser.name} deleted.` });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user.' });
    }
};
