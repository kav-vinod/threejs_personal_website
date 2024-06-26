// vertexShader.js
export const vertexShader = `
varying vec2 vUv;
uniform float u_time; 
varying vec3 pos; 
varying vec3 norm;  
void main() {
    //position declared for you bt WebGL and Three.JS
    pos = position; 
    norm = normal; 
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position.x + (cos(position.z * u_time) * 5.0) + sin(u_time), position.y + (sin(position.z * u_time) * 5.0) + cos(u_time), position.z + sin(cos(u_time) * 5.0), 1.0);
}
`
;
