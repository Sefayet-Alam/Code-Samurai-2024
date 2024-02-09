const router = require("express").Router();

const { getWalletsController, getWalletByIdController, updateWalletController } = require("../controllers/walletController");

router.get("/", getWalletsController);
// router.post("/", createWalletController);
router.put("/:id", updateWalletController);
router.get("/:id", getWalletByIdController);

module.exports = router;