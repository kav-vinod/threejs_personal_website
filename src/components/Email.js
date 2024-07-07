import React from "react"; 
import Navbar from './Navbar.jsx';
import FooterLanding from './FooterLanding.jsx';
import { Canvas} from '@react-three/fiber';
import { Dodecahedron, OrbitControls } from '@react-three/drei';
import Anothertest from "./Anothertest.jsx"; 
import { MeshStandardMaterial, PointLight } from 'three';

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
         
          <Anothertest />
        </>
      );
}

export default Email
