// gradientFragmentShader.js
// gradientFragmentShader.js

export const fragmentShader = `
uniform float u_time;
varying vec2 vUv;
varying vec3 pos;
varying vec3 norm;

void main() {
    vec3 purple = vec3(0.2, 0.0, 0.4);
    
    vec3 darkGrey = vec3(0.4, 0.6, 0.8);

    vec3 offWhite = vec3(0.53, 0.81, 0.92);

    vec3 colortop = mix(purple, darkGrey, norm.x); 

    vec3 colorbottom = mix(offWhite, purple, norm.x); 

    vec3 color = mix(colortop, colorbottom, norm.y); 

    gl_FragColor = vec4(color, 1.0);
}
`;
