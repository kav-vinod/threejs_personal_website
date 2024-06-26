import { useEffect } from 'react';
import * as THREE from 'three';
import {fragmentShader} from './FragmentShader.js'; 
import {vertexShader} from './VertexShader.js'; 

function Centerpiece({ scene, texturefp, xval, yval, zval }) {

    useEffect(() => {
        //obtain texture
        const test = {
            clock: new THREE.Clock()
        };

        const geometry = new THREE.SphereGeometry(40, 64, 64);

            const material2 = new THREE.ShaderMaterial({
                vertexShader,
                fragmentShader,
                uniforms: {
                    u_time: {
                        type: 'f', 
                        value: test.clock.getElapsedTime(),
                    }
                    
                }
            });

            const centerpiece  = new THREE.Mesh(geometry, material2);

        const animate = () => {
            // Update rotation
            centerpiece.rotation.x += 0.01; 
            centerpiece.rotation.y += 0.01; 

            material2.uniforms.u_time.value = (test.clock.getElapsedTime()  % 0.79); 

            requestAnimationFrame(animate); 
        };

        animate(); 
        
        centerpiece.position.set(xval, yval, zval);
        scene.add(centerpiece); 
        console.log("Sphere Added")
        // Cleanup function to remove the mesh when component unmounts
        return () => {
            scene.remove(centerpiece); 
        };
    //[scene] b/c when scene changes, this component will be rerendered
    }, [scene]);
    
        /*
        const geometry = new THREE.DodecahedronGeometry(40, 0);
        const material1 = new THREE.MeshStandardMaterial({ map:texture });
        
        const material2 = new THREE.ShaderMaterial({
            vertexShader,
            //fragmentShader,
            uniforms: {
                u_texture: { value: material1 },
                u_time: {
                    type: 'f', 
                    value: test.clock.getElapsedTime(),
                }
            }
        });
        
        //const material = [material1, material2]
        const centerpiece  = new THREE.Mesh(geometry, material1);

        const animate = () => {
            // Update rotation
            centerpiece.rotation.x += 0.01; 
            centerpiece.rotation.y += 0.01; 

            requestAnimationFrame(animate); 
        };

        animate(); 
        
        centerpiece.position.set(xval, yval, zval);
        scene.add(centerpiece); 
        console.log("Sphere Added")
        // Cleanup function to remove the mesh when component unmounts
        return () => {
            scene.remove(centerpiece); 
        };
    //[scene] b/c when scene changes, this component will be rerendered
    }, [scene]);
    */

    // Since this is a Three.js component, it doesn't need to return anything
    return null;
} 

export default Centerpiece;