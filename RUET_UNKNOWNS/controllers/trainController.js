const Train = require('../models/Train');

exports.getTrainsController = async (req, res) => {
    try {
        const trains = await Train.find();

        const responseTrains = trains.map(train => {
            return {
                train_id: train.train_id,
                train_name: train.train_name,
                capacity: train.capacity,
                service_start: train.stops[0].departure_time,
                service_ends: train.stops[train.stops.length - 1].arrival_time,
                num_stations: train.stops.length
            }
        });

        res.json({ trains: responseTrains });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

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

Successful Response
{
"train_id": 1,
"train_name": "Mahanagar 123",
"capacity": 200,
"service_start": "07:00",
"service_ends": "08:30",
"num_stations": 3
}

*/

exports.createTrainController = async (req, res) => {
    const { train_id, train_name, capacity, stops } = req.body;
    const train = new Train({ train_id, train_name, capacity, stops });
    try {
        const newTrain = await train.save();

        responseTrain = {
            train_id: newTrain.train_id,
            train_name: newTrain.train_name,
            capacity: newTrain.capacity,
            service_start: newTrain.stops[0].departure_time,
            service_ends: newTrain.stops[newTrain.stops.length - 1].arrival_time,
            num_stations: newTrain.stops.length
        }

        res.status(201).json(responseTrain);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}