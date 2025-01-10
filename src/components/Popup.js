import React, { useState } from 'react'; 
import {isMobile, isTablet} from 'react-device-detect';
import './Popup.css'

export default function Popup ({ show, title, description, closePopup }) {
    const mobile_view = isMobile || isTablet;
    //only return if show is true - show passed in with other component arguments where component is used (ie returned in return section of another component)
    return(show == true) ? mobile_view ? (
        <>
        <div className="popup">
        <div className="bg-gradient-to-r from-black to-blue-900 rounded-[20px] px-[5%] py-[2%] max-h-[50vh] max-w-[80vh] flex justify-evenly items-center flex-col overflow-y-auto"
        >
        <h3 className="text-white text-xl font-bold">{title}</h3>
        <p className="text-white mt-4">{description}</p>
        <button onClick={closePopup} className="bg-white text-blue-900 rounded-full px-5 py-2 text-sm font-bold mx-2 my-4">
            Close
        </button>
        </div>
        </div>
        </>
    ) :
    (
        <>
        <div className="popup">
        <div className="bg-gradient-to-r from-black to-blue-900 rounded-[20px] px-[5%] py-[2%] min-h-[280px] max-w-[900px] flex justify-evenly items-center flex-col"
        >
        <h3 className="text-white text-xl font-bold">{title}</h3>
        <p className="text-white mt-4">{description}</p>
        <button onClick={closePopup} className="bg-white text-blue-900 rounded-full px-5 py-2 text-sm font-bold mx-2 my-4">
            Close
        </button>
        </div>
        </div>
        </>
    ) : "";

}
