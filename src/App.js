import React, { useRef } from "react";
import Sketch from "react-p5";

let img;

const RotatingLines = () => {
  const canvasRef = useRef(null);

  const setup = (p5, canvasParentRef) => {
    p5.createCanvas(700, 700).parent(canvasParentRef);
    img = p5.loadImage('./line.png')
    console.log("IG", img)
  };

  const draw = (p5) => {
    p5.background(0);

    const numRows = 24;
    const numCols = 30;
    const imageSize = 15; // Change this to the size of your PNG image
    const rowSpacing = p5.height / (numRows + 1);
    const colSpacing = p5.width / (numCols + 1);
    const mouseX = p5.mouseX;
    const mouseY = p5.mouseY;

    p5.push();
    p5.translate(p5.width / 2, p5.height / 2);
    p5.rotate(p5.radians(45));
    p5.scale(0.7)

    for (let i = 1; i <= numRows; i++) {
      for (let j = 1; j <= numCols; j++) {
        const x1 = j * colSpacing;
        const y1 = i * rowSpacing;

        const dx = mouseX - x1;
        const dy = mouseY - y1;
        const angleToMouse = p5.atan2(dy, dx);

        p5.push();
        p5.translate(x1 - p5.width / 2, y1 - p5.height / 2);
        p5.rotate(angleToMouse);
        p5.image(img, -imageSize / 4, -imageSize / 4, imageSize, imageSize);
        p5.pop();
      }
    }

    p5.pop();
  };


  // const draw = (p5) => {
  //   p5.background(0);
  //   p5.stroke(0);

  //   const numRows = 30; // Change this to the number of rows you want
  //   const numCols = 30; // Change this to the number of columns you want
  //   const imageSize = 8;
  //   const rowSpacing = p5.height / (numRows + 1);
  //   const colSpacing = p5.width / (numCols + 1);
  //   const mouseX = p5.mouseX;
  //   const mouseY = p5.mouseY;

  //   for (let i = 1; i <= numRows; i++) {
  //     for (let j = 1; j <= numCols; j++) {
  //       const x1 = j * colSpacing;
  //       const y1 = i * rowSpacing;

  //       const dx = mouseX - x1;
  //       const dy = mouseY - y1;
  //       const angleToMouse = p5.atan2(dy, dx);

  //       p5.push();
  //       p5.translate(x1, y1);
  //       p5.rotate(angleToMouse);
  //       p5.image(img, -imageSize / 2, -imageSize / 2, imageSize, imageSize);
  //       p5.pop();
  //     }
  //   }
  // };

  return <Sketch setup={setup} draw={draw} canvasRef={canvasRef} />;
};

function App() {

  return (
    <div style={{ backgroundColor: "black", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <RotatingLines />
    </div>
  );
}

export default App;