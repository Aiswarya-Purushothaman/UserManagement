import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Card } from "react-bootstrap";
import FormContainers from "../components/FormContainers";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Loader from "../components/Loader";
import { setCredentials } from "../slices/authSlice";
import { useNavigate } from "react-router-dom";
import {
  useUpdateUserMutation,
  useUpdateImageMutation,
} from "../slices/usersApiSlice";
import { PROFILE_IMAGE_DIR_PATH } from "../utils/constants";
const ProfileScreen = () => {
  
  let { userInfo } = useSelector((state) => state.auth);
  userInfo = userInfo?.data ? userInfo.data : userInfo;


  console.log("refister hain");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState( userInfo?.profileImage ? userInfo.profileImage : null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(userInfo, "userInfo in profile");
  const [UpdateUser, { isLoading }] = useUpdateUserMutation();
  const [UpdateImage] = useUpdateImageMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
    setProfileImage(userInfo.profileImage);
  }, [userInfo.setName, userInfo.setEmail,userInfo.setProfileImage]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== ConfirmPassword) {
      toast.error("Passwords Do Not Match");
    } else {
      try {
        console.log("updatee try");
        const res = await UpdateUser({
          _id: userInfo._id,
          name,
          email,
          password,
          profileImage: userInfo?.profileImage ? userInfo.profileImage : null,
        }).unwrap();
        console.log(res);
        // console.log(res,'res userInfo')
        dispatch(setCredentials({ ...res }));

        toast.success("Updated");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };
  const image = () => {
    document.getElementById("fileInput").click();
  };
  const handleFileChange = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    console.log(e.target.files[0], "fileedssssss");
    console.log(userInfo._id);
    formData.append("id", userInfo._id);
    try {
      console.log("userinfoinupdata image", userInfo);
      const res = await UpdateImage(formData);
      console.log(res);
      dispatch(setCredentials({ ...res }));

      // setProfileImage(profileImage)
    } catch (error) {
      console.log("error in profile", error);
    }
  };
  return (
    <>
      <ToastContainer />
      <FormContainers>
        <h1>Update profile</h1>
        {userInfo.profileImage ? (
          <>
            <Card.Img
              variant="top"
              value={profileImage}
              src={`http://localhost:5000/public/${userInfo.profileImage}`}
              className="rounded-circle mx-auto mt-"
              style={{ width: "150px", height: "150px" }}
              onClick={image}
            />
          </>
        ) : (
          <Card.Img
            variant="top"
            src="https://media.istockphoto.com/id/1283675387/photo/blue-male-avatar-blank-shape-in-white-hole-3d-illustration.jpg?s=612x612&w=0&k=20&c=a5Nzdfbp_1lx4IKmieJ8ZaTaLTxMxY_UOOfTDOU8gRM="
            className="rounded-circle mx-auto mt-3"
            style={{ width: "150px", height: "150px" }}
            onClick={image}
          />
        )}
        <input
          type="file"
          name="file"
          id="fileInput"
          onChange={handleFileChange}
          hidden
        />
        <Form onSubmit={submitHandler} enctype="multipart/form-data">
          <Form.Group className="my-2" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="Name"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group className="my-2" controlId="email">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group className="my-2" controlId="ConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="ConfirmPassword"
              placeholder="Confirm Password"
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          {/* <Form.Group className="my-2" controlId="profileImage">
            <Form.Label>Profile Picture</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setProfileImage(e.target.files[0])}
            ></Form.Control>
          </Form.Group> */}
          {isLoading && <Loader />}

          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        </Form>
      </FormContainers>
    </>
  );
};

export default ProfileScreen;
