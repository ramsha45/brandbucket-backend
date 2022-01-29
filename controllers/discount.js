const Discount = require("../models/discount");

exports.getAllDiscounts = async(req,res) => {
  try {
    const discounts = await Discount.find()
    res.status(200).json({
      status: "success",
      data:{
        discounts
      }
    }) 
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}

exports.getDiscountById = async(req,res) => {
  try {
    var {discountId} = req.params;
    const discount = await Discount.findById(discountId)
    res.status(200).json({
      status: "success",
      data:{
        discount
      }
    }) 
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}

exports.addDiscount = async(req,res) => {
  try {
    const discount = await Discount.create(req.body)
    res.status(200).json({
      status: "success",
      data:{
        discount
      }
    }) 
  } catch (error) {
    console.log("erroe ==>", error.message)
    res.status(400).json({
      error: error.message
    })
  }
}

exports.updateDiscount =  async(req,res) => {
  try {
    console.log(req.body)
    var {discountId} = req.params;
    var discount = await Discount.findOneAndUpdate(discountId,req.body,{
      new : true
    });

    res.status(200).json({
      status : "success",
      data : { 
        discount
      }
  })
  } catch (error) {
    res.status(400).json({
      error :error.message
  })
  }
}

