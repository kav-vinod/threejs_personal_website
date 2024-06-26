import React, { useState } from 'react'; 
import './Popup.css'

export default function Popup ({ show, title, description, closePopup }) {
    //only return if show is true - show passed in with other component arguments where component is used (ie returned in return section of another component)
    return(show == true) ? (
        <>
        <div className="popup">
        <div className="bg-gradient-to-r from-black to-blue-900 rounded-[20px] py-10 px-20 min-h-[280px] max-w-[900px] flex justify-evenly items-center flex-col"
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
