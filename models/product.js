const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        productName: {         //Embroided Khaddar kurti
            type: String,
            trim: true,
            required: true,
            maxlength: 8
        },
        
        price: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32
        },
        gender:{
            enum:['W', 'M', 'K']
        },
        SKU:{
            type: String
        },
        categoryId:{           
            type:ObjectId
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

productSchema.virtual("variation", {
    ref:"Item",
    foreignField: "productId",
    localField: "_id",
})

productSchema.pre(/^find/, function(next){   //if query is used called query middleware
  this.populate({
      path: "brandId",
      select: "name"
  })
  next()
})

module.exports = mongoose.model("Product", productSchema);
