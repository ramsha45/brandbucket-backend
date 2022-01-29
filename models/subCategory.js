const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const subCategorySchema = new mongoose.Schema(
  {
    name: {         //Clothing
      type: String,
      trim: true,
      required: true,
      maxlength: 80,
      unique: true
    },
    categoryId:{
      type: ObjectId,
      required: true,
      ref: 'Category'
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

subCategorySchema.virtual("category", {
  ref:"Category",
  foreignField: "_id",
  localField: "categoryId",
  justOne: true
})

// subCategorySchema.pre(/^find/, function(next){
//   //to populate review with user info wo has reviewed
//   this.populate({
//       path: "categoryId",
//   })
//   next()
// })

// subCategorySchema.set('toObject', { virtuals: true });
// subCategorySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("SubCategory", subCategorySchema);