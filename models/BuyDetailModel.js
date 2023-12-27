const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Generate random numbers for order
const randomTxt = Math.random().toString(36).substring(7).toLocaleUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000);
const BuyDetailSchema = new Schema(
  {
    billbuy_id: {
      type: String,
        },
    buydetail_NO: 
      {
        type: Number,
        required: true,
      },
    
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      productname: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        default: "sale"
      },
      price: {
        type: Number,
        default: 0,
      },
      quanlity: {
        type: Number,
        default: 0,
      },
      discount: {
        type: Number,
        required: true,
        default: 0,
      },
      toppings: [
        {
          type: Object,
          required: true,
        },
      ],
  },
  {
    timestamps: true,
  }
);

//compile to form model
const BuyDetail = mongoose.model("BuyDetail", BuyDetailSchema);

module.exports =  BuyDetail;
