import React from 'react'
import { Link } from 'react-router-dom'
const Cards = () => {
const features = [
    {
        icon:
    <img src="\images\icons\online-tutorials.png"/>,
        title: "Online Video Lectures",
    },
    {
        icon:
        <img src="\images\icons\papers.jpg"/>,
        title: "Sample papers",
    },
    {
        icon:
        <img src="\images\icons\einstein.png"/>,
        title: "Daily brain Teasing Questions",
    },
    {
        icon:
        <img src="\images\icons\brainbooster.png"/>,
        title: "Current affairs news",
    },
    {
        icon:
    <img src="\images\icons\computer-courses.png"/>,
           
        title: "Free Online Courses",

    },
    {
        icon:
    <img src="\images\icons\help.png"/>,
        title: "24×7 online support",
    },
]

return (
    <section className="">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8 w-full h-full bg-cover bg-fixed" style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.4)), url(/images/b3.jpg)`}}>
  {/* Content goes here */}

            <div className="relative max-w-2xl mx-auto sm:text-center">
                <div className="relative z-10">
                    <h3 className="text-white text-3xl pt-[2rem] font-semibold sm:text-4xl">
                    Making learning easier and more convenient for you.
                    </h3>
                </div>
                <div className="absolute inset-0 max-w-xs mx-auto h-44 blur-[120px]"></div>
            </div>
            <div className="relative mt-12">
                <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 ">
                    {
                        features.map((item, idx) => (
                            <Link to="/sign"><li key={idx} className="grid grid-cols-2 shadow-lg shadow-black text-white mb-[5rem] h-[10rem] w-[20rem] cursor-pointer space-y-3 p-6 rounded-lg bg-transparent hover:-translate-y-4  hover:shadow-lg hover:shadow-white hover:border-2 hover:border-white transition duration-300 ease-in-out delay-50 ">
                                <div className="text-white  w-[7rem] h-[7rem] ">
                                    {item.icon}
                                </div>
                                <h4 className="text-xl text-white font-semibold">
                                    {item.title}
                                </h4>
                                {/* <p>
                                    {item.desc}
                                </p> */}
                            </li></Link>
                        ))
                    }
                </ul>
            </div>
        </div>
    </section>
)
}

export default Cards
