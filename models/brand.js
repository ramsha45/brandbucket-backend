const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
    {
      brandName: {         //Khaadi
        type: String,
        trim: true,
        required: true,
        maxlength: 80,
        unique: true
      },
      __v: { 
          type: Number, 
          select: false
      },
               
    }
   // { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
