import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'

const Contact = () => {
    
const servicesItems = ["Mobile development", "UI/UX Design", "web development", "SEO"]

  return (
    <div>
       <div className="shadow-lg bg-[#adb5bd] border-b-2"><Navbar></Navbar></div>
    <main className="flex overflow-hidden">
        <div className="flex-1 hidden lg:block">
            <img src="gif\coworking-customer-service-person-answering-question.gif" className="w-full h-screen object-cover" />
        </div>
        <div className="pt-8 flex-1 lg:flex lg:justify-center ">
            <div className="max-w-lg flex-1 mx-auto px-1 text-gray-600 ">
                <div>
                    <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                        Get in touch
                    </h3>
                    <p className="mt-3">
                        We’d love to hear from you! Please fill out the form bellow.
                    </p>
                </div>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-4 mt-8 lg:pb-8"
                >
                    <div>
                        <label className="font-medium">
                            Full name
                        </label>
                        <input
                            type="text"
                            required
                            className="w-full mt-2 px-2 py-2 text-gray-500 bg-transparent outline-none border focus:border-2 focus:shadow-xl shadow-[#b5179e] shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full mt-2 px-2 py-2 text-gray-500 bg-transparent outline-none border focus:border-2 focus:shadow-xl shadow-[#b5179e] shadow-sm rounded-lg"

                        />
                    </div>
                    <div>
                        <label className="font-medium">
                            Phone number
                        </label>
                        <div className="relative mt-2">
                            <input
                                type="number"
                                required
                                className="w-full mt-2 px-2 py-2 text-gray-500 bg-transparent outline-none border focus:border-2 focus:shadow-xl shadow-[#b5179e] shadow-sm rounded-lg"

                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-medium">
                            Message
                        </label>
                        <textarea required className="w-full mt-2 h-28 px-3 py-2 resize-none appearance-none bg-transparent outline-none border focus:border-2 focus:shadow-xl shadow-[#b5179e] shadow-sm rounded-lg"></textarea>
                    </div>
                    <button
                        className="w-full px-2 py-2 text-white font-medium bg-gray-800 hover:bg-gray-700 active:bg-gray-900 rounded-lg duration-150"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    </main>
    </div>
  )
}

export default Contact
