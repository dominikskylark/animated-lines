import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Line, OrbitControls, OrthographicCamera, Plane, Segment, Segments, Text, Tube, } from "@react-three/drei";

import { Vector2 } from 'three';

function Linka({ angle, planeHeight, i, l }) {
    const ref = useRef();

    useFrame(({ clock }) => {
        ref.current.rotation.y = clock.getElapsedTime()
    })

    return <Line
        ref={ref}
        points={[[-2, 0, 0], [2, 0, 0]]}
        color="blue"
        linewidth={1}
        rotation={[0, 0, - i / 2 * (angle * 180 / Math.PI)]}
        position={[i - planeHeight / 2, l, 0]}
    />
}
function App() {
    const [mousePosition, setMousePosition] = useState([0, 0]);
    const planeHeight = 100

    function handleMouseMove(event) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        setMousePosition([mouseX, mouseY]);
        console.log(mousePosition);
    }



    const lines = []
    for (let i = 0; i < 100; i++) {
        const angle = Math.atan2(
            mousePosition[0], mousePosition[1] - (i * 2 + planeHeight / 2)
        );
        lines.push(<Linka
            planeHeight={planeHeight} i={i} angle={angle} l={0}
        />)
    }
    for (let i = 0; i < 60; i++) {
        const angle = Math.atan2(
            mousePosition[0], mousePosition[1] - (i * 2 + planeHeight / 2)
        );
        lines.push(<Linka
            planeHeight={planeHeight} i={i} angle={angle} l={4}
        />)
    }
    return (
        <Canvas onPointerMove={handleMouseMove} style={{ width: "100vw", height: "100vh" }}>
            <OrthographicCamera makeDefault position={[0, 0, 100]} zoom={10} />
            {/* <OrbitControls /> */}
            <Plane args={[planeHeight, planeHeight]} position={[0, 0, -1]}>

            </Plane>
            {lines.map((line) => {
                return line
            })}

        </Canvas>
    );
}

export default App;
