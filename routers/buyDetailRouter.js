const express = require("express");
const router = express.Router();

const {
  createDetailBuy,
  // removeBuyProduct,
  // getBuy,
  // getSingleBuy,
  // removeBuy
} = require("../controllers/billbuyDetailController.js");
const { remove } = require("fs-extra");

//http://localhost:4000/api/order/


router.post("/:id", createDetailBuy);
// router.post("/:id", removeBuyProduct); // id = product_id
// router.get("/:id",getSingleBuy) //id => billbuy_id
// router.get("/", getBuy);
// router.delete("/:id",removeBuy) //id => billbuy_id
//id -> category
module.exports = router;
