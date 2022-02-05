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
    image:{
      type: String
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

module.exports = mongoose.model("SubCategory", subCategorySchema);