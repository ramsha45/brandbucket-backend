const Category = require("../models/category");
// const multer = require("multer");
// const {v4: uuid} = require("uuid")

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/category/')
//   },
  
//   filename: function (req, file, cb) {
//     const ext = file.mimetype.split("/")[1]
//     cb(null, `cat-${uuid()}-${Date.now()}.${ext}`);
//   }
// })
// exports.CategoryUpload = multer({ storage: storage }).any();

exports.getAllCategories = async(req,res) => {
  try {
    const categories = await Category.find()
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

exports.getCategoryById = async(req,res) => {
  try {
    var {categoryId} = req.params;
    const category = await Category.findById(categoryId)
    res.status(200).json({
      status: "success",
      data:{
        category
      }
    }) 
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}

exports.addCategory = async(req,res) => {
  try {
    const category = await Category.create(req.body)
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

exports.updateCategory =  async(req,res) => {
  try {
    console.log(req.body)
    var {categoryId} = req.params;
    var category = await Category.findOneAndUpdate(categoryId,req.body,{
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

