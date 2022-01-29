const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const discountSchema = new mongoose.Schema(
    {
      discountName: {         
        type: String,
        trim: true,
        required: true,
        maxlength: 80,
        unique: true
      },
      percentage:{
        type: Number,
        required: true
      },
      __v: { 
          type: Number, 
          select: false
      },
               
    }
   // { timestamps: true }
);

module.exports = mongoose.model("Discount", discountSchema);
