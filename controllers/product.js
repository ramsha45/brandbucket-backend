const formidable = require("formidable");
const _ = require("lodash");
const Product = require("../models/product");
const fs = require("fs");
const multer = require("multer");
const {v4: uuid} = require("uuid");
const APIFeatures = require("../utility/common");

exports.productById = async(req, res) => {
  try {
      var {productId} = req.params;
      var product = await Product.findById(productId);

      res.status(200).json({
          status : "success",
          data : { 
            product
          }
      })
      
  } catch (error) {
      console.log(error)
      res.status(400).json({
          error :error.message
      })
  }
}



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1]
    cb(null, `product-${uuid()}-${Date.now()}.${ext}`);
  }
})
exports.productImgUpload = multer({ storage: storage }).any();

exports.addProduct = async(req, res) => {
  try {
    console.log("req.body",req.body)
    const product = await Product.create(req.body)
    res.status(201).json({
        status : "success",
        data : {
          product
        }
    })
} catch (error) {
    console.log(error)
    res.status(400).json({error :error.message})
}};

exports.list = async(req, res) => {
  try {
   var {limit = 2} = req.query
    const{color, category, brand, size, gender, price, sort='createdAt'} = req.query
    const modifiedQuery = {
      ...brand && {["brandId"]: brand}, 
      ...category && {["categoryId"]: category}, 
      ...gender && {gender}, 
      ...price && {price: { $lte: price }},
      ...color && {["variation.color"]: color},
      ...size && {["variation.sizes.name"]:size}
    }
    // console.log(modifiedQuery, sort)
    var products = await Product.find({...modifiedQuery}).sort(sort)
    res.status(200).json({
       status : "success",
      //  pages : Math.ceil(total),
      totalCount: products.length,
       data : { 
           products
       }
    })
  } catch (error) {
    console.log(error)
    res.status(400).json({error :error.message})
  }
};


exports.updateProduct = async (req,res)=>{
  try {
    console.log(req.body)
    var {productId} = req.params;
    var product = await Product.findOneAndUpdate(productId,req.body,{
      new : true
    });

    res.status(200).json({
      status : "success",
      data : { 
        product
      }
  })
  } catch (error) {
    res.status(400).json({
      error :error.message
  })
  }
}