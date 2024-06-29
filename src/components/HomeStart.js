
import * as THREE from 'three';

import { useEffect, useRef, useState } from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import Box from './Box.js'
import TitleText from './TitleText.js'
import Boxstars from './Boxstars.js'
import Contact from './Contact.js'
import Centerpiece from './Centerpiece.js'
//import { Text3D, Box } from '@react-three/drei';
import {useLocation} from 'react-router-dom'
import Navbar from './Navbar.jsx';
import FooterNavbar from './FooterNavbar.jsx';
import { useNavigate } from 'react-router-dom';

function HomeStart() {
  const refContainer = useRef(null);
  //declare two variables: windowSize, which represents the current state value, and setWindowSize, which is a function that can be used to update the state.
  //useEffect takes in two args - a function and an array of dependencies that can affect when the function is called
  
  const navigate = useNavigate();
  const sceneRef = useRef();
  
  const [scene, setScene] = useState(null);

  const location = useLocation(); 
  const camPosX = location.state.camPosX; 
  const camPosY = location.state.camPosY; 
  const camPosZ = location.state.camPosZ; 
  
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
    //const controls = new OrbitControls(camera, renderer.domElement);
    //moves camera from middle along Z axis

    //camera.position.setZ(180); 
    camera.position.set(camPosX, camPosY, camPosZ); 
   camera.lookAt(0, 0, 0);


    //lighting
    const light = new THREE.AmbientLight(0xffffff, 1.5);
  
    const pointLight1 = new THREE.PointLight(0xffffff, 25000, 1000); 
    pointLight1.position.set(0, 0, 200); 

    const pointLight2 = new THREE.PointLight(0xffffff, 25000, 1000); 
    pointLight2.position.set(0, 0, -200);  
    
    const pointLight3 = new THREE.PointLight(0xffffff, 50000, 1000); 
    pointLight3.position.set(0, 200, 0); 

    scene.add(light);
    scene.add(pointLight1);
    scene.add(pointLight2);
    scene.add(pointLight3);
    setScene(scene);

    //raycasting
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    //onPointerMove calculates the pointer position in normal x and y coordinates
    function onPointerMove( event ) {
        // (-1 to +1) for both components
        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }
    //console.log(scene.children); 

    //render called when pointer moves per event listener at bottom
    var lastcubetouched = null;
    var lastcointouched = null;
    function render() {
        // update the picking ray with the camera and pointer position
        raycaster.setFromCamera( pointer, camera );
        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects( scene.children );
        if (intersects.length > 0){
          if ((intersects[0].object.name == "github") || (intersects[0].object.name == "linkedin") || (intersects[0].object.name == "mail")){
            if (lastcubetouched != null){
              lastcubetouched.material.color.set(0xffffff ); 
            }
            intersects[0].object.material[1].color.set( 0xD8BFD8);
            intersects[0].object.material[2].color.set( 0xD8BFD8 );

            if ((lastcointouched != intersects[0].object) && (lastcointouched != null)){
              lastcointouched.material[1].color.set( 0xffffff );
              lastcointouched.material[2].color.set( 0xffffff );
            }
            lastcointouched = intersects[0].object; 
          }
          else if ((intersects[0].object.name == "projects") || (intersects[0].object.name == "experience") || (intersects[0].object.name == "aboutme") ){
            if (lastcointouched != null){
              lastcointouched.material[1].color.set(0xffffff );
              lastcointouched.material[2].color.set(0xffffff );
            }
            intersects[0].object.material.color.set( 0xD8BFD8);

            if ((lastcubetouched != intersects[0].object) && (lastcubetouched != null)){
              lastcubetouched.material.color.set( 0xffffff );
            }
            lastcubetouched = intersects[0].object; 
            /*
            setTimeout(() => {
              intersects[0].object.material.color.set( 0xffffff );
            }, 1000);
            */
          }
        //console.log(intersects); 
        renderer.render( scene, camera );
        }
        else {
          if (lastcubetouched != null){
            lastcubetouched.material.color.set(0xffffff );  
          }
          if (lastcointouched != null){
            lastcointouched.material[1].color.set(0xffffff );  
            lastcointouched.material[2].color.set(0xffffff ); 
          }           
        }
        //console.log(intersects); 
        renderer.render( scene, camera );
        //requestAnimationFrame(render);
    }
    //handle clicks is called when a click happens, per the event listener set up at bottom of page
    function handleClicks() {
      // update the picking ray with the camera and pointer position (pointer is defined outside any functions in useEffect and is available to be passed in as an arg)
      raycaster.setFromCamera( pointer, camera);
      // calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects( scene.children );
      if (intersects.length > 0){
        if (intersects[0].object.name == "github"){
          window.open("https://github.com/kav-vinod");
        }
        else if (intersects[0].object.name == "linkedin"){
          window.open("https://www.linkedin.com/in/kavitha-m-vinod/");
        }
        else if (intersects[0].object.name == "projects"){
          navigate('/projects');
        }
        else if (intersects[0].object.name == "experience"){
          navigate('/experience');
        }
        else if (intersects[0].object.name == "aboutme"){
          navigate('/aboutme');
        }
        else if (intersects[0].object.name == "mail"){
          navigate('/email');
        }
        
      //console.log(intersects); 
      renderer.render( scene, camera );
      //requestAnimationFrame(render);
    }
  }

    var animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
    
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
        //controls.update(); 
    };
    //for move camera functions - starting theta 
    var theta = 90; 
    var radius = 180; 
    //function is the event handler for the doc.body.onscroll event 
    //camera.rotation.y = 360; 
    camera.rotation.y = 0; 
    function moveCamera(event) {
      if (event.key === 'ArrowLeft') {
        theta = theta + 1; 
        var radians = theta * (Math.PI / 180); 
        var newz = radius * Math.sin(radians); 
        var newx = radius * Math.cos(radians);

        camera.position.z = newz; 
        camera.position.x = newx; 

        camera.lookAt(0, 0, 0); 

        

        //console.log(camera.rotation.y); 
      }
      if (event.key === 'ArrowRight') {
        theta = theta - 1; 
        var radians = theta * (Math.PI / 180); 
        var newz = radius * Math.sin(radians); 
        var newx = radius * Math.cos(radians); 

        camera.position.z = newz; 
        camera.position.x = newx; 


        camera.lookAt(0, 0, 0); 
      }
    }

    //eventListeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', moveCamera);
    window.addEventListener( 'pointermove', onPointerMove );
    window.addEventListener( 'pointermove', render );
    window.addEventListener( 'click', handleClicks );

    //window.requestAnimationFrame(render);
    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('keydown', moveCamera); 
    };
    //<Boxstars scene={scene} />
    //<Contact scene={scene} texturefp={"/githublogo.jpg"} link={"https://github.com/kav-vinod"} xval={0} yval={-100} zval={0}/>
    //<TitleText scene={scene} text={"Kavitha Vinod"}/>
  }, []);
  return (
    <div ref={refContainer}>
      {scene &&
      (
      <>
        <Navbar />
        <Contact scene={scene} texturefp={"/githublogo.jpg"} link={"https://github.com/kav-vinod"} xval={-75} yval={0} zval={-129.904} name="github"/>
        <Contact scene={scene} texturefp={"/linkedinlogo.jpg"} link={"https://www.linkedin.com/in/kavitha-m-vinod/"} xval={-75} yval={0} zval={129.904} name="linkedin"/>
        <Contact scene={scene} texturefp={"/maillogo.jpg"} link={"https://www.linkedin.com/in/kavitha-m-vinod/"} xval={150} yval={0} zval={0} name="mail"/>
        <Boxstars scene={scene} />
        <Centerpiece scene={scene} texturefp={"/centerpiecetexture.jpg"} xval={0} yval={0} zval={0}/>
        <TitleText scene={scene} text={"KAVITHA VINOD"} texturefp={"/titletexture.jpg"} xval={0} yval={0} zval={0} />
        <Box scene={scene} xval={75} yval={0} zval={-129.904} texturefp={"/Experience.jpg"} name="experience"/>
        <Box scene={scene} xval={-150} yval={0} zval={0} texturefp={"/Projects.jpg"} name="projects" /> 
        <Box scene={scene} xval={75} yval={0} zval={129.904} texturefp={"/AboutMe.jpg"} name="aboutme" />
        <FooterNavbar Navpage={true}/>
      </>
      )
      }
    </div>

  );
}

export default HomeStart;

