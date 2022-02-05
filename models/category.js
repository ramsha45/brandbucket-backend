const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
      name: {         //Clothing
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
               
    },
    // {
    //   versionKey: false,
    // }
   // { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
