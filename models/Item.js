const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const itemSchema = new mongoose.Schema(
    {
      color:{
        type:String,
        required: true,
        trim: true,
      },
      size:{
        type:String,
        trim: true,
        null: true
      },
      productId:{           
        type:ObjectId,
        required:true,
        ref: 'Product'
      },
      quantity: {
          type: Number,
          required: true    
      },
      images: {
        type:Array
      },
      __v: { 
          type: Number, 
          select: false
      },
    },
    { 
      versionKey: false,
      toJSON: {virtuals: true},
      toObject: {virtuals:true},
    }
   // { timestamps: true }
);

itemSchema.virtual("product", {
  ref:"Product",
  foreignField: "_id",
  localField: "productId",
  justOne: true
})

module.exports = mongoose.model("Item", itemSchema);
