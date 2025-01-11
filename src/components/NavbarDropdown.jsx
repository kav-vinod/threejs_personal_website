import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; 
import { FaBars } from 'react-icons/fa';

const NavbarDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    //gets u active path/route 
    const isActive = (path) => location.pathname === path;

    return (
        <div className="relative flex flex-col items-center justify-center">
            <div className="relative items-center">
            <button className="w-10 h-10 rounded-lg bg-white items-center justify-center flex shadow-md" onClick={toggleDropdown}>
                <div className="py-[5%] px-[20%]">
                    <FaBars />
                </div>
            </button>
            {isOpen && (
                <div className="absolute border-2 border-gray-300 items-center justify-center bg-white text-black rounded-[10px] p-[10%] mt-2 left-1/2 transform -translate-x-1/2">
                    <a href="/aboutme" className={`hover:blue-gradient_text font-bold ${isActive('/aboutme') ? 'blue-gradient_text font-bold' : ''}`} >About Me</a>
                    <br></br>
                    <a href="/projects" className={`hover:blue-gradient_text font-bold ${isActive('/projects') ? 'blue-gradient_text font-bold' : ''}`} >Projects</a>
                    <br></br>
                    <a href="/experience" className={`hover:blue-gradient_text font-bold ${isActive('/experience') ? 'blue-gradient_text font-bold' : ''}`} >Experience</a>
                    <br></br>
                    <a href="/email" className={`hover:blue-gradient_text font-bold ${isActive('/email') ? 'blue-gradient_text font-bold' : ''}`} >Contact</a>
                </div>
            )}
            </div>
        </div>
    );
};

export default NavbarDropdown;
