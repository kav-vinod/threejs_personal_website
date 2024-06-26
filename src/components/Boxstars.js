import { useEffect } from 'react';
import * as THREE from 'three';

function Boxstars({ scene}) {
    const stars = []; 
    function addStar() {

          //create a star
          const geometry = new THREE.OctahedronGeometry(1, 0);
           
          var material = new THREE.MeshNormalMaterial({
            flatShading: true
          });

          /*
          const texture =  new THREE.TextureLoader().load("/titletexture.jpg");
          var material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            map: texture
          });
          */
          const star = new THREE.Mesh(geometry, material);
          //give the star a random position
          const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(1000)); 
          star.position.set(x, y, z);

          scene.add(star); 
          stars.push(star); 
    }
    useEffect(() => {
        Array(2500).fill().forEach(addStar)

        stars.forEach(star => {
            const animate = () => {
                // Update rotation
                star.rotation.x += 0.01; 
                star.rotation.y += 0.01; 
                requestAnimationFrame(animate); 
            };
            animate(); 
        });

        // Cleanup function to remove the mesh when component unmounts
        return () => {
            // Remove the stars from the scene
            stars.forEach(star => {
                scene.remove(star);
            });
        };
    //[scene] b/c when scene changes, this component will be rerendered
    }, [scene]);

    // Since this is a Three.js component, it doesn't need to return anything
    return null;
} 

export default Boxstars;