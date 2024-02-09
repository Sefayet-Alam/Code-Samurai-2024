const User = require('../models/User');

/*
Return Data format

{
"wallet_id": integer, # user's wallet id
"balance": integer, # user's wallet balance
"wallet_user":
{
"user_id": integer, # user's numeric id
"user_name": string # user's full name
}
}
*/

exports.getWalletsController = async (req, res) => {
    try {
        const users = await User.find();
        const wallets = users.map(user => {
            return {
                wallet_id: user.user_id,
                balance: user.balance,
                wallet_user: {
                    user_id: user.user_id,
                    user_name: user.user_name
                }
            }
        });

        res.json({ wallets: wallets });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

exports.getWalletByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ user_id: id });
        if (!user)

            return res.status(404).json({ message: `wallet with id: ${id} was not found` });
        const wallet = {
            wallet_id: user.user_id,
            balance: user.balance,
            wallet_user: {
                user_id: user.user_id,
                user_name: user.user_name
            }
        }

        res.json(wallet);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

exports.updateWalletController = async (req, res) => {
    // Recharge the wallet if the recharge amount is 100 - 10000 and the user exists
    const { id } = req.params;
    const { recharge } = req.body;

    try {
        const user = await User.findOne({ user_id: id });
        if (!user)
            return res.status(404).json({ message: `wallet with id: ${id} was not found` });

        if (recharge < 100 || recharge > 10000)
            return res.status(400).json({ message: `invalid amount: ${recharge}` });

        user.balance += recharge;
        const updatedUser = await user.save();
        const wallet = {
            wallet_id: updatedUser.user_id,
            balance: updatedUser.balance,
            wallet_user: {
                user_id: updatedUser.user_id,
                user_name: updatedUser.user_name
            }
        }
        res.json(wallet);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}