const { use } = require('../api/users');
const partyModel = require('../models/party');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey123';


module.exports.playGame = async (req, res) => {
    try {
        const { result, generatedNumber, newBalance, userId } = req.body;

        const newGame = await usersModel.create({
            result,
            generatedNumber,
            newBalance,
            userId
        });

        res.status(201).json({ msg: 'Party played', newGame: newGame });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Party not played', err });
    }
};

module.exports.getUserHistory = async (req, res) => {
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

        const history = await partyModel.find({ userId: decoded.id }).select('-_id -userId');
        res.status(200).json(history);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to retrieve history.' });
    }
};

module.exports.getAllHistory = async (req, res) => {
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

        if (decoded.role !== 'admin') {
            return res.status(403).json({ msg: 'Access denied. Admins only.' });
        }

        const history = await partyModel.find().select('-_id');
        res.status(200).json(history);
    } catch (err) {
        res.status(500).json({ msg: 'Failed to retrieve all history.' });
    }
};
