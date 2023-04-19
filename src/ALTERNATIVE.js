import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Plane, useTexture } from '@react-three/drei';
import * as THREE from 'three';

const Grid = () => {
    const ref = useRef();

    const texture = useTexture('/line.png');

    useFrame(({ mouse }) => {
        const { x, y } = mouse;
        const mousePos = new THREE.Vector2(x * 2 - 1, -y * 2 + 1);

        if (ref.current) {
            ref.current.children.forEach((mesh) => {
                const { x, y } = mesh.userData;
                const meshPos = new THREE.Vector2(x, y);
                const angleToMouse = mousePos.angleTo(meshPos);
                mesh.rotation.z = angleToMouse;
            });
        }
    });

    const numRows = 4;
    const numCols = 4;
    const imageSize = 1; // Change this to the size of your image in Three.js units
    const rowSpacing = 2 / (numRows + 1);
    const colSpacing = 2 / (numCols + 1);

    const planes = [];

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const x1 = (j - i) * colSpacing;
            const y1 = (j + i) * rowSpacing;

            const plane = (
                <Plane
                    key={`${i}-${j}`}
                    args={[imageSize, imageSize]}
                    position={[x1, y1, 0]}
                    userData={{ x: x1, y: y1 }}
                >
                    <meshBasicMaterial attach="material" map={texture} />
                </Plane>
            );

            planes.push(plane);
        }
    }

    return <group ref={ref}>{planes}</group>;
};

const App = () => {
    return (
        <Canvas camera={{ position: [0, 0, 5] }} style={{ width: "100vw", height: "100vh" }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Grid />
            <Html>
                <div style={{ position: 'absolute', top: 10, left: 10 }}>
                    Move your mouse over the rotating grid!
                </div>
            </Html>
        </Canvas>
    );
};

export default App;