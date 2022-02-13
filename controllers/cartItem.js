const CartItem = require("../models/cartItem");

exports.getAllCartItem = async(req,res) => {
  try {
    const carts = await CartItem.find()
    res.status(200).json({
      status: "success",
      data:{
        carts
      }
    }) 
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}

exports.getCartItemById = async(req,res) => {
  try {
    var {cartId} = req.params;
    const cart = await CartItem.findById(cartId)
    res.status(200).json({
      status: "success",
      data:{
        cart
      }
    }) 
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}

exports.addCartItem = async(req,res) => {
  try {
    const cart = await CartItem.create(req.body)
    res.status(200).json({
      status: "success",
      data:{
        cart
      }
    }) 
  } catch (error) {
    console.log("erroe ==>", error.message)
    res.status(400).json({
      error: error.message
    })
  }
}

exports.updateCartItem =  async(req,res) => {
  try {
    console.log(req.body)
    var {cartId} = req.params;
    var cart = await CartItem.findOneAndUpdate(cartId,req.body,{
      new : true
    });

    res.status(200).json({
      status : "success",
      data : { 
        cart
      }
    })
  } catch (error) {
    res.status(400).json({
      error :error.message
    })
  }
}

exports.deleteCartItem  = async(req,res) => {
  try {
    const {cartId} = req.params;
    var cart = await CartItem.deleteOne(cartId)
    res.status(200).json({
      status : "success",
    })
  } catch (error) {
    res.status(400).json({
      error :error.message
    })
  }
}

