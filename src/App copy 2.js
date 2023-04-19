import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { Box, OrbitControls, Line, OrthographicCamera, Plane, Segment, Segments, Text, Tube, } from "@react-three/drei";


function LineCo({ pos, mousePosition }) {
  const ref = useRef()

  const points = []

  points.push(new THREE.Vector3(0, 0, 0))
  points.push(new THREE.Vector3(0, 0, 5))

  const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
  useFrame(() => {
    // Get the mouse position
    const mouseX = -(mousePosition[0] / window.innerWidth) * 2 - 1;
    const mouseY = (mousePosition[1] / window.innerHeight) * 2 + 1;
    // const mouseX = mousePosition.x * 100;
    // const mouseY = mousePosition.y * 100;


    // Update the position of the line
    ref.current.lookAt(mouseY, mouseX, 0);
  });

  return <>
    <Line
      points={[[-2, 0, 0], [2, 0, 0]]}
      color={"white"}
      ref={ref}
      position={[pos, 0, 0]}
    /> </>
}
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
    rowLines.push(<Segment start={[-planeWidth / 5, y, 0]} end={[planeWidth / 2, y, 0]} />);
  }

  // Create column lines
  const colLines = [];
  for (let i = 0; i <= numCols; i++) {
    const x = i * cellWidth - planeWidth / 2;
    colLines.push(<Segment start={[x, -planeHeight / 5, 0]} end={[x, planeHeight / 2, 0]} />);
  }

  // const handleMouseMove = event => {
  //   setMousePosition({ x: event.clientX, y: event.clientY });
  // };


  function handleMouseMove(event) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    setMousePosition([mouseX, mouseY]);
  }

  // useEffect(() => {
  //   window.addEventListener('mousemove', handleMouseMove);

  //   return () => {
  //     window.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, []);
  return (
    <Canvas onMouseMove={handleMouseMove} camera={{ position: [0, 0, 20], fov: 15, rotation: [-Math.PI / 180, Math.PI / 350, 0], zoom: 1, orthographic: true }}
      gl={{ toneMappingExposure: 0.7 }}
      style={{
        width: "100vw",
        height: "100vh",
      }}>
      {/* <OrthographicCamera makeDefault position={[0, 0, 100]} /> */}
      <Plane ref={planeRef} args={[planeWidth, planeHeight]}>
        <meshBasicMaterial attach="material" color="#000" />
      </Plane>
      <OrbitControls />
      {rowLines.map((rowLine, rowIndex) => {
        const angle = Math.atan2(
          mousePosition[1] - (rowIndex * cellHeight - planeHeight / 2),
          mousePosition[0],
        );
        console.log("ANGLE", angle)
        return (
          <>
            <LineCo
              key={rowIndex}
              pos={rowIndex}
              points={[2, 4]}
              mousePosition={mousePosition}
              color={"white"}
            // start={rowLine.props.start}
            // end={rowLine.props.end}
            // rotation={[0, 0, angle - Math.PI / 2]}
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
          <LineCo
            key={colIndex}
            points={[colLine.props.start, colLine.props.end]}
            mousePosition={mousePosition}
            pos={[colLine.props.start, colLine.props.end]}

            rotation={[0, 0, angle - Math.PI / 2]}
          />
        );
      })}
    </Canvas>
  );
}
export default App;