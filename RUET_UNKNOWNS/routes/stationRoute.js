const router = require("express").Router();

const { getStationsController, getStationByIdController, createStationController, getTrainsbyStationIdController }
    = require("../controllers/stationController");

router.get("/", getStationsController);

router.post("/", createStationController);

// router.put("/:id", updateStationController);

router.get("/:id", getStationByIdController);

router.get("/:id/trains", getTrainsbyStationIdController);

module.exports = router;