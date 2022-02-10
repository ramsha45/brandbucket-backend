const { lowerCase } = require("lodash");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        productName: {         //Embroided Khaddar kurti
            type: String,
            trim: true,
            required: true,
        },
        
        price: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32
        },
        gender:{
            type :String,
            enum:['W', 'M', 'K'],
            default: "W"
        },
        SKU:{
            type: String
        },
        categoryId:{           
            type:ObjectId,
            ref:'Category'
        },
        brandId: {
            type: ObjectId,
            required: true,
            ref: 'Brand'    
        },
        discountId: {
            type:ObjectId,
            null:true
        },
        image:String,
        variation:[{
            color: String,
            images: [String],
            sizes:[{
                name:{
                    type:String,
                    lowerCase: true,
                    trim: true
                },
                stock:{
                    type:Number,
                    min:0
                }
            }]
        }],
        __v: { 
            type: Number, 
            select: false
        },
       
    },
    {
        toJSON: {virtuals: true},
        toObject: {virtuals:true},
    }
);

// productSchema.virtual("variation", {
//     ref:"Item",
//     foreignField: "productId",
//     localField: "_id",
// })

productSchema.pre(/^find/, function(next){   //if query is used called query middleware
  this.populate({
      path: "brandId",
      select: "name"
  })
  this.populate({
    path: "categoryId",
    select: "name"
})
  next()
})

module.exports = mongoose.model("Product", productSchema);
