import React, { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import FooterLanding from './FooterLanding.jsx';
import Navbar from './Navbar.jsx';
import EmailEvent from "./EmailForm.js";
import Popup from "./Popup.js";

function Email() {
    const refContainer = useRef(null);
    const [scene, setScene] = useState(null);
    const [camera, setCamera] = useState(null);

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

    const controls = new OrbitControls(camera, renderer.domElement);

    const light = new THREE.AmbientLight(0xffffff, 1);
    const pointLight1 = new THREE.PointLight(0xffffff, 50000, 1000);
    pointLight1.position.set(55, 50, 0);

    const pointLight2 = new THREE.PointLight(0xffffff, 50000, 1000);
    pointLight2.position.set(0, -50, -50);
    scene.add(light);
    scene.add(pointLight1);
    scene.add(pointLight2);

    //different geometries 
    const geometry1 = new THREE.DodecahedronGeometry(30, 0, 1);
    const geometry2 = new THREE.IcosahedronGeometry(30, 0);
    const geometry3 = new THREE.OctahedronGeometry(30, 0);
    //const geometry4 = new THREE.TetrahedronGeometry(40, 0);
    //const geometry5 = new THREE.SphereGeometry( 30, 32, 16 ); 

    //diff textures
    const texture1 =  new THREE.TextureLoader().load("/alttexture6.jpg");
    const texture2 = new THREE.TextureLoader().load("/alttexture2.jpg");
    const texture3 = new THREE.TextureLoader().load("/alttexture3.jpg");
    const texture4 = new THREE.TextureLoader().load("/alttexture4.jpg");
    const texture5 = new THREE.TextureLoader().load("/alttexture5.jpg");

    //different materials
    const material1 = new THREE.MeshStandardMaterial({ metalness: 1, color: 0x000080, roughness: 0.4 });
    const material2 = new THREE.MeshStandardMaterial({ map: texture1, metalness: 0.5, roughness: 0.5 });
    const material3 = new THREE.MeshStandardMaterial({ map: texture2, metalness: 0.5, roughness: 0 });
    const material4 = new THREE.MeshStandardMaterial({ map: texture3, metalness: 0.5, roughness: 0});
    const material5 = new THREE.MeshStandardMaterial({ map: texture4, metalness: 0.5, roughness: 0 });
    const material6 = new THREE.MeshStandardMaterial({ map: texture5, metalness: 0.8, roughness: 0.3 });

    const materials_array = [material1, material2, material3, material4, material5, material6]; 
    const geometry_array = [geometry1, geometry2, geometry3]; 

    var num_select_material = Math.floor(Math.random() * 6);
    var num_select_geometry = Math.floor(Math.random() * 3);

    var geometry_select = geometry_array[num_select_geometry]; 
    var material_select = materials_array[num_select_material]; 

    var shape = new THREE.Mesh(geometry_select, material_select);

    shape.position.x = 60;
    shape.position.z = -100;
    scene.add(shape);

    setScene(scene);
    setCamera(camera);

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate);
        shape.rotation.y += 0.01; 
        controls.update();
        renderer.render(scene, camera);
    };
    
    animate();

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();    

    function onPointerMove( event ) {
        // calculate pointer position in normalized device coordinates
        // (-1 to +1) for both components
        pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }

    var just_touched = false; 
    function raycasterFunction( ) {
      // update the picking ray with the camera and pointer position
      raycaster.setFromCamera( pointer, camera );
      // calculate objects intersecting the picking ray
      const intersects = raycaster.intersectObjects( scene.children );
      if (intersects.length > 0 && just_touched == false){
        just_touched = true; 
        num_select_material = Math.floor(Math.random() * 6);
        num_select_geometry = Math.floor(Math.random() * 3);

        geometry_select = geometry_array[num_select_geometry]; 
        material_select = materials_array[num_select_material]; 

        scene.remove(shape); 
        shape = new THREE.Mesh(geometry_select, material_select);
        scene.add(shape); 
        shape.position.x = 60;
        shape.position.z = -100;
        //intersects[0].object.geometry.set(geometry_select);
        console.log(intersects[0].object);
        //intersects[0].object.geometry.parameters.set(40, 0);  
        //intersects[0].object.material.set(material_select);  
        renderer.render( scene, camera );
      }
      else if (intersects.length == 0 && just_touched == true) {
         renderer.render( scene, camera );
         just_touched = false; 
      }
      renderer.render( scene, camera );
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
    window.addEventListener('resize', handleResize);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointermove', raycasterFunction);

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('pointermove', onPointerMove);
        window.removeEventListener('pointermove', raycasterFunction);
    }
    }, []);

    return (
        <div className="flex flex-col min-h-screen" ref={refContainer}>
            {scene && (
                <>
                    <Navbar />
                    <EmailEvent isMobile={false}/>
                    <FooterLanding />
                </>
            )}
        </div>
    );
}

export default Email;