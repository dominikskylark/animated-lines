import logo from './logo.svg';
import './App.css';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import * as THREE from 'three';
import { AxesHelper } from 'three';
import { OrbitControls, OrthographicCamera } from '@react-three/drei';

function Line({ pos, mousePosition }) {
  const ref = useRef()


  const points = []
  points.push(new THREE.Vector3(0, 0, 0))
  points.push(new THREE.Vector3(0, 0, 0))
  points.push(new THREE.Vector3(0, 0, 1))

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
  useFrame(() => {
    // Get the mouse position
    const mouseX = -(mousePosition.x / window.innerWidth) * 2 - 1;
    const mouseY = (mousePosition.y / window.innerHeight) * 2 + 1;
    // const mouseX = mousePosition.x * 100;
    // const mouseY = mousePosition.y * 100;


    // Update the position of the line
    ref.current.lookAt(mouseY, 0, mouseX);
  });

  return <>
    {/* <mesh ref={bu} visible userData={{ hello: 'world' }} position={[0, 0, 0]} >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="blue" />
    </mesh> */}
    <line ref={ref} geometry={lineGeometry} position={[pos, 0, 0]}>
      <lineBasicMaterial attach="material" color={'#9c88ff'} linewidth={40} linecap={'round'} linejoin={'round'} />
    </line></>
}

function App() {
  const bu = useRef()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = event => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);






  // const positions = new Float32Array(points.length * 2)
  const deg2rad = degrees => degrees * (Math.PI / 180);
  console.log(window.innerHeight)


  return (
    <div style={{ backgroundColor: "white", height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 15, rotation: [-Math.PI / 180, Math.PI / 350, 0], zoom: 1, orthographic: true }}
        gl={{ toneMappingExposure: 0.7 }}
        style={{
          width: "100vw",
          height: "100vh",
        }}>
        <OrbitControls />
        <axesHelper args={[5]} />
        {[0, 1, 2, 3, 4, 5].map((item) => {
          return <Line pos={item} mousePosition={mousePosition} />
        })}
      </Canvas>
    </div>
  );
}

export default App;
