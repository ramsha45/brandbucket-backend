const Brand = require("../models/brand");

exports.getAllBrands = async(req,res) => {
  try {
    const brands = await Brand.find() 
    res.status(200).json({
      status: "success",
      data:{
        brands
      }
    }) 
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}

exports.getBrandById = async(req,res) => {
  try {
    var {brandId} = req.params;
    const brand = await Brand.findById(brandId)
    res.status(200).json({
      status: "success",
      data:{
        brand
      }
    }) 
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}

exports.addBrand = async(req,res) => {
  try {
    const brand = await Brand.create(req.body)
    res.status(200).json({
      status: "success",
      data:{
        brand
      }
    }) 
  } catch (error) {
    console.log("erroe ==>", error.message)
    res.status(400).json({
      error: error.message
    })
  }
}

exports.updateBrand =  async(req,res) => {
  try {
    console.log(req.body)
    var {brandId} = req.params;
    var brand = await Brand.findOneAndUpdate(brandId,req.body,{
      new : true
    });

    res.status(200).json({
      status : "success",
      data : { 
        brand
      }
  })
  } catch (error) {
    res.status(400).json({
      error :error.message
  })
  }
}

