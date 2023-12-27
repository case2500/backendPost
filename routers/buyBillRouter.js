const express = require("express");
const router = express.Router();

const {
  createBillBuy,
  endBillBuy,
  //   getBillBuy,
  //   endBillOrder,
  //   getSingleOrder,
  //   removeOrder
} = require("../controllers/billbuyController.js");
const { remove } = require("fs-extra");

//http://localhost:4000/api/order/

router.post("/", createBillBuy);
router.post("/end/:id", endBillBuy);
// router.get("/:id",getSingleOrder)
// router.get("/", getBillBuy);
// router.delete("/:id",removeOrder)
//id -> category
module.exports = router;
