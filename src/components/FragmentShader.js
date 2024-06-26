// gradientFragmentShader.js
export const fragmentShader = `
uniform float u_time;
varying vec2 vUv;
varying vec3 pos;
varying vec3 norm;

void main() {
    vec3 skyBlue = vec3(0.16, 0.40, 0.64);
    
    vec3 navyBlue =  vec3(0.50, 0.50, 0.75);

    vec3 paleBlue = vec3(0.635, 0.761, 0.800);

    vec3 colortop = mix(skyBlue, navyBlue, norm.x); 

    vec3 colorbottom = mix(paleBlue, skyBlue, norm.x); 

    vec3 color = mix(colortop, colorbottom, norm.y); 

    gl_FragColor = vec4(color, 1.0);
}
`;