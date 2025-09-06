import React from 'react'
import { IoIosMenu, IoLogoGithub } from "react-icons/io";
import { IoSearch } from 'react-icons/io5';
import { RiGitRepositoryCommitsLine } from 'react-icons/ri';

interface NavbarProps {
    pageTitle: string;
}

const Navbar = ({ pageTitle }: NavbarProps) => {
    return (
        <>

            <div className="navbar flex items-center px-6 py-3 justify-between border-b">
                <div className="left flex items-center space-x-3">

                    <div className="bg-transparent border rounded p-1">
                        <IoIosMenu size={30} />
                    </div>
                    <IoLogoGithub size={30} />
                    <p className="text-xl ml-2">{pageTitle}</p>
                </div>

                <div className="rightbar flex space-x-5 items-center">
                    <div className="relative">
                        <input type="text" className='border px-2 py-0.5 pr-8 rounded text-md' placeholder='Search' />
                        <IoSearch className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400' />
                    </div>

                    <div className="bg-transparent border rounded p-1">

                        <RiGitRepositoryCommitsLine size={25} />
                    </div>


                    <div className="border w-8 h-8 rounded-full bg-white">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png" alt="" />
                    </div>
                </div>

            </div>


        </>
    )
}

export default Navbar