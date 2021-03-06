const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { truncateSync } = require("fs");
 
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "user name must be given"],
    },
    role : {
        type:String,
        required: true,
        enum: ["buyer", "admin"]
    },
    email:{
        type: String,
        required: true,
        lower: true,
    },
    phone:{
      type: String,
      required: true
    },
    address:{
      type: String,
      required: true
    },
    country: {
      type: String,
      trim: true,
      lower:true,
      required: true
    },
    state: {
      type: String,
      trim: true,
      lower:true,
      required: true
    },
    city: {
      type: String,
      trim: true,
      lower:true
    },
    zipCode: {
      type: String,
      trim: true,
      lower:true
    },

    customerType: {
      type: String,
      enum: ["regular", "walkin", "admin"],
      required: true
    },
    password:{
      type: String,
      // required: true,
      minLength: 8,
      select:false,
    },

    confirmPassword: {
      type: String,
      // required: true,
      validate: [
        function (val) {
            return val === this.password
        }, 
        "confirmPassword not matched",
      ],
    },
    __v: { 
        type: Number, 
        select: false
    },
    passwordChangedAt: Date ,
    passwordResetToken: String,
    passwordResetTokenExpiresAt: Date,
})

userSchema.methods.passwordVerification = (password, hashedPassword) => {
   return bcrypt.compare(password, hashedPassword)
}

userSchema.methods.passwordResetTokenGenerate = function() {
    //generate random string of 32 bits
    var resetToken = crypto.randomBytes(32).toString('hex');
    //encrypt random-token
    var encryptedResetToken = crypto.createHash("sha256").update(resetToken).digest('hex');
    //save encrypted resettoken in user document
    this.passwordResetToken = encryptedResetToken;
    //set token expiry (10 min)
    this.passwordResetTokenExpiresAt = Date.now() + 10 * 60 * 1000;
    return resetToken;
}

userSchema.pre("save", async function(next){
    if (!this.isModified("password") && !this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next()
})

userSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    const encryptedPassword = await bcrypt.hash(this.password,12)
    this.password = encryptedPassword;
    this.confirmPassword = undefined;
    next()
})

const User = new mongoose.model("User", userSchema);
module.exports = User 