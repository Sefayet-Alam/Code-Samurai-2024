const router = require("express").Router();

const { getTrainsController, getTrainByIdController, createTrainController, updateTrainController }
    = require("../controllers/trainController");

router.get("/", getTrainsController);

router.post("/", createTrainController);

// router.put("/:id", updateTrainController);

module.exports = router;