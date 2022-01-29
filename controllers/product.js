const formidable = require("formidable");
const _ = require("lodash");
const Product = require("../models/product");
const fs = require("fs");
const multer = require("multer");
const {v4: uuid} = require("uuid")

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

// exports.read = (req, res) => {
//   const product = req.product;
//   return res.json(product);
// };

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
    // console.log("req.file",req.files)
    // req.body.image = req.files[0].filename
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

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let skip = req.query.skip ? parseInt(req.query.skip) : 0;
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 16;

  Product.find()
    //.select('-photo')
    //.populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .skip(skip)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
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