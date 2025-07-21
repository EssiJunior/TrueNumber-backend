const usersModel = require('../models/users');

const jwt = require('jsonwebtoken');
const JWT_SECRET = "supersecretkey123"

module.exports.getCurrentUser = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        console.log("JWT_SECRET:", JWT_SECRET);
        console.log("token:", token);
        
        if (!token) return res.status(401).json({ msg: 'No token provided.' });

        let decoded;
        
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ msg: 'Invalid token.' });
        }

        const user = await usersModel.findById(decoded.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found.' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve user.' });
    }
};
module.exports.getCurrentUserBalance = async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) return res.status(401).json({ msg: 'No token provided.' });

        let decoded;
        try {
            decoded = jwt.verify(token, JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ msg: 'Invalid token.' });
        }

        const user = await usersModel.findById(decoded.id).select('-password');
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

module.exports.getUser = async (req, res) => {
    try {
        const user = await usersModel.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found.' });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve user.' });
    }
};

module.exports.updateUser = async (req, res) => {
    try {
        const updates = { username: req.body.username, email: req.body.email, phoneNumber: req.body.phoneNumber, role: req.body.role };

        const updatedUser = await usersModel.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!updatedUser) return res.status(404).json({ msg: 'User not found.' });

        res.status(200).json({ msg: 'User updated.', user: updatedUser });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update user.' });
    }
};
module.exports.deleteUser = async (req, res) => {
    try {
        const deletedUser = await usersModel.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ msg: 'User not found.' });

        res.status(200).json({ msg: `User ${deletedUser.username} deleted.` });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user.' });
    }
};
