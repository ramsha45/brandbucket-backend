const User = require("../models/user");

exports.addUser = async(useProfile) => {
  try {
      const uniqueUser = await User.findOne({email: useProfile.email})
      if(uniqueUser){
        console.log("uniqueUser", uniqueUser)
        throw new Error("This User already exist")
      }
      var user = await User.create(useProfile);
      return user
  } catch (error) {
      throw new Error(error.message)
  }
}

exports.getUser = async(userId) => {
  try {
      var user = await User.findOne({userId});
      return user;
  } catch (error) {
      return new Error(error.message)
  }
}