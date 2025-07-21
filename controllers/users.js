const usersModel = require('../models/users');

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
