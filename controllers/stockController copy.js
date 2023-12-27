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

  // console.log(JSON.stringify(product));
 
  if (product != null) {
     var array = [];
    product.forEach(function (p) {
      var con = { product_id: p._id };
      var qty = 0;

      console.log(con);
      OrderDetail.find(con).then((findorderdetail) => {
        // console.log(findorderdetail);

        if (findorderdetail != null) {
          findorderdetail.forEach(function (findorder) {
            // console.log(findorder.quanlity);
             console.log(findorder.product_id);
            qty += findorder.quanlity;
            console.log(qty);
          });
          var row = {
            quanlity: qty,
            product_id: p._id,
         
          }; 
          array.push(row); 
           console.log(JSON.stringify(array));   
        }

       
        // 
      });
    });
                         
    res.send(array);
  }
};

module.exports = {
  getStock,
};
