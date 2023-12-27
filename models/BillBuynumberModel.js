const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Generate random numbers for order

const billnumberBuySchema = new Schema(
  {
    autobill:{
      type: Number,
      default: 100000
    },
    
    status: {
      type: String,
      default: "open",
    },

  },
  {
    timestamps: true,
  }
);

//compile to form model
const BillBuyNumber = mongoose.model("BillBuyNumber", billnumberBuySchema);

module.exports = BillBuyNumber;
