import React from 'react'; 
import './Popup.css';
import {isMobile, isTablet} from 'react-device-detect';

export default function MusicPopup({ show, closePopup }) {
  const mobile_view = isMobile || isTablet;
  return show ? mobile_view ? (
    <>
      <div className="popup">
        <div className="bg-gradient-to-r from-black to-blue-900 rounded-[20px] px-[5%] py-[2%] max-h-[70vh] max-w-[80vh] flex justify-evenly items-center flex-col overflow-y-auto overflow-x-auto">
          <h3 className="text-white text-xl font-bold"> Here's one of Spotify's daily mixes for me - check out what I've been listening to! I generally like upbeat music. </h3>
          <iframe
            style={{ borderRadius: '3vh' }} 
            src="https://open.spotify.com/embed/playlist/37i9dQZF1E38BhSUwPXcQk?utm_source=generator&theme=0"
            width="100%"
            height="352" 
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <button onClick={closePopup} className="bg-white text-blue-900 rounded-full px-5 py-2 text-sm font-bold mx-2 my-2">
            Close
          </button>
        </div>
      </div>
    </>
  ) :
  (
    <>
      <div className="popup">
        <div className="bg-gradient-to-r from-black to-blue-900 rounded-[20px] px-[5%] py-[2%] min-h-[280px] max-w-[900px] flex justify-evenly items-center flex-col overflow-y-auto">
          <h3 className="text-white text-xl font-bold"> Here's one of Spotify's daily mixes for me - check out what I've been listening to! I generally like upbeat music. </h3>
          <iframe
            style={{ borderRadius: '12px' }} 
            src="https://open.spotify.com/embed/playlist/37i9dQZF1E38BhSUwPXcQk?utm_source=generator&theme=0"
            width="100%"
            height="352" 
            frameBorder="0"
            allowFullScreen=""
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
          <button onClick={closePopup} className="bg-white text-blue-900 rounded-full px-5 py-2 text-sm font-bold mx-2 my-4">
            Close
          </button>
        </div>
      </div>
    </>
  ) : "";
}