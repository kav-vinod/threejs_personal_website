import { useEffect } from 'react';
import * as THREE from 'three';
import { NavLink } from 'react-router-dom'

function TorusDecor({ scene, xval, yval, zval, texturefp, clipval }) {
    useEffect(() => {
         // Clipping Plane
         const clippingPlane = new THREE.Plane(new THREE.Vector3(0, 0, -1), clipval); // Defining the clipping plane
         const texture =  new THREE.TextureLoader().load(texturefp);
         const normaltexture =  new THREE.TextureLoader().load("/abtmecentertexture.jpg");
         // Material with Clipping
         const material = new THREE.MeshStandardMaterial({
            //FrontSide - see "front" view that faces camera, BackSide - see "back" view that faces away from camera, double side: see both 
             side: THREE.DoubleSide,
             clippingPlanes: [clippingPlane], // Applying the clipping plane to the material
             map: texture,
             normalMap: normaltexture
         });
         const planeHelper = new THREE.PlaneHelper(clippingPlane, 100000000, 0xffff00);
         //scene.add(planeHelper);
         // Torus Geometry
         const geometry = new THREE.TorusKnotGeometry(15, 3.5, 100, 16 );
         const clippedtorus = new THREE.Mesh(geometry, material);
         clippedtorus.position.set(xval, yval, zval); 
         scene.add(clippedtorus);
         const animate = () => {
            // Update rotation
            clippedtorus.rotation.y += 0.01; 

            requestAnimationFrame(animate); 
        };
       
        // Start animation loop
        animate();

        // Cleanup function to remove the mesh when component unmounts
        return () => {
            scene.remove(clippedtorus);
        };
    //[scene] b/c when scene changes, this component will be rerendered
    }, [scene]);

    // Since this is a Three.js component, it doesn't need to return anything
    //return null;
    return null; 
} 

export default TorusDecor;