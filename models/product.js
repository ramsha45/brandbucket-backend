const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = new mongoose.Schema(
    {
        productName: {         //Embroided Khaddar kurti
            type: String,
            trim: true,
            required: true,
            maxlength: 80,
            unique: true
        },
        
        price: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 32
        },
        gender:{
            type:String
        },
        SKU:{
            type: String
        },
        subCategoryId:{           
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
       
    }
   // { timestamps: true }
);

// productSchema.pre(/^find/, function(next){   //if query is used called query middleware
//     this.populate({
//         path: "brandId",
//     })
//     next()
// })

module.exports = mongoose.model("Product", productSchema);
