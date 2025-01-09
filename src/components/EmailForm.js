import React, {useRef, useState} from "react"; 
import Navbar from './Navbar.jsx';
import FooterLanding from './FooterLanding.jsx';
import './EmailBox.css'

//The useRef Hook allows you to persist values between renders.
//It can be used to store a mutable value that does not cause a re-render when updated; can be used to access DOM elements 

//useState manages the state of a functional component, triggers rerenders when value changes


const onSubmit = async (event) => {

    console.log(event); 
    
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "57bf412d-c318-409e-90f7-9f444d13213e");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    } 

    
  };


const EmailEvent = ({isMobile}) => {
      var nameRef = useRef(); 
      var emailRef = useRef();
      var messageRef = useRef();

      var [thanks, setThanks] = useState(" "); 

      const WaitandClear = () => {
        setThanks("Thanks for your email!");
        setTimeout(Clear, 2000); 
      }

      //reset fields when submit button clicked
      const Clear = () => {

        nameRef.current.value = " "; 
        emailRef.current.value = " "; 
        messageRef.current.value = " ";

        setThanks(null);
      }
      
      return (
        <>
        {isMobile ? 
        <div className="emailbox">
          <form onSubmit={onSubmit}>
          <div className="w-full h-full p-[5px] rounded-[20px] bg-gradient-to-r from-black to-blue-900" style={{ minHeight: '80vh' }}>
                <div className="bg-gray-100 rounded-[20px] py-5 px-20 flex justify-evenly items-center flex-col" style={{ minHeight: '80vh' }}
                >
                    <h3 className="text-blue-900 text-xl font-bold">Email</h3>
                    <input className="bg-gray-100 text-blue-900 mt-4 input-field" type="text" name="name" ref={nameRef} placeholder="Name"/>
                    <input className="bg-gray-100 text-blue-900 mt-4 input-field" type="email" name="email" ref={emailRef} placeholder="Email"/>
                    <textarea className="bg-gray-100 text-blue-900 mt-4 text-field"  name="message" ref={messageRef} placeholder="Message"></textarea>
                    <button onClick={WaitandClear }  className="bg-gradient-to-r from-black to-blue-900 text-white rounded-full px-5 py-2 text-sm font-bold mx-2 my-4" type="submit">Submit Email</button>
                    <p className="text-blue-900 mt-4" >{thanks}</p>
                </div>
                </div>
          </form>
          </div>
          :
          <div className="emailbox">
          <form onSubmit={onSubmit}>
          <div className="w-full h-1/2 p-[5px] rounded-[20px] bg-gradient-to-r from-black to-blue-900" style={{ minHeight: '80vh' }}>
                <div className="bg-gray-100 rounded-[20px] py-5 px-20 flex justify-evenly items-center flex-col" style={{ minHeight: '80vh' }}
                >
                    <h3 className="text-blue-900 text-xl font-bold">Email</h3>
                    <input className="bg-gray-100 text-blue-900 mt-4 input-field" type="text" name="name" ref={nameRef} placeholder="Name"/>
                    <input className="bg-gray-100 text-blue-900 mt-4 input-field" type="email" name="email" ref={emailRef} placeholder="Email"/>
                    <textarea className="bg-gray-100 text-blue-900 mt-4 text-field"  name="message" ref={messageRef} placeholder="Message"></textarea>
                    <button onClick={WaitandClear }  className="bg-gradient-to-r from-black to-blue-900 text-white rounded-full px-5 py-2 text-sm font-bold mx-2 my-4" type="submit">Submit Email</button>
                    <p className="text-blue-900 mt-4" >{thanks}</p>
                </div>
                </div>
          </form>
          </div>
        }
        </>
      );
}

export default EmailEvent
