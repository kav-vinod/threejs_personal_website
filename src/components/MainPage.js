
import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Text3D, PerspectiveCamera, OrbitControls, Box } from '@react-three/drei';
//import Section from './Section';

function MainPage() {
  const refContainer = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      setWindowSize({ width: newWidth, height: newHeight });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div ref={refContainer}>
      <Canvas
        style={{
          background: 'linear-gradient(to bottom, #ffffff, hsl(210, 60%, 40%))', width: windowSize.width, height: windowSize.height,
        }}
      >
        <OrbitControls makeDefault />
        <Box
  position={[windowSize.width / 2 - 5, -windowSize.height / 2 + 5, 0]}
  scale={[150, 150, 150]} // Adjust the scale to make the box larger
/>
      </Canvas>
    </div>
  );
}

export default MainPage;
