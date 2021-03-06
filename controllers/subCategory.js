const SubCategory = require("../models/subCategory");
const multer = require("multer");
const {v4: uuid} = require("uuid")

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/SubCategory/')
  },
  
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1]
    cb(null, `subcat-${uuid()}-${Date.now()}.${ext}`);
  }
})
exports.SubCategoryUpload = multer({ storage: storage }).any();

exports.getAllSubCategories = async(req,res) => {
  try {
    const categories = await SubCategory.find()
    res.status(200).json({
      status: "success",
      data:{
        categories
      }
    }) 
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}

exports.getSubCategoryById = async(req,res) => {
  try {
    var {subcategoryId} = req.params;
    const subCategory = await SubCategory.findById(subcategoryId).populate("category")
    res.status(200).json({
      status: "success",
      data:{
        subCategory
      }
    }) 
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}

exports.addSubCategory = async(req,res) => {
  try {
    const category = await SubCategory.create(req.body)
    res.status(200).json({
      status: "success",
      data:{
        category
      }
    }) 
  } catch (error) {
    console.log("erroe ==>", error.message)
    res.status(400).json({
      error: error.message
    })
  }
}

exports.updateSubCategory =  async(req,res) => {
  try {
    console.log(req.body)
    var {categoryId} = req.params;
    var category = await SubCategory.findOneAndUpdate(categoryId,req.body,{
      new : true
    });

    res.status(200).json({
      status : "success",
      data : { 
        category
      }
  })
  } catch (error) {
    res.status(400).json({
      error :error.message
  })
  }
}

