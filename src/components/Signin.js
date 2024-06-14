import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Warning } from "postcss";


export default function Signin(){
  const initialValue={
    name:"",
    email:"",
    phone:"",
    password:"",
  };


  const navigate=useNavigate(); 
  const [userData,setUserData] = useState(initialValue);
  const { name, email, phone, password }=userData;


  
  
  const onValueChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/register", userData)
      .then((response) => {
        console.log(response.data);
    navigate("/dashboard");
       
      })
      .catch((error) => {
        console.log("error " + error);
        Warning(error);
      });
  };

  return (
    <div>
    <div className="flex items-center justify-center px-2 py-6 mx-auto md:h-screen lg:py-0">
        <div className="flex-1 lg:block">
        <img src="https://ouch-cdn2.icons8.com/UmN6i98Cq_AMoU7q73ScBhSCFx49AR931KfmWxeqU_Y/rs:fit:368:261/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvMjQ0/LzU0YTAxNjgxLWMw/ZjctNGQ2OC1hNzY2/LTViMTYwYjE3ZmMy/Yy5zdmc.png" className="w-[35rem] h-[30rem]" />

        </div>
    <div className="flex-1 rounded-lg mr-[4rem] shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
        <div className="p-4 space-y-4 md:space-y-[1rem] sm:p-8">
          <h1 className="text-xl font-bold mr-4 md:text-2xl text-white pl-[8rem] pb-[0.5rem]">Sign up</h1>
          <input
            type="text"
            className="block text-black  outline-none border border-grey-light w-full p-3 rounded mb-4"
            name="name"
            value={name}
            onChange={(e)=>onValueChange(e)}
            placeholder="Full Name"
           />

          <input
            type="email"
            className="block text-black  outline-none border border-grey-light w-full p-3 rounded mb-4"
            name="email"
            value={email}
            onChange={(e) => onValueChange(e)}
            placeholder="Email"
          />

          <input
            type="tel"
            className="block  text-black outline-none border border-grey-light w-full p-3 rounded mb-4 "
            name='phone'
            value={phone}
            onChange={(e) => onValueChange(e)}
            placeholder="Phone No.
            "
          />

          <input
            type="password"
            className="block  text-black outline-none border border-grey-light w-full p-3 rounded mb-4"
            name="password"
            value={password}
            onChange={(e) => onValueChange(e)}
            placeholder="Password"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="w-full px-4 py-2 text-white font-medium bg-[#e36414]  hover:bg-[#fb8b24] active:bg-[#e36414]  rounded-lg duration-150"
          >
            Create account
          </button>

          <div className="text-center text-sm  text-white mt-4">
            <div className=" text-white mt-6">
          Already have an account?
          <Link
            className="no-underline text-[#e36414]  border-b border-blue text-blue"
            to='/login'
          >
            Log in
          </Link>
          .
        </div>
          </div>
        </div>
</div>   
      </div>
    </div>
    </div>
  );
}