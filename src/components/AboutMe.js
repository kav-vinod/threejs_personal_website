
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
import { Font, FontLoader } from 'three/examples/jsm/loaders/FontLoader'; 
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import TorusDecor from './TorusDecor.js'
import Navbar from './Navbar.jsx';
import Popup from './Popup.js'; 
import MusicPopup from './MusicPopup.js'; 
import FooterNavbar from './FooterNavbar.jsx';

function AboutMe() {
  const refContainer = useRef(null);
  const [scene, setScene] = useState(null);

  //states and hooks for popup and musicpopup variables 
  const [popup, setPopup] = useState({ show: false, title: 'Default Title', description: 'Default Description' }); 
  const [musicpopup, setMusicPopup] = useState({ show: false }); 

  useEffect(() => {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.localClippingEnabled = true; // Enabling local clipping in the renderer
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

    camera.position.setZ(-10); 
   //camera.lookAt(0, 0, 0);


    //lighting
    const light = new THREE.AmbientLight(0xffffff, 1.5);
  
    const pointLight1 = new THREE.PointLight(0xffffff, 25000, 1000); 
    pointLight1.position.set(0, 0, 200); 

    const pointLight2 = new THREE.PointLight(0xffffff, 25000, 1000); 
    pointLight2.position.set(0, 200, -200);  
    
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

    function onPointerMove( event ) {
        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components
        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }

    var lastcubetouched = null; 
    function raycasterFunction( ) {
      // update the picking ray with the camera and pointer position
      raycaster.setFromCamera( pointer, camera );
      // calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects( scene.children );
      if (intersects.length > 0){
        if ((intersects[0].object.name == "intro") || (intersects[0].object.name == "hobbies") || (intersects[0].object.name == "education") || (intersects[0].object.name == "music")){
          intersects[0].object.material.color.set( 0xD8BFD8);

          if ((lastcubetouched != intersects[0].object) && (lastcubetouched != null)){
            lastcubetouched.material.color.set( 0xffffff );
          }
          lastcubetouched = intersects[0].object; 
          
        }
      //console.log(intersects); 
      renderer.render( scene, camera );
      }
      else {
        if (lastcubetouched != null){
          lastcubetouched.material.color.set(0xffffff );  
        }       
      }
      //console.log(intersects); 
      renderer.render( scene, camera );
      //requestAnimationFrame(render);
    } 
    function handleClicks() {
        // update the picking ray with the camera and pointer position
        raycaster.setFromCamera( pointer, camera );
        // calculate objects intersecting the picking ray
        const intersects = raycaster.intersectObjects( scene.children );
        if (intersects.length > 0){
            if (intersects[0].object.name == "education") {
               const text = "I graduated from Santa Clara University in 2024. I completed a Bachelor's in Computer Science (with an emphasis in Data Science) and a minor in Chemistry, because I wanted the versatility of a CS degree and to pursue my love for science. I had a wonderful time at SCU. I got the chance to be involved in a variety of clubs on campus, such as the Association of Computing Machinery (ACM) and Theta Tau, a professional engineering frat. I also appreciated the access I had to professors and formed meaningful connections with my peers. Go Broncos!"; 
               const title = "Education";
               //popup set to arguments declared in if block (true is standard for all if blocks - we want the popup to show whenever the right object is clicked, so show will be true for all if blocks)
               //Popup component returned at bottom - shown when value in popup.show is true (look at Popup.js code and bottom of this page) 
               setPopup({ show: true, title: title, description: text });
              
            }
            else if (intersects[0].object.name == "hobbies"){
              const title = "Hobbies"; 
              const text = "In my free time, I'm down to do pretty much anything! I enjoy reading, watching new TV shows, hanging out with friends and family, baking/cooking, and trying out new places to eat to name a few. I also picked up longboarding a couple years ago (still trying to master it) and want to get better at rollerskating. I've been trying to immerse myself in more physical hobbies lately. "; 
              setPopup({ show: true, title: title, description: text });
            }
            else if (intersects[0].object.name == "music"){
              setMusicPopup({ show: true });
            }
            else if (intersects[0].object.name == "intro") {
              const title = "Hi! Nice to meet you."; 
              const list = "I'm Kavitha! Thanks for visiting :). I was born and raised in the Bay Area, California, which gave me an appreciation for good food and blue skies. Here are some of my favorite things about this world: Coffee shops (like most people), the first blue sky after weeks of rain, the way trees look in the fall, chilly winters, Halloween, Christmas, bookstores, people (and animal) watching, getting to know someone else, and enjoying the simple pleasures of life."
              setPopup({ show: true, title: title, description: list });

            }
            /*
            for ( let i = 0; i < intersects.length; i ++ ) {
                //console.log("Hello"); 
                //intersects[ i ].object.material.color.set( 0xff0000 );
            }
            */
        }
        //console.log(intersects); 
        renderer.render( scene, camera );
        //requestAnimationFrame(render);
    }

    /*
    const fontLoader = new FontLoader(); 
    fontLoader.load("/font.json", function(font) {
        font = font; 
  
        const textGeometry = new TextGeometry("ABOUT ME", {
          height: 2.5, 
            size: 12.5, 
            font: font,
        }); 
        //obtain texture
        const texture =  new THREE.TextureLoader().load("/titletexture.jpg");
        const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, map: texture}); 
  
        const textMesh = new THREE.Mesh(textGeometry, textMaterial); 
    
        textMesh.position.y = 30; 
  
        // Center the text via x axis
        textGeometry.computeBoundingBox();
        const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
        const xOffset = -textWidth / 2; // Calculate the offset for centering horizontally
  
        // Set position
        textMesh.position.x = xOffset;
        textMesh.position.z = -125; 
        scene.add(textMesh); 
        //camera.add(textMesh); 
        console.log(textMesh.position);

        var animate = function () {
            textMesh.position.z = camera.position.z - 115; 
            requestAnimationFrame(animate); 
            //pivot.rotation.y += 0.005; 
            //pivot.add(camera); 
            //pivot.add(pointLight1); 
          };
          animate();

    }); 
    */

    //spheres
    const geometry = new THREE.SphereGeometry(10, 32, 32);
    const texture =  new THREE.TextureLoader().load("/abtmesphere.jpg");
    const normaltexture =  new THREE.TextureLoader().load("/abtmecentertexture.jpg");
    const material = new THREE.MeshStandardMaterial({
      map: texture,
      normalMap: normaltexture,
     });

    const sphere = new THREE.Mesh(geometry, material);
    const sphere2 = new THREE.Mesh(geometry, material);

    sphere.position.set(0, 0, -115); 
    sphere2.position.set(0, 0, -315); 

    scene.add(sphere); 
    scene.add(sphere2); 

    const clippingPlane = new THREE.Plane(new THREE.Vector3(1, 1, 0), 35); // Defining the clipping plane
    scene.add(clippingPlane); 
    var animate = function () {
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;

      sphere2.rotation.x += 0.01;
      //sphere2.rotation.y += 0.01;
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
    var radius = 100; 
    //function is the event handler for the doc.body.onscroll event 
    //camera.rotation.y = 360; 
    camera.rotation.y = 0; 
    var reference_z = 0; 
    var new_theta = 90; 
    var counter = 0; 
    var switch_track = false; 
    var og_pos = camera.position.z; 

    function count(theta){
        counter = Math.floor((theta - 90) / 180);
        return counter; 
    }


  function moveCamera(direction) {
      if (direction == "up") {
        //console.log(theta); 
        //console.log((((theta - 90) / 180) % 2)); 
        //(theta-90) % 180 != 0
        if (Math.floor(((theta - 90) / 180)) % 2 == 0){
            if (switch_track == false){
                counter = count(theta);
                switch_track = true; 
            }
            reference_z = (og_pos - radius) - counter * 2 * radius; 
            var radians = theta * (Math.PI / 180); 
            var newz = radius * Math.sin(radians); 
            var newx = radius * Math.cos(radians);

            camera.position.z = newz + reference_z; 
            camera.position.x = newx;
            new_theta = 90; 

            theta = theta + 1; 
            //console.log(newz); 
            //console.log(camera.position.z); 
            //console.log(reference_z); 
        }
        else {  
            if (switch_track == true){
                counter = count(theta); 
                switch_track = false; 
            }
            reference_z = (og_pos - radius) - counter * 2 * radius; 
            var radians = new_theta * (Math.PI / 180); 
            var newz = radius * Math.sin(radians) + reference_z; 
            var newx = radius * -Math.cos(radians);

            camera.position.z = newz; 
            camera.position.x = newx; 
            //console.log(reference_z); 

            new_theta = new_theta + 1; 
            theta = theta + 1; 
        }
       
      }
      if (direction == "down" && camera.position.z < 0) {
        //console.log(theta); 
        //console.log(Math.floor((((theta - 90) / 180) % 2))); 
        if (Math.floor(((theta - 90) / 180)) % 2 == 0){
            if (switch_track == false){
                counter = count(theta); 
                switch_track = true; 
            }
            reference_z = (og_pos - radius) - counter * 2 * radius; 
            //console.log(counter); 
            var radians = theta * (Math.PI / 180); 
            var newz = radius * Math.sin(radians); 
            var newx = radius * Math.cos(radians);

            camera.position.z = newz + reference_z; 
            camera.position.x = newx;
            new_theta = 270; 

            theta = theta - 1; 
            //console.log("if");
            //console.log(newz);  
            //console.log(reference_z); 
        }
        else {  
            if (switch_track == true){
                counter = count(theta);  
                switch_track = false; 
            }
            reference_z = (og_pos - radius) - counter * 2 * radius; 
            var radians = new_theta * (Math.PI / 180); 
            var newz = radius * Math.sin(radians); 
            var newx = radius * -Math.cos(radians);

            
            camera.position.z = reference_z + newz; 
            camera.position.x = newx; 
            
            //console.log("else"); 
            //console.log(new_theta); 
            //console.log(counter); 
            //console.log(newz); 
            //console.log(reference_z); 

            new_theta = new_theta - 1; 
            theta = theta - 1; 
        }
      }
    }

    function moveCameraKey(event) {
      if (event.key === 'ArrowUp') {
        moveCamera("up");
      }
      else if (event.key === 'ArrowDown') {
        moveCamera("down");
      }
    }
    var lastTouchX = null; 
    const moveCameraTouch = (event) => {
      // Get current touch y position
      const touchX = event.touches[0].clientX;
      
      if (lastTouchX == null) {
        lastTouchX = touchX;
      }
      const deltaX = touchX - lastTouchX; // Calculate the change in Y

      if (deltaX > 0) {
        moveCamera('up');
      }
      else if (deltaX < 0) {
        moveCamera('down');
      }
      // Update last touch position for the next move
      lastTouchX = touchX;
    }

    //eventListeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', moveCameraKey);
    window.addEventListener('touchmove', moveCameraTouch);
    window.addEventListener( 'pointermove', onPointerMove );
    window.addEventListener( 'pointermove', raycasterFunction );
    window.addEventListener( 'click', handleClicks );
    //window.requestAnimationFrame(render);
    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('keydown', moveCameraKey);
        window.removeEventListener('touchmove', moveCameraTouch);
        window.removeEventListener( 'pointermove', onPointerMove );
        window.removeEventListener( 'pointermove', raycasterFunction );
        window.removeEventListener( 'click', handleClicks ); 
    };
  }, []);

  //closePopup and closeMusicPopups are passed to Popup.js and MusicPopup.js so the component knows what to do when the close button is clicked
  const closePopup = () => {
    setPopup({ show: false, title: '', description: '' });
  };

  const closeMusicPopup = () => {
    setMusicPopup({ show: false});
  };

  return (
    <div ref={refContainer}>
      {scene &&
      (
      <>
        <Navbar />
        <TorusDecor scene={scene} texturefp={"/torusgradient.jpg"} xval={-80} yval={0} zval={-165} clipval={-172.5} />
        <TorusDecor scene={scene} texturefp={"/torusgradient.jpg"} xval={80} yval={0} zval={-255} clipval={-262.5} />
        <TorusDecor scene={scene} texturefp={"/torusgradient.jpg"} xval={0} yval={0} zval={-110} clipval={-110} />
        <TorusDecor scene={scene} texturefp={"/torusgradient.jpg"} xval={0} yval={0} zval={-310} clipval={-310}/>
        <Boxstars scene={scene} />
        <Box scene={scene} xval={0} yval={0} zval={-235} texturefp={"/education.jpg"} name={"education"}/>
        <Box scene={scene} xval={75} yval={0} zval={-310} texturefp={"/hobbies.jpg"} name={"hobbies"}/> 
        <Box scene={scene} xval={0} yval={0} zval={-435} texturefp={"/music.jpg"} name={"music"}/> 
        <Box scene={scene} xval={-75} yval={0} zval={-110} texturefp={"/intro.jpg"} name={"intro"}/> 
        <FooterNavbar Navpage={false} />
      </>
      )
      }
      <Popup show={popup.show} title={popup.title} description={popup.description} closePopup={closePopup} />
      <MusicPopup show={musicpopup.show} closePopup={closeMusicPopup} />
    </div>

  );
}

export default AboutMe;

