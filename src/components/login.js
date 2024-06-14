import React, { useState } from "react";
// import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Login() {

  const navigate = useNavigate()
    const initialValue = {
        email: '',
        password: ''
    }
     
      const [user, setUser] = useState(initialValue);
      const { email, password } = user;
    
      const onValueChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
      }
    
      const handleSubmit = (e) => {
      
        axios
          .post('http://localhost:8000/login', user)
          .then((response) => {
            console.log(response.data);
            if (response.data.error) {
              console.log("glt h raha ");

            console.log(response.data.error);
            } else {
              console.log("sii h beta")
              console.log(response.data.message);
              navigate('/dashboard');
              const token = response.data.data;
              localStorage.setItem('token', token);
          // navigate('/contact');
              
            }
          })
          .catch((error) => {
            console.log('error ' + error);

          })
          

      }
    
  return (

  <div className="flex items-center justify-center px-2 py-8 mx-auto md:h-screen lg:py-0">
      <div className="flex-1 lg:block m-[5rem] ml-[6rem]">
            <img src="https://ouch-cdn2.icons8.com/PpWgD6N3qSTdjMOtMCDwOEUK37igYDXdPbv52-Tz8P0/rs:fit:368:386/czM6Ly9pY29uczgu/b3VjaC1wcm9kLmFz/c2V0cy9zdmcvNzQz/L2JiMzU4ZmIxLWQ2/NWItNDBlMy1hMzBm/LWIwNjQwY2FjMTJm/Yi5zdmc.png" className="w-[28rem] h-[30rem]" />
        </div>
      <div className="flex-1 rounded-lg mr-[5rem] shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-4 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white">
                  Log in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-white">Your email</label>
                      <input type="email" name="email" value = {email} onChange={(e)=> onValueChange(e)} id="email" className=" sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                      <input type="password" name="password" value={password} onChange={(e)=>{onValueChange(e)}} id="password" placeholder="••••••••" className="sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required=""/>
                  </div>
                  <div className="flex items-center justify-between">
                      <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border  rounded  focus:ring-3 focus:ring-primary-300 bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800" required=""/>
                          </div>
                          <div className="ml-3 text-sm">
                            <label for="remember" className=" text-gray-100">Remember me</label>
                          </div>
                      </div>
                      {/* <a href="#" className="text-sm font-medium text-white hover:underline text-primary-500">Forgot password?</a> */}
                  </div>
                  <button
            onClick={(e) => handleSubmit(e)}
            className="w-full px-4 py-2 text-white font-medium bg-[#e36414] hover:bg-[#fb8b24] active:bg-[#e36414] rounded-lg duration-150"
          >Log in</button>
                  <p className="text-sm font-light  text-gray-400">
                      Don’t have an account yet? <Link to="/sign" className="font-medium text-primary-600 hover:underline text-[#e36414]">Sign up</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
  )
}