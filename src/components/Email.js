import React from "react"; 
import Navbar from './Navbar.jsx';
import FooterLanding from './FooterLanding.jsx';

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

    //const name = document.getElementById("name")
    //console.log(name); 
    
  };

const Email = () => {
    
      return (
        <>
         <Navbar />
         <style>
                {`
                    body {
                        background: linear-gradient(to bottom, #ffffff, hsl(210, 60%, 40%));
                        min-height: 100vh;
                        margin: 0;
                        padding: 0;
                    }
                    .input-field {
                        border: 3px solid;
                        border-image-slice: 1;
                        border-width: 2px;
                        border-image-source: linear-gradient(to right, black, blue900);
                        padding: 10px;
                        width: 100%;
                        border-radius: 5px;
                    }
                    .text-field {
                        border: 3px solid;
                        border-image-slice: 1;
                        border-width: 2px;
                        border-image-source: linear-gradient(to right, black, blue900);
                        padding: 10px;
                        width: 100%;
                        height: 200px;
                        border-radius: 5px;
                    }
                `}
        </style>
        <div className=" py-20 px-10 items-center min-h-screen w-1/2">
          <form onSubmit={onSubmit}>
          <div className="w-full h-1/2 p-[5px] rounded-[20px] bg-gradient-to-r from-black to-blue-900" style={{ minHeight: '80vh' }}>
                <div className="bg-gray-100 rounded-[20px] py-5 px-20 flex justify-evenly items-center flex-col" style={{ minHeight: '80vh' }}
                >
                    <h3 className="text-blue-900 text-xl font-bold">Email</h3>
                    <input className="bg-gray-100 text-blue-900 mt-4 input-field" type="text" name="name" placeholder="Name"/>
                    <input className="bg-gray-100 text-blue-900 mt-4 input-field" type="email" name="email" placeholder="Email"/>
                    <textarea className="bg-gray-100 text-blue-900 mt-4 text-field"  name="message" placeholder="Message"></textarea>
                    <button onClick="name.value = '' && input.value = '' && textarea.value = ''" className="bg-gradient-to-r from-black to-blue-900 text-white rounded-full px-5 py-2 text-sm font-bold mx-2 my-4" type="submit">Submit Email</button>
                </div>
                </div>
          </form>
          </div>
          <FooterLanding />
        </>
      );
}

export default Email
