const User = require('../models/User');
const selectedFields = 'user_id user_name balance';

exports.getUsersController = async (req, res) => {
    // Get all users
    try {
        const users = await User.find();

        const responseUsers = users.map(user => {
            return {
                user_id: user.user_id,
                user_name: user.user_name,
                balance: user.balance
            }
        });

        res.json(responseUsers);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

exports.getUserByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ user_id: id })
        if (!user)
            return res.status(404).json({ message: `user with id: ${id} was not found` });

        responseUser = {
            user_id: user.user_id,
            user_name: user.user_name,
            balance: user.balance
        }

        res.json(responseUser);

    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

exports.createUserController = async (req, res) => {
    const { user_id, user_name, balance } = req.body;
    const user = new User({ user_id, user_name, balance });
    try {
        const newUser = await user.save();

        const responseUser = {
            user_id: newUser.user_id,
            user_name: newUser.user_name,
            balance: newUser.balance
        }

        res.status(201).json(responseUser);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
        // res.status(400).json({ message: error.message });
    }
}