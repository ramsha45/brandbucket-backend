const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const itemSchema = new mongoose.Schema(
    {
      color:{
        type:String,
        required: true,
        trim: true,
        lowercase: true
      },
      sizes:[{
        name:{
          type:String,
          required: true,
          lowercase: true
        },
        qty:{
          type:Number,
          required:true
        }
      }],
      productId:{           
        type:ObjectId,
        required:true,
        ref: 'Product'
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

// itemSchema.virtual("product", {
//   ref:"Product",
//   foreignField: "_id",
//   localField: "productId",
//   justOne: true
// })

// itemSchema.pre(/^find/, function(next){   //if query is used called query middleware
//   this.populate({
//       path: "productId",
//   })
//   next()
// })

module.exports = mongoose.model("Item", itemSchema);
