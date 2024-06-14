import React, { useState } from 'react'
import axios from 'axios';
import { genRadiusStyle } from 'antd/es/input-number/style';
let Thought = () => {
    const [data,setdata]=useState(0);
    // const getthought= async ()=>{
    //    const {data}= await axios.get("https://type.fit/api/quotes")
    //    console.log(data);
    //     setuser(data)
    // }
    const arr=["Life is change. Growth is optional. Choose wisely.","Genius is one percent inspiration and ninety-nine percent perspiration.",
        "Dare to dream. Dare to believe. Dare to take action.",
        "Peace comes from within. Do not seek it without.",
        "Life is a learning experience, only if you learn.",
        "Today is the tomorrow we worried about yesterday.",
        "Dreamers are the architects of greatness.",
        "Difficulties increase the nearer we get to the goal.",
        "Fate is in your hands and no one elses",
        "Be the chief but never the lord.",
        "Nothing happens unless first we dream.",
        "Well begun is half done.",
        "Self-complacency is fatal to progress.",
        "What you give is what you get.",
        "We can only learn to love by loving.",
        "You'll see it when you believe it."
]
const settime = setTimeout(() => {
    setdata((data+1)%arr.length);
  }, 5000);
        return (
            <section className="pb-8" style={{ background: "linear-gradient(143.6deg, rgba(192, 132, 252, 0) 20.79%, rgba(232, 121, 249, 0.26) 40.92%, rgba(204, 171, 238, 0) 70.35%)" }}>
                <div className="max-w-screen-xl mx-auto md:px-8">
                    <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
                        <div className="flex-1 sm:hidden lg:block">
                            <img src="\gif\cyborg-117.gif" className="md:max-w-lg sm:rounded-lg" alt="" />
                        </div>
                        
                        <div className=" max-w-xl px-4 pt-[5rem] space-y-3 h-[20rem] w-[50rem] mt-6 sm:px-0 md:mt-0 lg:max-w-2xl" >
                            <h3 className="text-indigo-700 font-bold text-2xl ">
                                Inspiring Sentiment
                            </h3>
                            <p className="h-[8rem] text-gray-800 leading-5 text-3xl font-semibold sm:text-4xl pb-4 pt-4 font-'Noto Serif' italic">
                               {arr[data]}
                            </p>
                            <button onClick={()=>{setdata(data+1)}}  className="bg-purple-200 border-2 p-2 ml-[35rem]  rounded-lg">Change</button>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
export default Thought
