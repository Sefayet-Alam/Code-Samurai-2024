const router = require("express").Router();

const { getUsersController, getUserByIdController, createUserController } = require("../controllers/userController");


router.get("/", getUsersController);
router.post("/", createUserController);
router.get("/:id", getUserByIdController);

module.exports = router;