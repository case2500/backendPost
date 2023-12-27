// Create Prouct
const express = require("express");
const router = express.Router();
const OrderDetail = require("../models/orderDetailModel");
const constants = require("../constant.js");
const formidable = require("formidable");
const Product = require("../models/product");
const BillOrder = require("../models/BillOrderModel");

//// post  localhost:4000/api/stock
const getStock =  (req, res) => {

 OrderDetail.aggregate(   [  
  {  
    $group : {_id : { _id : "$product_id", productname : "$productname" , 
       Total_qty: { $sum: "$quanlity"
       },  
       count: { $sum: 1 }  
    }  
  }
 }  
]  ).then(function(pro){

  res.send(JSON.stringify(pro))

 })


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
