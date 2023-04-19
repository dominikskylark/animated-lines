import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh, MeshBasicMaterial, SphereBufferGeometry } from 'three';
import { OrbitControls } from '@react-three/drei';

const ClockHand = () => {
    const meshRef = useRef();

    useFrame(({ mouse }) => {
        const radians = Math.atan2(mouse.y, mouse.x);
        const rotation = radians + Math.PI / 2;
        meshRef.current.rotation.z = rotation;
    });

    return (
        <mesh ref={meshRef}>
            <sphereBufferGeometry args={[0.1, 32, 32]} />
            <meshBasicMaterial color="#ffffff" />
        </mesh>
    );
};

const App = () => {
    return (
        <>
            <OrbitControls />
            <ClockHand />
        </>
    );
};

export default App;