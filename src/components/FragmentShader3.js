// gradientFragmentShader.js
// gradientFragmentShader.js

export const fragmentShader3 = `
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
