/*
{
"train_id": 1,
"train_name": "Mahanagar 123",
"capacity": 200,
"stops": [
{
"station_id": 1,
"arrival_time": null,
"departure_time": "07:00",
"fare": 0
},
{
"station_id": 3,
"arrival_time": "07:45",
"departure_time": "07:50",
"fare": 20
},
{
"station_id": 4,
"arrival_time": "08:30",
"departure_time": null,
"fare": 30
}
]
}
*/
const { Schema, model } = require('mongoose');


const trainSchema = new Schema({
    train_id: {
        type: Number,
        required: true,
    },
    train_name: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    stops: [
        {
            station_id: {
                type: Number,
                required: true,
            },
            arrival_time: {
                type: String,
                required: false,
            },
            departure_time: {
                type: String,
                required: false,
            },
            fare: {
                type: Number,
                required: true,
            }
        }
    ]
},
    {
        timestamps: true,
    });

const Train = model('Train', trainSchema);
module.exports = Train;

