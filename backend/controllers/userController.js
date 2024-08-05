import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  console.log(user)
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201).json({  
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin:user.isAdmin,
      profileImage:user.profileImage
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

const RegisterUser = asyncHandler(async (req, res) => {
  console.log("heyyy thaere backend");
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin:user.isAdmin
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

const LogoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: " User Logout User" });
});

const getUserProfile = asyncHandler(async (req, res) => {
  console.log("helllooooooo");
  console.log(req.file, "filleeeeeeeee");
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    profileImage: req.user.profileImage,
  };
  res.status(200).json(user);
 
});


const UpdateUserProfile = asyncHandler(async (req, res) => {
  console.log(req, "hhhhhhhhhh");
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    // if (req.file) {
    //   console.log(req.file.filename);
    //   user.profileImage = req.file.filename;
    // }
    const updatedUser = await user.save();
    console.log('updatedUser',updatedUser)
   let response= res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
      isAdmin:updatedUser.isAdmin
    });
    console.log(response)
  } else {
  }
});

const updateImage =asyncHandler(async (req,res)=>{
  console.log(req.file,'req @@@@@@')
  const user = await User.findById(req.user._id);
  console.log(user,"in image update");
  if (user) {
    user.profileImage = req.file.filename
  }

  const updateUserImage=await user.save()
  res.status(200).json({
    _id: updateUserImage._id,
    name: updateUserImage.name,
    email: updateUserImage.email,
    isAdmin:updateUserImage.isAdmin,
    profileImage:updateUserImage.profileImage
  })

})

export {
  authUser,
  RegisterUser,
  LogoutUser,
  getUserProfile,
  UpdateUserProfile,
  updateImage
};
