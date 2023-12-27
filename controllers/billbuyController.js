// Create Prouct
const express = require("express");
const router = express.Router();
const BillBuy = require("../models/BillBuyModel");
const constants = require("../constant.js");
const formidable = require("formidable");
const Product = require("../models/product");
const BillBuyNumber = require("../models/BillBuynumberModel");

//// post  http://localhost:4000/api/billorder/
const createBillBuy = async (req, res) => {
  var con = { status: "open" };
  BillBuy.findOne(con).then(async (bill) => {
    //ถ้าไม่มี bill open
    console.log(JSON.stringify(BillBuy))
    if (!bill) {
      BillBuyNumber.findOne({}).then(async (billbuynumber) => {
        //ถ้า autobill ไม่มี....
        if (!billbuynumber) {
          const newbillbuynumber = Number(100000) + 1;
          const billbuynumber = new BillBuyNumber({
            autobill: newbillbuynumber,
          });
          billbuynumber.save();
          console.log(newbillbuynumber);

          const billbuy = new BillBuy({
            bill_No: newbillbuynumber,
            status: "open",
            inputMoney: 0,
            returnMoney: 0,
            reduceMoney: 0,
            totalPrice: 0,
          });
          console.log("add billBuy");
          await billbuy.save();
          res.json({
            msg:"เปิดบิล SUccess  " + newbillbuynumber
          })
        } else {
          //ถ้ามี autobill number มี 1000001....   billnumber.autobill + 1
          BillBuyNumber.findOne({}).then(async (billbuynumber) => {
            const findbillnumber = billbuynumber.autobill + 1;
            console.log(findbillnumber);
            const billbuy = new BillBuy({
              bill_No: findbillnumber,
              status: "open",
              inputMoney: 0,
              returnMoney: 0,
              reduceMoney: 0,
              totalPrice: 0,
            });
            console.log("add billBuy");
            await billbuy.save();

            let result = await BillBuyNumber.updateMany(
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
        message: "end Buy successfully ",
        data: {},
      });
    }
  });
};

module.exports = {
    createBillBuy,
    endBillBuy
};
