import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Box, OrbitControls, OrthographicCamera, Plane, Segment, Segments, Text, Tube, } from "@react-three/drei";



function App() {
  const [mousePosition, setMousePosition] = useState([0, 0]);

  const points = [
    [0, 0, 0],
    [0, 1, 0],
    [0, 1, 1],
    [0, 2, 1],
  ];

  const planeRef = useRef();

  // Size of the plane
  const planeWidth = 500;
  const planeHeight = 500;

  // Number of rows and columns
  const numCols = 30;
  const numRows = 30;

  // Size of each cell
  const cellWidth = planeWidth / numCols;
  const cellHeight = planeHeight / numRows;

  // Create row lines
  const rowLines = [];
  for (let i = 0; i <= numRows; i++) {
    const y = i * cellHeight - planeHeight / 2;
    rowLines.push(<Segment start={[-planeWidth / 2, y, 0]} end={[planeWidth / 2, y, 0]} />);
  }

  // Create column lines
  const colLines = [];
  for (let i = 0; i <= numCols; i++) {
    const x = i * cellWidth - planeWidth / 2;
    colLines.push(<Segment start={[x, -planeHeight / 2, 0]} end={[x, planeHeight / 2, 0]} />);
  }

  function handleMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    setMousePosition([mouseX, mouseY]);
  }

  return (
    <Canvas orthographic camera={{ zoom: 10 }} style={{ width: '100vw', height: '100vh' }} onMouseMove={handleMouseMove}>
      <OrthographicCamera makeDefault position={[0, 0, 100]} />
      <Plane ref={planeRef} args={[planeWidth, planeHeight]}>
        <meshBasicMaterial attach="material" color="#000" />
      </Plane>

      <Segments>
        {rowLines.map((rowLine, rowIndex) => {
          const angle = Math.atan2(
            mousePosition[1] - (rowIndex * cellHeight - planeHeight / 2),
            mousePosition[0],
          );
          console.log("ANGLE", angle)
          return (
            <>
              <Segment
                key={rowIndex}
                start={rowLine.props.start}
                end={rowLine.props.end}
                rotation={[Math.PI / 2, 0, Math.PI / angle]}
              />
            </>
          );
        })}
        {colLines.map((colLine, colIndex) => {
          const angle = Math.atan2(
            mousePosition[1],
            mousePosition[0] - (colIndex * cellWidth - planeWidth / 2),
          );
          return (
            <Segment
              key={colIndex}
              start={colLine.props.start}
              end={colLine.props.end}
              rotation={[0, 0, angle - Math.PI / 2]}
            />
          );
        })}
      </Segments>
    </Canvas>
  );
}
export default App;