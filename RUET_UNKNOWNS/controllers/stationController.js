const { response } = require('express');
const Station = require('../models/Station');
const Train = require('../models/Train');
const selectedFields = 'station_id station_name longitude latitude';

exports.getStationsController = async (req, res) => {
    try {
        const stations = await Station.find();

        const responseStations = stations.map(station => {
            return {
                station_id: station.station_id,
                station_name: station.station_name,
                longitude: station.longitude,
                latitude: station.latitude
            }
        });
        res.json({ stations: responseStations });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

exports.getStationByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const station = await Station.findOne({ station_id: id })
        if (!station)
            return res.status(404).json({ message: `station with id: ${id} was not found` });

        responseStation = {
            station_id: station.station_id,
            station_name: station.station_name,
            longitude: station.longitude,
            latitude: station.latitude
        }
        res.json(responseStation);
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

exports.createStationController = async (req, res) => {
    const { station_id, station_name, longitude, latitude } = req.body;
    const station = new Station({ station_id, station_name, longitude, latitude });
    try {
        const newStation = await station.save();

        const responseStation = {
            station_id: newStation.station_id,
            station_name: newStation.station_name,
            longitude: newStation.longitude,
            latitude: newStation.latitude
        }

        res.status(201).json(responseStation);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

/*
{
"station_id": 1,
"trains": [
{
"train_id": 1,
"arrival_time": null,
"departure_time": "07:00"
},
{
"train_id": 2,
"arrival_time": "06:55",
"departure_time": "07:00"
},
{
"train_id": 3,
"arrival_time": "07:30",
"departure_time": "08:00"
}
]
}
*/

exports.getTrainsbyStationIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const trains = await Train.find({ "stops.station_id": id });

        if (trains.length == 0) {
            return res.status(404).json({ message: `station with id: ${id} was not found` });
        }

        const responseTrains = trains.map(train => {
            return {
                train_id: train.train_id,
                arrival_time: train.stops.find(stop => stop.station_id == id).arrival_time,
                departure_time: train.stops.find(stop => stop.station_id == id).departure_time
            }
        }
        );
        res.json({ station_id: id, trains: responseTrains });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}