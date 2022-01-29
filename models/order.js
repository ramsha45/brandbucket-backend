const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
    {
      userId:{
        type:ObjectId,
        required: true,
      },
      OrderItems:{
        type:[ObjectId],
        required: true
      },
      subTotal:{           
        type: Number,
        required: true 
      },
      deliveryCharges:{
        type: Number,
        required: true 
      },
      orderDate:{
        type: Date
      },
      __v: { 
          type: Number, 
          select: false
      },
    }
);

module.exports = mongoose.model("Order", orderSchema);
