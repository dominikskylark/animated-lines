import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Box, Line, OrbitControls, OrthographicCamera, Plane, Segment, Segments, Text, Tube, } from "@react-three/drei";

import { Vector2 } from 'three';

function LineGrid(props) {
  const { size, rows, columns, mouse } = props;

  const [points, setPoints] = useState(generatePoints());

  // use useRef to store the previous mouse position
  const prevMouse = useRef(new Vector2(mouse.x, mouse.y));

  function generatePoints() {
    const points = [];

    const rowSpacing = size / rows;
    const columnSpacing = size / columns;

    for (let i = 0; i <= rows; i++) {
      const y = i * rowSpacing - size / 2;
      const row = [];

      for (let j = 0; j <= columns; j++) {
        const x = j * columnSpacing - size / 2;
        row.push([x, y, 0]);
      }

      points.push(row);
    }

    return points;
  }

  // update the state only when the mouse position changes beyond a threshold
  function handleMouseEvent(event) {
    const threshold = 0.01;
    const delta = new Vector2(event.clientX, event.clientY).sub(prevMouse.current);
    if (delta.length() < threshold) {
      return;
    }

    prevMouse.current = new Vector2(event.clientX, event.clientY);

    const newPoints = [];

    for (let i = 0; i <= rows; i++) {
      const row = [];

      for (let j = 0; j <= columns; j++) {
        const x = points[i][j][0];
        const y = points[i][j][1];

        // calculate the new z-coordinate based on the mouse position
        const distance = new Vector2(x, y).distanceTo(mouse);
        const z = distance * 10;

        row.push([x, y, z]);
      }

      newPoints.push(row);
    }

    setPoints(newPoints);
  }

  const lines = [];

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      const line = new Array(2);

      // assign the start and end points of the line
      line[0] = new Vector2(...points[i][j]);
      line[1] = new Vector2(...points[i][j + 1]);

      lines.push(line);

      line[0] = new Vector2(...points[i][j + 1]);
      line[1] = new Vector2(...points[i + 1][j + 1]);

      lines.push(line);

      line[0] = new Vector2(...points[i + 1][j + 1]);
      line[1] = new Vector2(...points[i + 1][j]);

      lines.push(line);

      line[0] = new Vector2(...points[i + 1][j]);
      line[1] = new Vector2(...points[i][j]);

      lines.push(line);
    }
  }

  return (
    <Line points={lines.flat()} color={'black'} linewidth={1}>
    </Line>
  );
}

function App() {
  const [mouse, setMouse] = useState(new Vector2());

  function handleMouseMove(event) {
    setMouse(new Vector2(event.clientX, event.clientY));
  }

  return (
    <Canvas onPointerMove={handleMouseMove} style={{ width: "100vw", height: "100vh" }}>
      <OrthographicCamera makeDefault position={[0, 0, 100]}>
        <OrbitControls />
        <Plane args={[100, 100]} position={[0, 0, -1]}>
          <LineGrid size={100} rows={10} columns={10} mouse={mouse} position={[0, 0, 0.5]} />
        </Plane>
      </OrthographicCamera>
    </Canvas>
  );
}

export default App;
