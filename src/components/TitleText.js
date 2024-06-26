import { useEffect } from "react"; 
import * as THREE from 'three';

import {TTFLoader} from 'three/examples/jsm/loaders/TTFLoader'; 
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'; 
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
//import SceneInit from './lib/SceneInit'; 

function TitleText({scene, camera, text, texturefp,  xval, yval, zval,}) {
    //loads fonts
    var textMesh; 

    useEffect(() => {
        const fontLoader = new FontLoader(); 
        const font = fontLoader.load("/font.json", function(font) {
        console.log(font); 
        
        const textGeometry = new TextGeometry(text, {
            height: 3, 
            size: 10, 
            font: font,
        }); 

        //obtain texture
        const texture =  new THREE.TextureLoader().load(texturefp);

        const material = new THREE.SpriteMaterial( { color: 0xffffff, map: texture } );
        const textMaterial = new THREE.MeshBasicMaterial({ map: texture });

        //Make a pivot
        const pivot = new THREE.Object3D();

        textMesh = new THREE.Mesh(textGeometry, textMaterial); 
        pivot.add(textMesh); 
        scene.add(pivot); 
        pivot.position.set(xval, yval, zval); 
        textMesh.position.y = 60; 

        // Center the text via x axis
        textGeometry.computeBoundingBox();
        const textWidth = textGeometry.boundingBox.max.x - textGeometry.boundingBox.min.x;
        const xOffset = -textWidth / 2; // Calculate the offset for centering horizontally

        // Set position
        textMesh.position.x = xOffset;


        scene.add(textMesh); 

        const animate = () => {
           pivot.rotation.y += 0.01; 
           requestAnimationFrame(animate); 

        };

        animate(); 
        
        }
        ); 
        
        return () => {
            scene.remove(textMesh);
        };
        
    }, [scene]); 
    

    return null; 
}

export default TitleText; 