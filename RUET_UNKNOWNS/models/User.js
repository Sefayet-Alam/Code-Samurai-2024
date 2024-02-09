/*
{
"user_id": integer, # user's numeric id
"user_name": string, # user's full name
"balance": integer # user's wallet balance
}
*/

const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    user_id: {
        type: Number,
        required: true,
    },
    user_name: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    }
},
    {
        timestamps: true,
    });

const User = model('User', userSchema);
module.exports = User;