import React from 'react'
import {Link} from 'react-router-dom'
const Navbar=()=>{
  return(
    <div>
      <header>
                   <nav className=" items-center pt-2 px-4 mx-auto max-w-screen-xl sm:px-8 sm:flex sm:space-x-5 ">
                   <ul className="py-4 flex-1 items-center flex space-x-4 sm:space-x-10 sm:justify-center text-center">
                         <li>
                          <Link to="/"> <div className="flex items-center text-gray-900 text-lg font-semibold hover:text-white hover:scale-125 hover:transition delay-100 duration-100 ease-in-out">
                          Home
                           </div></Link>
                       </li>
                       <li>
                          <Link to="/about"> <div className="flex items-center text-gray-900 text-lg font-semibold hover:text-white hover:scale-125 hover:transition delay-100 duration-100 ease-in-out">
                          About Us
                           </div></Link>
                       </li>
                       <li>
                          <Link to="/contact"> <div className="flex items-center text-gray-900 text-lg font-semibold  hover:text-white hover:scale-125 hover:transition delay-100 duration-100 ease-in-out">
                           Contact Us
                           </div></Link>
                       </li>
   
                   </ul>
                   <div>
                   <Link to="/sign"> <div className="mr-[0.2rem] text-black px-2 py-1 bg-white rounded-lg border-black text-gray-900 text-[1rem] font-semibold hover:scale-125 hover:transition delay-50 duration-100 ease-in-out">
                           Sign Up
                           </div></Link>
                   </div>
                   <div>
                   <Link to="/login"> <div className="mr-[1rem] text-black px-3 py-1 bg-white rounded-lg border-black text-gray-900 text-[1rem] font-semibold hover:scale-125 hover:transition delay-50 duration-100 ease-in-out">
                           Log In
                           </div></Link>
                   </div>
   
               </nav>
                   </header>
    </div>
  )
}

export default Navbar
