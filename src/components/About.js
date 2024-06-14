import React from 'react'
import Navbar from './Navbar'

const About = () => {
  return (
    <div className="relative fixed overflow:hidde">
      {/* <h1>hey i m about</h1> */}
      {/* <img src="\images\bg-about.webp" className="w-full h-[46rem] fixed"/> */}
      <div className=' absolute top-0 left-0 w-full h-full bg-cover bg-fixed z-0' style={{ backgroundImage:'url(/images/bg-about.webp)'}}></div>

<div className="relative align-items-center">
<div className="border-b-2"><Navbar></Navbar></div>

  <p className="text-6xl text-semibold text-white mt-[5rem] ml-[5rem]">About Us</p>
<p className="w-[22rem] h-[30rem] text-white ml-[5rem] mt-2 text-[1.1rem] text-semibold italic">EduConnect is your one-step destination for seamless, comprehensive, and effective preparation for competitive exams. We understand the challenges students face when gearing up for exams and staying updated with current affairs, and we're here to make the journey smoother and more rewarding.Assess your knowledge and skills with a wide range of mock tests and practice quizzes.it offers access to previous year college papers, current affairs news, live classes, and competitive exam preparation materials,</p>
    </div>
    </div>
  )
}

export default About
