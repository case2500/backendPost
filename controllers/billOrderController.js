// Create Prouct
const express = require("express");
const router = express.Router();
const BillOrder = require("../models/BillOrderModel");
const constants = require("../constant.js");
const formidable = require("formidable");
const Product = require("../models/product");
const BillNumber = require("../models/BillnumberModel");

//// post  http://localhost:4000/api/billorder/
const createBillOrder = async (req, res) => {
  var con = { status: "open" };
  BillOrder.findOne(con).then(async (bill) => {
    //ถ้าไม่มี bill open
    if (!bill) {
      BillNumber.findOne({}).then(async (billnumber) => {
        //ถ้า autobill ไม่มี....
        if (!billnumber) {
          const newbillnumber = Number(100000) + 1;
          const billnumber = new BillNumber({
            autobill: newbillnumber,
          });
          billnumber.save();
          console.log(newbillnumber);
        } else {
          //ถ้ามี autobill number มี 1000001....   billnumber.autobill + 1
          BillNumber.findOne({}).then(async (billnumber) => {
            const findbillnumber = billnumber.autobill + 1;
            console.log(findbillnumber);
            const billorder = new BillOrder({
              bill_No: findbillnumber,
              status: "open",
              inputMoney: 0,
              returnMoney: 0,
              reduceMoney: 0,
              totalPrice: 0,
            });
            console.log("add billOrder");
            await billorder.save();

            let result = await BillNumber.updateMany(
              { status: "open" },
              {
                autobill: findbillnumber,
              }
            );
            console.log(result);
            res.json({
              msg:"เปิดบิล SUccess  " + findbillnumber
            })
          });
        }
      });
    }else{
      res.json({
        msg:"มีการเปิดบิลแล้ว",
        
      })
    }
  });
};

//http://localhost:4000/api/order/6583a2663f545d9626de16b1
const getSingleOrder = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const billorder = await BillOrder.find({ _id: id }).sort("-createdAt");
    // .select({ orderItems: 1, _id: 0 });
    if (!billorder) {
      return res.status(404).json({ messsage: "BillOrder Not FOund" });
    }
    res.json({
      result: billorder,
      msg: "OK",
    });
  } catch (error) {
    return res.status(404).json({ messsage: "BillOrder Not FOund", msg: "NO" });
  }
};

//http://localhost:4000/api/order/6583a2663f545d9626de16b1
const removeOrder = async (req, res) => {
  const id = req.params.id;
  Order.findOne({ _id: id }).then(async (order) => {
    if (!order) {
      return res.status(400).send({
        message: "No order found",
        data: {},
      });
    } else {
      await Order.deleteOne({ _id: id });
      return res.status(200).send({
        message: "order successfully deleted",
        data: {},
      });
    }
  });
};

//http://localhost:4000/api/order/6583a2663f545d9626de16b1
const endBillOrder = async (req, res) => {
  const id = req.params.id;
  BillOrder.findOne({ _id: id }).then(async (billorder) => {
    if (!billorder) {
      return res.status(400).send({
        message: "No order found",
        data: {},
      });
    } else {
      await BillOrder.updateOne({ _id: id }, { status: "close" });
      return res.status(200).send({
        message: "end Order successfully ",
        data: {},
      });
    }
  });
};

//http://localhost:4000/api/order/
const getOrder = async (req, res) => {
  try {
    const orders = await BillOrder.find({}).sort("-createdAt");
    // .select({ orderItems: 1, _id: 0 });
    if (!orders) {
      return res.status(404).json({ messsage: "orders Not FOund" });
    }
    res.json({
      result: orders,
    });
  } catch (error) {
    return res.status(404).json({ messsage: "orders Not FOund", msg: "NO" });
  }
};

module.exports = {
  createBillOrder,
  getOrder,
  getSingleOrder,
  removeOrder,
  endBillOrder,
};
