// Create Prouct
const express = require("express");
const router = express.Router();

const constants = require("../constant.js");
const formidable = require("formidable");
const Product = require("../models/product");
const BillBuy = require("../models/BillBuyModel.js");
const BuyDetail = require("../models/BuyDetailModel.js")
// var User = mongoose.model('user')


const createDetailBuy = async (req, res) => {
  var con = { status: "open" };
  var id = req.params.id;
  const { quanlity, productname, price, discount } = req.body;
  BillBuy.findOne(con).then(async (findOrder) => {
    if (!findOrder) {
      return res.status(400).send({
        message: "No bill open found",
      });
    } else {
      console.log("findOrder=" + findOrder._id);
      var conn = {
        billbuy_id: findOrder._id,
        product_id: req.params.id,
      };
      console.log(conn);
      try {
      const buydetail = await BuyDetail.findOne(conn);
      if (buydetail != null) {
        const { quanlity } = buydetail;
        let result = await BuyDetail.updateMany(
          { product_id: id },
          {
            quanlity: req.body.quanlity,
            productname: productname,
            bill_No: findOrder.bill_No,
            price: price,
            discount: discount,
          }
        );
        res.json({
          msg: "เพิ่มจำนวน success " + findOrder._id,
          result: quanlity,
        });
      } else {
        const buydetail = new BuyDetail({
          billbuy_id: findOrder._id,
          buydetail_NO: findOrder.bill_No,
          quanlity: quanlity,
          product_id: id,
          productname: productname,
          price: price,
          discount: discount,
        });
        const or = await buydetail.save();
        res.json({
          msg: "เพิ่มสินค่าใหม่" + findOrder._id,
          result: quanlity,
        });
      }
      } catch (error) {
        res.json({
          result: "ไม่พบ รายการสินค้า",
        });
      }
    }
  });
};
//http://localhost:4000/api/order/6583a2663f545d9626de16b1
const endBillBuy = async (req, res) => {
  const id = req.params.id;
  BillBuy.findOne({ _id: id }).then(async (billbuy) => {
    if (!billbuy) {
      return res.status(400).send({
        message: "No buy found",
        data: {},
      });
    } else {
      await BillBuy.updateOne({ _id: id }, { status: "close" });
      return res.status(200).send({
        message: "end buy successfully ",
        data: {},
      });
    }
  });
};
module.exports = {
  createDetailBuy,
  endBillBuy
};
