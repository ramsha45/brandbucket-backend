const _ = require("lodash");
const Item = require("../models/item");
const multer = require("multer");
const {v4: uuid} = require("uuid")

exports.getItemById = async(req, res) => {
  try {
      var {itemId} = req.params;
      var item = await Item.findById(itemId);

      res.status(200).json({
        status : "success",
        data : { 
          item
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
    cb(null, `item-${uuid()}-${Date.now()}.${ext}`);
  }
})
exports.ItemImgUpload = multer({ storage: storage }).any();

exports.addItem = async(req, res) => {
  try {
    console.log("req.file",req.files)
    req.body.images = req.files[0].filename
    console.log("req.body",req.body)
    const item = await Item.create(req.body)
    res.status(200).json({
      status : "success",
      data : {
        item
      }
    })
} catch (error) {
    console.log(error)
    res.status(400).json({error :error.message})
}};

exports.getAllItem = async(req, res) => {
  try {
    const items =  await Item.find().populate("product")
    res.status(200).json({
      status:"success",
      data:{
        items
      }
    });
  } catch (error) {
    res.status(400).json({error :error.message})
  }
    
};


exports.updateItem = async (req,res)=>{
  try {
    console.log(req.body)
    var {itemId} = req.params;
    var item = await Item.findOneAndUpdate(itemId, req.body,{
      new : true
    });

    res.status(200).json({
      status : "success",
      data : { 
        item
      }
  })
  } catch (error) {
    res.status(400).json({
      error :error.message
  })
  }
}