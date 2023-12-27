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
  var dbcourse = [];
  var dbcourse1 = [];
  var qty = 0
  // Finding courses of category Database
  Product.find({})
    .then((data1) => {
      console.log("Database Courses:");
      console.log(data1);

      // Putting all course id's in dbcourse array
      data1.map((d, k) => {
      

      // Getting students who are enrolled in any
      // database course by filtering students
      // whose courseId matches with any id in
      // dbcourse array
      OrderDetail.find({ product_id: d._id })
        .then((data) => {
          console.log("Students in Database Courses:");
          // console.log(data);
          data.map((d, k) => {

            console.log(d._id);
          
          })

            data.forEach(function (findorder) {
              console.log(findorder.product_id);
               console.log(findorder.productname);
              qty += Number(findorder.quanlity);
              console.log(qty);

              var row = {
              quanlity: qty,
              product_id: findorder.product_id,
              productname: findorder.productname,
            };
            
            dbcourse1.push(row);
            });

            

          // });
        
        })
        .catch((error) => {
          console.log(error);
        });
    }) //end find
      dbcourse.push();
      })



    .catch((error) => {
      console.log(error);
    });

  res.send(JSON.stringify(dbcourse1));

  //   var array = []
  //   const product = await Product.find({});
  //   const orderdetail = await OrderDetail.find({})

  //    array.push(...product,orderdetail)
  //   //  console.log(object)
  //   array.aggregate([
  //     {
  //       $group: {
  //         _id: {
  //           _id: "$product_id",
  //           // productname: "$productname",
  //           // Total_qty: { $sum: "$quanlity" },
  //           // count: { $sum: 1 },
  //         },
  //       },
  //     },
  //     // {
  //     //   $project: {
  //     //     _id: 1,
  //     //     name: "$productname",
  //     //     quanlity: "$quanlity",
  //     //   },
  //     // },
  //      { $sort:{ Total_qty:1}}
  //   ]).then(function (pro) {
  //     pro.map((p) =>
  //       console.log(p._id._id + p._id.productname + p._id.Total_qty)
  //     );

  // res.send(JSON.stringify(pro));
  //   });
};

module.exports = {
  getStock,
};
