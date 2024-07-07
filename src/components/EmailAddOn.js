import React, { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import FooterLanding from './FooterLanding.jsx';
import Navbar from './Navbar.jsx';
import EmailEvent from "./EmailTest.js";

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
    pointLight1.position.set(50, 50, 0);
    scene.add(light);
    scene.add(pointLight1);

    const geometry = new THREE.DodecahedronGeometry(30, 0, 1);
    const material = new THREE.MeshStandardMaterial({ metalness: 1, color: 0x000080 });
    const shape = new THREE.Mesh(geometry, material);
    shape.position.x = 50;
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

    return () => {
        window.removeEventListener('resize', handleResize);
    }
    }, []);

    return (
        <div className="flex flex-col min-h-screen" ref={refContainer}>
            {scene && camera && (
                <>
                    <Navbar />
                    <EmailEvent />
                    <FooterLanding />
                </>
            )}
        </div>
    );
}

export default Email;