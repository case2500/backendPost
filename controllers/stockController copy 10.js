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
    var counter = 0;
    product.forEach(function (p) {
      var con = { product_id: p._id };
      var qty = 0;
   
      console.log(con);
    
      OrderDetail.find(con).then((findorderdetail) => {
        // console.log(findorderdetail);
   counter++;  
   console.log("counter=" + counter);    
     
       if (findorderdetail != null) {
          findorderdetail.forEach(function (findorder) {
            // console.log(findorder.quanlity);
           
            findlength =  product.length;
            // console.log(findlength);
            qty += findorder.quanlity;
            console.log("findlength=" + findlength);
          
          });
          var row = {
            quanlity: qty,
            product_id: p._id,
          };
          array.push(row);
          if (counter == findlength) {
          res.send(
          { status: 'ok1', result: array } 
          )
        }

       

          //  console.log(JSON.stringify(array));
        }

        //
      });
    })

    // res.send(array);
  }
};

module.exports = {
  getStock,
};
