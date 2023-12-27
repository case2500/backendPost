// Create Prouct
const express = require("express");
const router = express.Router();
const OrderDetail = require("../models/orderDetailModel");
const constants = require("../constant.js");
const formidable = require("formidable");
const Product = require("../models/product");
const BillOrder = require("../models/BillOrderModel");

//// post  localhost:4000/api/stock
const getStock = (req, res) => {
  OrderDetail.aggregate([

    {
      $group: {
        _id: "$product_id",
        _id: "$orderDetail_NO",
        count: { $count: { } },
        quanlity: { $sum: "$quanlity" },
        totalPrice: { $sum: { $multiply: [ "$price", "$quanlity" ] } },
        // price: { $sum: "$price" },
      },
   
      
      
    },

  ]).then(function (pro) {
    pro.map((p) =>
      console.log(p)
    );

    res.send(JSON.stringify(pro));
  });

  // await  Product.find({}).then(function (err, product) {
  //     if (err) console.log(err);
  //     if (product != null) {
  //       product.forEach(function (p) {
  //         var con = { product_id: p._id };
  //         var qty = 0;
  //         console.log("con");
  //       });
  //        res.send(JSON.stringify(product))
  //     }

  //   });
};

module.exports = {
  getStock,
};
