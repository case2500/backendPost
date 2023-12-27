// Create Prouct
const express = require("express");
const router = express.Router();

const constants = require("../constant.js");
const formidable = require("formidable");
const Product = require("../models/product");

const BillOrder = require("../models/BillOrderModel");
const OrderDetail = require("../models/orderDetailModel");

const BillBuy = require("../models/BillBuyModel");
const BuyDetail = require("../models/BuyDetailModel");

//// post  localhost:4000/api/stock
const getStock = async (req, res) => {
  const product = await Product.find({});
  if (product != null) {
    var arrayStock = [];
    var arrayBuy = [];
    var counter = 0;
    var allarray =[]
    product.forEach(function (p) {
      var con = { product_id: p._id };
      var qty = 0;
      console.log(con);
      var quanlitySale = 0;
      //รายการซื้อ
      BuyDetail.find(con).then((findbuydetail) => {
        counter++;
        if (findbuydetail != null) {
          findbuydetail.forEach(function (findbuy) {
            findlength = product.length;
            qty -= findbuy.quanlity;
          });
          var row1 = {
            product_id: p._id,
            productname: p.name,
            quanlity_Buy: qty,
          };
          arrayBuy.push(row1);
        }
      }); //end รายการซื้อ

      //รายการขาย
      OrderDetail.find(con).then((findorderdetail) => {
        counter++;
        if (findorderdetail != null) {
          findorderdetail.forEach(function (findorder) {
            findlength = product.length * 2;
            qty += findorder.quanlity;
            quanlitySale += findorder.quanlity;
          });
          var row = {
            totalquanlity: qty,
            product_id: p._id,
            productname: p.name,
            quanlity_Sale: quanlitySale,
          };
          arrayStock.push(row);
          allarray.push(...arrayStock,arrayBuy)
          if (counter == findlength) {
            res.send({
              status: "ok",
              resultStock: arrayStock,
              resultbuy: arrayBuy,
              // allarray:allarray
            });
          }
        }
      }); //end รายการขาย
    });
  }
};

module.exports = {
  getStock,
};
