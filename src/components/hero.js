import React from 'react'
import { useEffect, useState } from 'react'
// import Thought from './Thought'
import Typewriter from 'typewriter-effect'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
let Hero = () => {
    const [state, setState] = useState(false)
    // Replace javascript:void(0) paths with your paths
    // const navigation = [
    //     { title: "Home", path: "/" },
    //     { title: "About", path: "/about" },
    //     { title: "Contact Us", path: "/contact" },
    //     // { title: "Pricing", path: "javascript:void(0)" }
    // ]

    useEffect(() => {
        document.onclick = (e) => {
            const target = e.target;
            if (!target.closest(".menu-btn")) setState(false);
        };
    }, [])
    const Brand=()=>(
        <div className="flex items-center justify-between py-2 md:block">
            <a href="javascript:void(0)">
                <img
                    src="https://img.icons8.com/?size=48&id=SHlZSea7WHzv&format=png"
                    width={40}
                    height={30}
                    alt="EduConnect"
                />
            </a>
        </div>
    )

    return (
        <div className='relative'>
        <div className=' absolute top-0 left-0 w-full h-full bg-cover bg-fixed z-0' style={{ backgroundImage:'url(/images/bg.webp)'}}></div>
            <div className='relative'>
                <Navbar></Navbar>
                <section>
                    <div className="max-w-screen-xl mx-auto px-4 pt-[22rem] text-gray-600 overflow-hidden md:px-8 md:flex">
                        <div className='flex-none space-y-3 max-w-xl mb-[16rem] mt-[-10rem]'>
                            <h1 className="text-2xl text-white-500 font-semibold font-serif sm:text-7xl ml-[3rem]">
                                <Typewriter
                                    options={{
                                    autoStart:true,
                                    loop:true, 
                                    delay:50,
                                    strings: ["EduConnect"] 
                                    }}
                                />
                                
                            </h1>
                            <p className='ml-[3rem] text-white text-2xl italic font-semibold'>Joining the Dots of Education</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        
    )
}

export default Hero
