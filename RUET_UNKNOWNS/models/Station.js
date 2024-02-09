/*
{
"station_id": integer, # station's numeric id
"station_name": string, # station's name
"longitude": float, # coordinate longitude
"latitude": float # coordinate latitude
}
*/
const { Schema, model } = require('mongoose');

const stationSchema = new Schema({
    station_id: {
        type: Number,
        required: true,
    },
    station_name: {
        type: String,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    latitude: {
        type: Number,
        required: true,
    }
},
    {
        timestamps: true,
    });

const Station = model('Station', stationSchema);
module.exports = Station;