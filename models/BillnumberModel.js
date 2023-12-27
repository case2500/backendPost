const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//Generate random numbers for order

const billnumberOrderSchema = new Schema(
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
const BillNumber = mongoose.model("BillNumber", billnumberOrderSchema);

module.exports = BillNumber;
