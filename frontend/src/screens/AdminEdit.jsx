import React from "react";
import { useSelector, useDispatch } from "react-redux";
import FormContainers from "../components/FormContainers";
import { useState, useEffect } from "react";
import Loader from "../components/Loader";
import { useEditUserMutation } from "../slices/adminApiSlice";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { setCredentials } from "../slices/authSlice";
import { toast, ToastContainer  } from "react-toastify";

const AdminEdit = () => {
  const { userForEdit } = useSelector((state) => state.admin);
  const {userInfo}=useSelector((state)=>state.auth)
  console.log(userForEdit?userForEdit:null,userInfo, "userforedit admin","admin");
  

  const [EditUser, { isLoading }] = useEditUserMutation();
  const [name, setName] = useState(userForEdit ? userForEdit.name : "");
  const [email, setEmail] = useState(userForEdit ? userForEdit.email : "");
  // const [password, setPassword] = useState("");
  // const [ConfirmPassword, setConfirmPassword] = useState("");
  const [profileImage, setProfileImage] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
 
    e.preventDefault();
    
    try {
      const res = await EditUser({
        _id: userForEdit._id,
        name,
        email,
        profileImage,
      }).unwrap();

      console.log(res, "its just the res");
      navigate("/admin");
      toast.success("Updated")
      // dispatch(setCredentials({ ...res }));
      console.log("after setCredentials");
       
        
     

     
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <FormContainers>
        <h1>Update profile</h1>
        <Form onSubmit={submitHandler}>
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
      <ToastContainer />
    </>
  );
};

export default AdminEdit;
