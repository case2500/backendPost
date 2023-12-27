// Create Prouct
const express = require("express");
const router = express.Router();
const OrderDetail = require("../models/orderDetailModel");
const constants = require("../constant.js");
const formidable = require("formidable");
const Product = require("../models/product");
const BillOrder = require("../models/BillOrderModel");

//// post  localhost:4000/api/stock
const getStock = async (req, res) => {
  const product = await Product.find({});
  if (product != null) {
    var array = [];
    product.forEach(function (p) {
      var con = { product_id: p._id };
      var qty = 0;
      // console.log(con);
      OrderDetail.find(con).then((findorderdetail) => {

// if (err) console.log(err)

        if (findorderdetail != null) {
          findorderdetail.forEach(function (findorder) {
            console.log(findorder.quanlity);
            qty += findorder.quanlity;
          });
          var row = {
            quanlity: qty,
            product_id: p._id,
            productname: p.name,
          };
          array.push(row);
          console.log(array);
        }
      });
    });

    // res.send(array);
  }
};

module.exports = {
  getStock,
};
