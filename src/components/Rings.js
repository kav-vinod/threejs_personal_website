import { useEffect } from 'react';
import * as THREE from 'three';
import {fragmentShader2} from './FragmentShader2.js'; 
import {fragmentShader} from './FragmentShader.js'; 
//import {fragmentShader3} from './FragmentShader3.js';
import {vertexShader} from './VertexShader.js'; 

const fragmentShader3 = `
uniform float u_time;
varying vec2 vUv;
varying vec3 pos;
varying vec3 norm;

void main() {
    vec3 purple = vec3(0.3, 0.3, 0.3);
    
    vec3 darkGrey = vec3(0.1, 0.1, 0.1);

    vec3 offWhite = vec3(0.6, 0.6, 0.6);

    vec3 colortop = mix(purple, darkGrey, norm.x); 

    vec3 colorbottom = mix(offWhite, purple, norm.x); 

    vec3 color = mix(colortop, colorbottom, norm.y); 

    gl_FragColor = vec4(color, 1.0);
}
`;


function Rings ({scene}) {
    useEffect(() => {
    const test = {
        clock: new THREE.Clock()
    };


    var radius = 70; 
    var radius2 = 110; 
    var radius3 = 30; 
    const geometry = new THREE.TorusGeometry( radius, 1, 16, 100 ); 
    const geometry2 = new THREE.TorusGeometry( radius2, 1, 16, 100 );
    const geometry3 = new THREE.TorusGeometry( radius3, 1, 16, 100 );

    const wireframe = new THREE.WireframeGeometry( geometry );
    const border = new THREE.LineBasicMaterial({ color: 0xffffff});
    const line = new THREE.LineSegments( wireframe, border);
    line.material.depthTest = false;
    line.material.opacity = 0.375;
    line.material.transparent = true;

    const material = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader2,
        uniforms: {
            u_time: {
                type: 'f', 
                value: test.clock.getElapsedTime(),
            }
            
        }, 
        lighting: true
    });

    const material2 = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader3,
        uniforms: {
            u_time: {
                type: 'f', 
                value: test.clock.getElapsedTime(),
            }
            
        }, 
        lighting: true
    });

    const material3 = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        uniforms: {
            u_time: {
                type: 'f', 
                value: test.clock.getElapsedTime(),
            }
            
        }, 
        lighting: true
    });

    var Ring = new THREE.Mesh( geometry, material );
    var Ring2 = new THREE.Mesh( geometry2, material2 );
    var Ring3 = new THREE.Mesh( geometry3, material3 );

    Ring.rotation.set(Math.PI / 2, 0, 0); 
    Ring2.rotation.set(Math.PI / 2, 0, 0); 
    Ring3.rotation.set(Math.PI / 2, 0, 0); 

    scene.add( Ring );
    scene.add( Ring2 );
    scene.add( Ring3 );

    var to_remove = Ring; 
    var to_remove2 = Ring2; 
    var to_remove3 = Ring3; 
    
    //helps reset the direction
    var out = true;  
    var cycles = 0; 
    var prev_cycle = 0; 

    var flash = false; 

    //material.uniforms.u_time.value = (test.clock.getElapsedTime() % 0.7895 );

    const animate = () => {
        var material_use1 = material; 
        var material_use2 = material2;

        scene.remove(to_remove);
        scene.remove(to_remove2);
        scene.remove(to_remove3);

        cycles = Math.floor(test.clock.getElapsedTime() / 0.7895); 
        
        if (cycles % 2 == 0){
            material.uniforms.u_time.value = ((test.clock.getElapsedTime() % 0.7895 ));
            material2.uniforms.u_time.value = ((test.clock.getElapsedTime() % 0.7895 ));
            material3.uniforms.u_time.value = ((test.clock.getElapsedTime() % 0.7895 ));
        }
        else{
            material.uniforms.u_time.value = 0.7895 - (test.clock.getElapsedTime() % 0.7895 ); 
            material2.uniforms.u_time.value = 0.7895 - (test.clock.getElapsedTime() % 0.7895 ); 
            material3.uniforms.u_time.value = 0.7895 - (test.clock.getElapsedTime() % 0.7895 ); 
           
        }
        
        //Ring.rotation.z += 0.01

        if (radius >= 110){
            out = false; 
        }
        if  (radius <= 70){
            out = true; 
             
        }
        if (out == true){
            radius += 0.28;
            radius2 -= 0.28;

        }
        else {
            radius -= 0.28; 
            radius2 += 0.28;  
        }
        
        if (Math.abs(radius - radius2) < 5){
            material_use1 = material3; 
            material_use2 = material3; 
        }
        //create new rings w/ updated radius 
        const geometry = new THREE.TorusGeometry( radius, 1, 16, 100 );
        const geometry2 = new THREE.TorusGeometry( radius2, 1, 16, 100 ); 
        const geometry3 = new THREE.TorusGeometry( radius3, 1, 16, 100 ); 

        Ring = new THREE.Mesh( geometry, material_use1 );
        Ring.rotation.set(Math.PI / 2, 0, 0); 

        Ring2 = new THREE.Mesh( geometry2, material_use2 );
        Ring2.rotation.set(Math.PI / 2, 0, 0); 

        Ring3 = new THREE.Mesh( geometry3, material3 );
        Ring3.rotation.set(Math.PI / 2, 0, 0); 

        //reset to_remove so the rings are removed in the next run of the animate function
        to_remove = Ring; 
        to_remove2 = Ring2; 
        to_remove3 = Ring3;

        //console.log(Ring); 
        //console.log(Ring2); 
        //console.log(Ring3);

        //add Rings
        scene.add( Ring );
        scene.add( Ring2 );
        //scene.add( Ring3 );

        requestAnimationFrame(animate); 
    };

    animate();

    }, []); 
    
}

export default Rings; 