import User from "../models/user.js";

const UsersList = async (req, res) => {
  try {
    const users = await User.find({});

    res.status(200).json(users);
  } catch (error) {
    console.log("error happend in userslist in admin controller", error);
  }
};

const deleteUser=async(req,res)=>{

try {
 const id = req.body.id
 console.log(id);
  const deleted = await User.findByIdAndDelete(id)
  res.status(200).json(deleted)


} catch (error) { 
  console.log("not deleted the user",error)
}

}

const editUser=async (req,res)=>{
  
  const user = await User.findById(req.body._id);
  console.log(user,"editer user")
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

   
    if (req.file) {
      console.log(req.file.filename);
      user.profileImage = req.file.filename;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profileImage: updatedUser.profileImage,
      isAdmin: updatedUser.isAdmin
    });
  } else {
  }
}

export { UsersList,
  deleteUser,
  editUser
 };
