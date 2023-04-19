import logo from './logo.svg';
import './App.css';
import { Canvas, useFrame } from '@react-three/fiber';
import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import * as THREE from 'three';


const Line = ({ position }) => {
  const lineRef = useRef();

  useFrame(() => {
    // Get the mouse position
    const mouseX = (position.x / window.innerWidth) * 2 - 1;
    const mouseY = -(position.y / window.innerHeight) * 2 + 1;

    // Update the position of the line
    lineRef.current.lookAt(mouseX, mouseY, 0);
  });

  return (
    <line ref={lineRef}>
      <geometry attach="geometry">
        <vector3 args={[0, 0, 0]} />
        <vector3 args={[1, 1, 1]} />
      </geometry>
      <lineBasicMaterial attach="material" color="white" linewidth={2} />
    </line>
  );
};

const FollowMouseLines = () => {
  const mousePosition = useRef({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    // Update the mouse position
    mousePosition.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  return (
    <div onMouseMove={handleMouseMove}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <Line position={mousePosition.current} />
      </Canvas>
    </div>
  );
};

function Line({ start, end }) {
  const ref = useRef()
  useLayoutEffect(() => {
    ref.current.geometry.setFromPoints([start, end].map((point) => new THREE.Vector3(...point)))
  }, [start, end])
  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color="hotpink" />
    </line>
  )
}

function LinesFollowMouse() {
  const mouse = useRef([0, 0]);
  const refMesh = useRef();

  useFrame(() => {
    const [x, y] = mouse.current;
    const speed = 0.05;
    const group = mouse.currentGroup.current;

    group.rotation.y += (x * speed - group.rotation.y) * 0.1;
    group.rotation.x += (y * speed - group.rotation.x) * 0.1;
  })

  const handleMouseMove = event => {
    mouse.current = [
      (event.clientX / window.innerWidth) * 2 - 1,
      -(event.clientY / window.innerHeight) * 2 + 1,
    ];
  };

  return (
    <Canvas onMouseMove={handleMouseMove} ref={refMesh}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <group>
        <Line position={[0, 0, -5]} />
        <Line position={[0, 0, 0]} />
        <Line position={[0, 0, 5]} />
        <Line position={[-5, 0, 0]} />
        <Line position={[5, 0, 0]} />
        <Line position={[-5, 0, -5]} />
        <Line position={[5, 0, -5]} />
        <Line position={[-5, 0, 5]} />
        <Line position={[5, 0, 5]} />
        <group>
          <Line position={[0, 0, -10]} />
          <Line position={[0, 0, -15]} />
          <Line position={[0, 0, -20]} />
          <Line position={[0, 0, 10]} />
          <Line position={[0, 0, 15]} />
          <Line position={[0, 0, 20]} />
          <Line position={[-10, 0, 0]} />
          <Line position={[-15, 0, 0]} />
          <Line position={[-20, 0, 0]} />
          <Line position={[10, 0, 0]} />
          <Line position={[15, 0, 0]} />
          <Line position={[20, 0, 0]} />
        </group>
        <group>
          <Line position={[0, 0, -30]} />
          <Line position={[0, 0, -35]} />
          <Line position={[0, 0, -40]} />
        </group>
      </group>

    </Canvas>
  );
}

function GrassStemsFollowMouse() {
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

  useEffect(() => {
    console.log('Mouse position:', mousePosition);
  }, [mousePosition]);


  return (
    <>
      <p>{mousePosition.x}</p>
      <Canvas>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Line start={[1, 0, 0]} end={[mousePosition.x, 1, 0]} />
      </Canvas>
    </>
  )
}



function MousePositionLogger() {
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

  useEffect(() => {
    console.log('Mouse position:', mousePosition);
  }, [mousePosition]);

  return <mesh visible userData={{ hello: 'world' }} position={[mousePosition.x, 2, mousePosition.y]} rotation={[Math.PI / 2, 0, 0]}>
    <sphereGeometry args={[1, 16, 16]} />
    <meshStandardMaterial color="hotpink" transparent />
  </mesh>
}

function CanvasForAnimation() {
  return <Canvas>
    <mesh visible userData={{ hello: 'world' }} position={[1, 2, 3]} rotation={[Math.PI / 2, 0, 0]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="hotpink" transparent />
    </mesh>
  </Canvas>
}

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <GrassStemsFollowMouse />
        <MousePositionLogger />
        <LinesFollowMouse />
      </header>
    </div>
  );
}

export default App;
