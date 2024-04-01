const User = require("../models/User")

const getUsers = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const perPage = parseInt(req.query.perPage) || 20;
        const startIndex = (page - 1) * perPage;
        const endIndex = startIndex + perPage;

        const data = await User.find();
        const totalPages = Math.ceil(data.length / perPage);
        const users = data.slice(startIndex, endIndex);

        res.status(200).json({
            page,
            perPage,
            totalPages,
            totalUsers: users.length,
            users
        });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await User.find({ id: req.params.id });
        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
}

const getUserByName = async (req, res) => {
    try {
        const user = await User.find({
            "$or": [
                { "first_name": { $regex: req.params.name, $options: 'i' } },
                { "last_name": { $regex: req.params.name, $options: 'i' } }
            ]
        });
        res.status(200).json({ user });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
}

const getFilterUsers = async (req, res) => {
    try {
        let filters = {};

        if (req.query.domain) filters.domain = { $in: req.query.domain.split(',') };
        if (req.query.gender) filters.gender = { $in: req.query.gender.split(',') };
        if (req.query.available) filters.available = req.query.available === 'true';

        const users = await User.find(filters);
        res.status(200).json({ users });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
}

const newUser = async (req, res) => {
    try {
        const payload = req.body;
        const user = await User.insertMany(payload);
        res.status(201).json({ "message": "User created Successfully" });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const payload = req.body;
        const user = await User.updateMany({ id: req.params.id }, payload);
        res.status(200).json({ "message": "User updated Successfully" });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const user = await User.deleteOne({ id: req.params.id });
        res.status(200).json({ "message": "User deleted Successfully" });
    } catch (err) {
        res.status(400).json({ "error": err.message });
    }
}

module.exports = { getUsers, newUser, getUserById, updateUser, deleteUser, getUserByName, getFilterUsers }