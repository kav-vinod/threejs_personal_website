import { useEffect } from 'react';
import * as THREE from 'three';

function Contact({ scene, texturefp, link, xval, yval, zval, name}) {

    const taketoLink = () => {
        // Specify the link you want to navigate to and open the link in a new window
        window.open(link, "_blank");
    }

    //document.body.addEventListener('click', taketoLink); 

    useEffect(() => {
        const object_name = name; 
        //obtain texture
        const texture =  new THREE.TextureLoader().load(texturefp);
        const geometry = new THREE.CylinderGeometry(5, 5, 3, 32);
        const materialfaces = new THREE.MeshStandardMaterial({ map:texture });
        const materialside = new THREE.MeshStandardMaterial({ color: 0x000000, transparent: true });
        const material = [materialside, materialfaces, materialfaces]
        const contact = new THREE.Mesh(geometry, material);
        contact.name = name; 
        //document.body.addEventListener('click', taketoLink); 

        //torus code 
        const texturetor =  new THREE.TextureLoader().load("/torusgradient.jpg");
        const geometrytor = new THREE.TorusGeometry(10, 3, 16, 100 ); 
        const materialtor = new THREE.MeshStandardMaterial( { map: texturetor} ); 
        const torus = new THREE.Mesh( geometrytor, materialtor ); 
        scene.add( torus );
        
        torus.position.set(xval, yval, zval);
        contact.position.set(xval, yval, zval);

        scene.add(torus); 
        scene.add(contact); 

        contact.rotation.x = 90;
        contact.rotation.y = 90;

        const animate = () => {
            //torus.rotation.x += 0.01; 
            torus.rotation.y += 0.01;
            contact.rotation.z -= 0.01 ;
            //torus.rotation.z += 0.01;
            requestAnimationFrame(animate); 
        }; 

        animate(); 
        
        // Cleanup function to remove the mesh when component unmounts
        return () => {
            scene.remove(contact); 
            scene.remove(torus); 
        };
    //[scene] b/c when scene changes, this component will be rerendered
    }, [scene]);

    // Since this is a Three.js component, it doesn't need to return anything
    return (null);
} 

export default Contact;