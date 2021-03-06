const Category = require("../models/category");

exports.getAllCategories = async(req,res) => {
  try {
    const categories = await Category.find();
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
    var {categoryId} = req.params;
    var category = await Category.findByIdAndUpdate(categoryId, req.body, {
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

exports.deleteCategory = async(req, res) => {
  try {
    const {categoryId} = req.params
    await Category.deleteOne(categoryId)
    res.status(200).json({
      status:"success",
    })
  } catch (error) {
    res.status(400).json({
      status:"error",
      error: error.message
    })
  }
}

