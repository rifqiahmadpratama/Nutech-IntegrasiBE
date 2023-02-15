const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const barangController = require("../controller/barang");
const { protect } = require("../middleware/auth");
router.get("/read", barangController.getbarang);

router.post(
  "/create",
  protect,
  upload.single("photo"),
  barangController.addbarang
);
router.put(
  "/update-photo/:id",
  protect,
  upload.single("photo"),
  barangController.updatebarangphoto
);

router.get("/get-all-data", protect, barangController.getbarang);
router.put("/update-name/:id", protect, barangController.updatebarangname);
router.put("/update-beli/:id", protect, barangController.updatebarangbeli);
router.put("/update-jual/:id", protect, barangController.updatebarangjual);
router.put("/update-stok/:id", protect, barangController.updatebarangstok);
router.delete("/delete/:id", protect, barangController.deletebarang);
module.exports = router;
