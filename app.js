const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const brandRoutes = require("./routes/brand");
const discountRoutes = require("./routes/discount");
const categoryRoutes = require("./routes/category");
const subCategoryRoutes = require("./routes/subCategory");
const itemRoutes = require("./routes/item");
const cartItemRoutes = requires("./routes/cartItem")

// app
const app = express();

allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,PUT,POST,PATCH,DELETE,OPTIONS"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );

  // intercept OPTIONS method
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
};
app.use(cors({
  origin: '*'
}));

// db
mongoose
  .connect('mongodb+srv://ramsha:dcJGq5BxQBpaVcoP@cluster0.wxwxl.mongodb.net/brandbucket', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

// middlewares
// app.use(morgan("dev"));
app.use(express.static('public'))
app.use(express.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());



//home

// routes middleware

// app.use("/api/img", express.static("img"));
app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api/brands", brandRoutes)
app.use("/api/discounts", discountRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/subcategories", subCategoryRoutes)
app.use("/api/items", itemRoutes)
app.use("/api/carts", cartItemRoutes)

app.listen(8000, () => {
    console.log("server is running on port 8000")
});