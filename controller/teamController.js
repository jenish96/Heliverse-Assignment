const Team = require("../models/Team");
const User = require("../models/User");

const getTeam = async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('members');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.status(200).json({ team });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const getAllTeam = async (req, res) => {
    try {
        const team = await Team.find().populate('members');
        if (!team) {
            return res.status(404).json({ error: 'Team not found' });
        }
        res.status(200).json({ team });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

const newTeam = async (req, res) => {
    try {
        const payload = req.body;
        const users = await User.find({ _id: { $in: payload.members } })
        const uniqueDomains = new Set(users.map(user => user.domain));
        const allAvailable = users.every(user => user.available);

        if (uniqueDomains.size === users.length && allAvailable) {
            const team = new Team({ name: req.body.name, members: users });
            await team.save();

            return res.status(201).json({ team });
        } else {
            return res.status(400).json({ error: 'Selected users must have unique domains and all be available' });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

module.exports = { getTeam, getAllTeam, newTeam }