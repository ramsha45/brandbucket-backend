const User = require("../models/user")
const JWT = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const { promisify } = require("util");
const sendEmail = require("../utility/email");
const crypto = require("crypto");
const { addUser } = require("./user");
// const { addArtist, getArtist } = require("./artistController");
// const { addBuyer, getBuyer } = require("./buyerController");

var signJWT = (userId) => {
    // console.log("usrId", userId)
    return JWT.sign({ id: userId }, process.env.WEB_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    })
}

var createAndSendToken = (user,res) => {
        const token = signJWT(user.id)
        console.log(user)
        res.cookie("jwt", token, {  //to save jwt in cookie instead of local
            expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), //expires cookie after 90d
            secure: process.env.NODE_ENV == "dev" ? false : true, // only valid for https connection
            httpOnly: true,
        })
        res.status(200).json({
            status: "success",
            token,
            data: {
                user
            }
        })
}

exports.fetchuser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "success",
            data: {
                users
            }
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        var { email, password } = req.body;

        // is email and password exist
        if (!email || !password) {
            res.status(400).json({
                status: "error",
                error: "All credentials must exist",
            })
        }

        //find user by eamil
        var user = await User.findOne({ email }).select("+password");

        //verify password with saved password
        const isPasswordVerified = user.passwordVerification(password, user.password);
        if (!isPasswordVerified || !user) {
            res.status(400).json({
                status: "error",
                error: "email or password invalid",
            })
        }

        //fetch profile
        // var userProfile
        // if(user.role=='artist')userProfile = await getArtist(user._id)
        // if(user.role=='buyer')userProfile = await getBuyer(user._id)
        
        //generate token and send response
        createAndSendToken(user,res)

    } catch (error) {
        res.status(400).json({
            error: error.message,
        })
    }
}

exports.signup = async (req, res) => {
    try {
        // var user = await User.create(req.body);
        var userProfile = await addUser(req.body)
        console.log("userProfile", userProfile)
        
        //generate token and send response
        createAndSendToken(userProfile,res)
    
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: error.message
        })
    }
}

exports.forgetPassword = async (req, res) => {
    try {
        var { email } = req.body;
        //fetch user by email
        var user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({
                status: "error",
                error: "no user found"
            })
        }
        //generate reset Token
        var resetToken = await user.passwordResetTokenGenerate();
        //save user
        await user.save({ validateBeforeSave: false });
        //send email to user
        const msg = `Please click to the link for changing passaword. Note that link will expire in 10 minutes. Link is http://localhost:8000/api/v1/auth/reset-password/${resetToken}`;
        await sendEmail({
            to: email,
            subject: "password reset request",
            content: msg,
        })

        res.status(200).json({
            status: "success",
            message: "link has been emailed",
        })
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

exports.resetPassword = async (req, res) => {
    try {

        var {password, confirmPassword} = req.body;
        var { token } = req.params;
        console.log('user password =>',password)
        console.log('token =>',token)
        var encryptedResetToken = crypto.
            createHash("sha256").
            update(token).
            digest('hex');
        console.log('token =>',token)
        var user = await User.findOne({
            passwordResetToken: encryptedResetToken,
            passwordResetTokenExpiresAt: { $gt: Date.now() },
        });
        console.log('user reset =>',user)

        if (!user) {
            return res.status(401).json({
              error: "token doesnt exist or has been expired!",
            });
          }
        
        user.password = password;
        user.confirmPassword = confirmPassword;
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpiresAt = undefined
        await user.save();

        //generate token and send response
        createAndSendToken(user,res)
          
    } catch (error) {
        user.passwordResetToken= undefined;
        user.passwordResetTokenExpiresAt = undefined;
        await user.save({validateBeforeSave: false})
        res.status(400).json({
            error: error.message,
        })
    }
}

exports.updatePassword = async(req,res) => {
    try {
        var {currentPassword, passsword, confirmPassword} = req.body;
        const encryptedPassword = await bcrypt.hash(currentPassword,12)
        var user = await User.findOne(encryptedPassword);
        if(!user){
            return res.status(401).json({
                error: "invalid password"
            })
        }

        user.password=passsword;
        user.confirmPassword=confirmPassword;
        await user.save();
        createAndSendToken(user,res)
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }

}

exports.protect = async (req, res, next) => {
    try {
        var token = null;

        //extracting token from headers
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            res.status(401).json({
                error: "PLease sign in"
            })
        }
        //verfiying token
        var { id: userId, iat: tokenIssuedAT } = await promisify(JWT.verify)(token, process.env.WEB_SECRET); //convert callback into promise
        
        //find user in DB
        var user = await User.findById(userId);
        if (!user) {
            res.status(401).json({
                error: "PLease sign in with correct token",
            })
        }

        //is password changed
        if (user.passwordChangedAt) {
            var passwordChangedAt = user.passwordChangedAt;
            var isPasswordChangedAfter = passwordChangedAt.getTime() > tokenIssuedAT * 1000;
            if (isPasswordChangedAfter) {
                res.status(401).json({
                    error: "password has been changed, please login again !",
                })
            }
        }
        req.user = user
        next()
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}

exports.restrictTo = (...roles) => async (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        res.status(401).json({
            error: "You are not allowed to do this action"
        })
    }
    next()
}