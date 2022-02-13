const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const cartItemSchema = new mongoose.Schema(
    {
      itemId: {         //Clothing
        type: ObjectId,
        requird: true
      },
      quantity:{
        type: Number,
        required: true,
        min: 1
      },
      __v: { 
          type: Number, 
          select: false
      },
               
    },
);

module.exports = mongoose.model("CartItem", cartItemSchema);
