const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
    {
      name: {         //Khaadi
        type: String,
        trim: true,
        required: true,
        maxlength: 80,
        unique: true
      },
      image:{
        type: String
      },
      __v: { 
          type: Number, 
          select: false
      },
               
    }
   // { timestamps: true }
);

module.exports = mongoose.model("Brand", brandSchema);
