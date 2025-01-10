import { useEffect } from 'react';
import * as THREE from 'three';
import { NavLink } from 'react-router-dom'

function Box({ scene, xval, yval, zval, texturefp, name }) {
    useEffect(() => {
        //console.log('Received position values:', xval, yval, zval);
        //Create a white box w/ black borders
        // Create a box geometry
        const geometry = new THREE.BoxGeometry(20, 20, 20);
        // Create a material

        //obtain texture
        const texture =  new THREE.TextureLoader().load(texturefp);
        const filling = new THREE.MeshStandardMaterial({ color: 0xffffff, map: texture});
        
        //for edges
        const border = new THREE.LineBasicMaterial({ color: 0x001f3f});
        // Create a mesh with the geometry and material
        const boxMesh = new THREE.Mesh(geometry, filling);
        // Set position of the box
        boxMesh.position.set(xval, yval, zval);
        boxMesh.name = name; 
        scene.add(boxMesh); 
        //scene.add(boxMeshBlack); 
        // Create a wireframe for the edges of the box
        const wireframe = new THREE.WireframeGeometry(geometry);
        const edges = new THREE.LineSegments(wireframe, border);
        edges.position.set(xval, yval, zval);
        scene.add(edges);
        const animate = () => {
            // Update rotation
            boxMesh.rotation.x += 0.01; 
            boxMesh.rotation.y += 0.01; 

            edges.rotation.x += -0.05; 
            edges.rotation.y += -0.05; 
            //screen_rotate(); 
            // Request the next frame
            if ((xval !== 0) || (zval !== 0)){
                //screen_rotate(); 
            }
            requestAnimationFrame(animate); 
        };
        var curr_x = xval;
        var curr_z = zval;
        
        // Start animation loop
        animate();

        // Cleanup function to remove the mesh when component unmounts
        return () => {
            scene.remove(boxMesh);
            scene.remove(edges);
        };
    //[scene] b/c when scene changes, this component will be rerendered
    }, [scene]);

    // Since this is a Three.js component, it doesn't need to return anything
    //return null;
    return null; 
} 

export default Box;