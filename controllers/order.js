const Order = require("../models/order");

exports.getAllOrders = async(req,res) => {
  try {
    const orders = await Order.find()
    res.status(200).json({
      status: "success",
      data:{
        orders
      }
    }) 
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}

exports.getOrderById = async(req,res) => {
  try {
    var {orderId} = req.params;
    const orders = await Order.findById(orderId)
    res.status(200).json({
      status: "success",
      data:{
        orders
      }
    }) 
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}

exports.addOrder = async(req,res) => {
  try {
    const order = await Order.create(req.body)
    res.status(200).json({
      status: "success",
      data:{
        order
      }
    }) 
  } catch (error) {
    console.log("erroe ==>", error.message)
    res.status(400).json({
      error: error.message
    })
  }
}

exports.updateOrder =  async(req,res) => {
  try {
    console.log(req.body)
    var {orderId} = req.params;
    var order = await Order.findOneAndUpdate(orderId,req.body,{
      new : true
    });

    res.status(200).json({
      status : "success",
      data : { 
        order
      }
  })
  } catch (error) {
    res.status(400).json({
      error :error.message
  })
  }
}

