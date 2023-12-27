const express = require("express");
const router = express.Router();
const {
    createAutoNumber,
    updateAutoNumber,
  getCategory,

} = require("../controllers/autoNumberController.js");


const {
  verifyToken,
  refreshToken,
} = require("../controllers/usercontroller");


const { auth,adminCheck } = require("../middleware/auth.js");

router.post("/",  createAutoNumber);
router.put("/",  updateAutoNumber);


module.exports = router;
