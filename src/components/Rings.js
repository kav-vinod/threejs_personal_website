import { useEffect } from 'react';
import * as THREE from 'three';
import {fragmentShader} from './FragmentShader2.js'; 
import {vertexShader} from './VertexShader.js'; 

function Rings ({scene}) {
    useEffect(() => {
    const test = {
        clock: new THREE.Clock()
    };


    var radius = 27.5; 
    //var radius2 = 125; 
    var radius2 = 0; 
    var radius3 = 0; 
    const geometry = new THREE.TorusGeometry( radius, 0.6, 16, 100 ); 
    const geometry2 = new THREE.TorusGeometry( radius2, 0.6, 16, 100 );

    const wireframe = new THREE.WireframeGeometry( geometry );
    const border = new THREE.LineBasicMaterial({ color: 0xffffff});
    const line = new THREE.LineSegments( wireframe, border);
    line.material.depthTest = false;
    line.material.opacity = 0.375;
    line.material.transparent = true;

    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            u_time: {
                type: 'f', 
                value: test.clock.getElapsedTime(),
            }
            
        }, 
        lighting: true
    });

    var Ring = new THREE.Mesh( geometry, material );
    var Ring2 = null; 
    //var Ring2 = new THREE.Mesh( geometry2, material );
    var Ring3 = null;

    Ring.rotation.set(Math.PI / 2, 0, 0); 
    //Ring2.rotation.set(Math.PI / 2, 0, 0); 

    scene.add( Ring );
    //scene.add( Ring2 );

    var to_remove = Ring; 
    //var to_remove2 = Ring2; 
    var to_remove2 = null; 
    var to_remove3 = null; 
    
    //helps reset the direction
    var out = true;  
    var cycles = 0; 

    var initiated_second = false;
    var initiated_third = false;  
    //material.uniforms.u_time.value = (test.clock.getElapsedTime() % 0.7895 );

    var reset = false; 
    var reset2 = false;
    var reset3 = false;

    const animate = () => {
        scene.remove(to_remove);

        if (to_remove2 != null){
            scene.remove(to_remove2); 
        }

        if (to_remove3 != null){
            scene.remove(to_remove3);
        }

        cycles = Math.floor(test.clock.getElapsedTime() / 0.7895); 
        
        if (cycles % 2 == 0){
            material.uniforms.u_time.value = ((test.clock.getElapsedTime() % 0.7895 ));
        }
        else{
            material.uniforms.u_time.value = 0.7895 - (test.clock.getElapsedTime() % 0.7895 ); 
           
        }
        
        

        if (cycles % 3 == 0 && reset == false) {
            radius = 27.5; 
            reset = true; 
        } 
        else {
            radius += 0.65;
        }

        if (cycles % 3 != 0) reset = false; 

        if ((cycles - 1) % 3 == 0 && reset2 == false) {
            radius2 = 27.5; 
            reset2 = true; 
        } 
        else {
            if (radius2 >= 27.5){
                radius2 += 0.65; 
            }
        }

        if ((cycles - 1) % 3 != 0) reset2 = false; 

        if ((cycles - 2) % 3 == 0 && reset3 == false) {
            radius3 = 27.5; 
            reset3 = true; 
        } 
        else {
            if (radius3 >= 27.5){
                radius3 += 0.65; 
            }
        }

        if ((cycles - 2) % 3 != 0) reset3 = false; 

        /*

        if (radius >= 125 && out == true){
            out = false; 
        }
        if  (radius <= 70 && out == false){
            out = true; 
        }
        if (out == true){
            //determines speed of reduction
            radius += 0.35;
            radius2 -= 0.35;
        }
        else {
            radius -= 0.35; 
            radius2 += 0.35; 

        }
        */
        //create new rings w/ updated radius 
        const geometry = new THREE.TorusGeometry( radius, 0.6, 16, 100 ); 

        Ring = new THREE.Mesh( geometry, material );
        Ring.rotation.set(Math.PI / 2, 0, 0); 

        //reset to_remove so the rings are removed in the next run of the animate function
        to_remove = Ring;

        //add Ring
        scene.add( Ring );
        
        if (test.clock.getElapsedTime() > 0.7895){
            if (initiated_second == false) radius2 = 27.5; 
            const geometry2 = new THREE.TorusGeometry( radius2, 0.6, 16, 100 ); 
            Ring2 = new THREE.Mesh( geometry2, material );
            Ring2.rotation.set(Math.PI / 2, 0, 0); 
            to_remove2 = Ring2; 
            scene.add( Ring2 );
            initiated_second = true; 
        }

        if (test.clock.getElapsedTime() > 1.579){
            if (initiated_third == false) radius3 = 27.5; 
            const geometry3 = new THREE.TorusGeometry( radius3, 0.6, 16, 100 ); 
            Ring3 = new THREE.Mesh( geometry3, material );
            Ring3.rotation.set(Math.PI / 2, 0, 0); 
            to_remove3 = Ring3; 
            scene.add( Ring3 );
            initiated_third = true; 
        }

        requestAnimationFrame(animate); 
    };

    animate();

    }, []); 
    
}

export default Rings; 