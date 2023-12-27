const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const OrderDetailSchema = new Schema(
  {
    billorder_id: {
      type: String,
        },
    orderDetail_NO: 
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
const OrderDetail = mongoose.model("OrderDetail", OrderDetailSchema);

module.exports = mongoose.models.OrderDetail || mongoose.model('OrderDetail', OrderDetailSchema);
