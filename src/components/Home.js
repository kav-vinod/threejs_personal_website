
import * as THREE from 'three';

import { useEffect, useRef, useState } from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Box from './Box.js'
import TitleText from './TitleText.js'
import Boxstars from './Boxstars.js'
import Contact from './Contact.js'
import Centerpiece from './Centerpiece.js'
import {TTFLoader} from 'three/examples/jsm/loaders/TTFLoader'; 
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader'; 
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { PointLight } from 'three';
import NavbarLanding from './NavbarLanding.jsx';
import FooterLanding from './FooterLanding.jsx';
//import { Text3D, Box } from '@react-three/drei';

function Home() {
  const refContainer = useRef(null);
  //declare two variables: windowSize, which represents the current state value, and setWindowSize, which is a function that can be used to update the state.
  //useEffect takes in two args - a function and an array of dependencies that can affect when the function is called
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  //var scene = new THREE.Scene();

  useEffect(() => {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    refContainer.current && refContainer.current.appendChild( renderer.domElement );

    //clear old canvas upon rerendering
    refContainer.current.innerHTML = ''; // Remove existing canvas
    refContainer.current.appendChild(renderer.domElement);

    // Change background color to red
    //scene.background = new THREE.Color(0xff0000);

    //canvas element needed to change scene background b/c Web GL doesn't support gradient backgrounds, it expects either a texture or a color 
    // Create a gradient background
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    //setting new canvas properties for the new size (component rerendered upon size change)
    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight; 
    const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#ffffff'); // White
    gradient.addColorStop(1, 'hsl(210, 60%, 40%)'); // Light blue

    context.fillStyle = gradient;
    context.fillRect(0, 0, canvas.width, canvas.height);

    //make a backgroundTexture of the canvas
    const backgroundTexture = new THREE.CanvasTexture(canvas);
    //set the scene background to the texture we created 
    scene.background = backgroundTexture;
   
    // Add OrbitControls to the scene
    const controls = new OrbitControls(camera, renderer.domElement);
    //moves camera from middle along Z axis

    /*
    camera.position.setZ(100); 
    camera.position.setX(-50); 
    */
    camera.position.setZ(175); 
    camera.position.setY(100);
    camera.position.setX(0); 
    

    //camera.position.setX(125); 
    camera.lookAt(0, 0, 0);


    //lighting
    const light = new THREE.AmbientLight(0xffffff, 1);
  
    const pointLight1 = new THREE.PointLight(0xffffff, 50000, 1000); 
    pointLight1.position.set(0, 100, 175); 
    pointLight1.lookAt(0, 0, 0); 
    const pointLight2 = new THREE.PointLight(0xffffff, 25000, 1000); 
    pointLight2.position.set(0, 0, -200);  
    
    scene.add(light);
    scene.add(pointLight1);
    //scene.add(pointLight2);
    //camera.add(pointLight2)
    setScene(scene);
    setCamera(camera);

    const fontLoader = new FontLoader(); 

    //the font loaded by fontLoader.load() is passed as an argument to the callback function within fontLoader.load()
    //the callback function instructs the method what to do once the font has been loaded
    //declared a variable outside the callback function and set font = to that so I'm able to access it outside the callback function in the rest of my code
    //want to do this so I can attach my camera to the Title Font to achieve the text always facing the camera 
    
    fontLoader.load("/font.json", function(font) {
      font = font; 

      const textGeometry = new TextGeometry("KAVITHA VINOD", {
        height: 2.5, 
          size: 12.5, 
          font: font,
      }); 
      //console.log(font); 
      //obtain texture
      const texture =  new THREE.TextureLoader().load("/titletexture.jpg");
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture}); 

      const textMesh = new THREE.Mesh(textGeometry, textMaterial); 
  
      textMesh.position.y = 60; 

      // Center the text via x axis
      textGeometry.computeBoundingBox();
      const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
      const xOffset = -textWidth / 2; // Calculate the offset for centering horizontally

      // Set position
      textMesh.position.x = xOffset;
      scene.add(textMesh); 
      //textMesh.add(camera); 

      // Create a pivot point
      const pivot = new THREE.Object3D();
      pivot.add(textMesh);
      scene.add(pivot);

      pivot.position.set(0, 0, 0);
      //console.log(textMesh.position); 

      var animate = function () {
        pivot.lookAt(camera.position); 
        requestAnimationFrame(animate); 
        //pivot.rotation.y += 0.005; 
        //pivot.add(camera); 
        //pivot.add(pointLight1); 
      };
      animate(); 
     }); 
    
    var animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      camera.lookAt(0, 0, 0); 
      rotate(); 
    };
    animate();

    //rotate camera + light
    var theta = 90; 
    var radius = 175; 
    function rotate() {
      theta = theta + 0.3; 
      var radians = theta * (Math.PI / 180); 
      var newz = radius * Math.sin(radians); 
      var newx = radius * Math.cos(radians);

      camera.position.z = newz; 
      camera.position.x = newx; 

      pointLight1.position.z = newz; 
      pointLight1.position.x = newx; 
      
    }

    // Update renderer size and camera aspect ratio on window resize
    const handleResize = () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        canvas.width = newWidth;
        canvas.height = newHeight;
        // Update camera aspect ratio
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        // Update renderer size
        renderer.setSize(newWidth, newHeight); 
        
        // Render the scene b/c wanna rerender when window size changes
        renderer.render(scene, camera);
        controls.update(); 
    };

    //function is the event handler for the doc.body.onscroll event 
    function moveCameraForward(event) {
      if (event.key === 'ArrowUp') {
        var newz = camera.position.z - 3; 
        var newx = camera.position.x + 1; 

        camera.position.z = newz; 
        camera.position.x = newx; 
        //console.log(camera.position.x); 
        //console.log(camera.position.z);
        //camera.lookAt(scene.position);
        //renderer.render(scene, camera);
      }
    }

    //function is the event handler for the doc.body.onscroll event 
    function moveCameraBack(event) {
      if (event.key === 'ArrowDown') {

        var newz = camera.position.z + 3; 
        var newx = camera.position.x - 1; 

        camera.position.z = newz; 
        camera.position.x = newx; 
        //console.log(camera.position.x); 
        //console.log(camera.position.z);
        //camera.lookAt(scene.position);
        //renderer.render(scene, camera);
      }
    }
  
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', moveCameraForward);
    window.addEventListener('keydown', moveCameraBack);
    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('keydown', moveCameraForward); 
        window.removeEventListener('keydown', moveCameraBack); 
    };
    //<Boxstars scene={scene} />
    //<Contact scene={scene} texturefp={"/githublogo.jpg"} link={"https://github.com/kav-vinod"} xval={0} yval={-100} zval={0}/>
    //<TitleText scene={scene} text={"Kavitha Vinod"}/>
    //<TitleText scene={scene} camera={camera} text={"KAVITHA VINOD"} texturefp={"/titletexture.jpg"}/>
  }, []);
  return (
    <div className="flex flex-col min-h-screen" ref={refContainer}>

      {scene && camera && 
      (
      <>
        <NavbarLanding />
        <Contact scene={scene} texturefp={"/githublogo.jpg"} link={"https://github.com/kav-vinod"} xval={-129.904} yval={0} zval={-75}/>
        <Contact scene={scene} texturefp={"/linkedinlogo.jpg"} link={"https://www.linkedin.com/in/kavitha-m-vinod/"} xval={129.904} yval={0} zval={-75}/>
        <Contact scene={scene} texturefp={"/maillogo.jpg"} link={"https://www.linkedin.com/in/kavitha-m-vinod/"} xval={0} yval={0} zval={150}/>
        <Boxstars scene={scene} />
        <Centerpiece scene={scene} texturefp={"/centerpiecetexture.jpg"} xval={0} yval={0} zval={0} />
        <Box scene={scene} xval={-129.904} yval={0} zval={75} texturefp={"/Experience.jpg"}/>
        <Box scene={scene} xval={0} yval={0} zval={-150} texturefp={"/Projects.jpg"}/> 
        <Box scene={scene} xval={129.904} yval={0} zval={75} texturefp={"/AboutMe.jpg"}/>
        <FooterLanding/>
      </>
      )
      }
    </div>

  );
}

export default Home;

