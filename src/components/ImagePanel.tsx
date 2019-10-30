import * as React from "react";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const canvasSize = { width: 400, height: 300 };
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    offCanvas: {
      // NOTE to debug off canvas, comment out
      display: "none"
    }
  })
);
export default function ImagePanel() {
  const classes = useStyles({});
  const canvasRef = React.useRef(null);
  const offCanvasRef = React.useRef(null);
  const [values, setValues] = React.useState({
    x: 0,
    y: 0,
    imgX: 0,
    imgY: 0,
    downX: 0,
    downY: 0,
    pressed: false,
    mouseState: "None",
    message: "Hello"
  });

  React.useEffect(() => {
    // console.log(`${new Date()}: use effect`);

    _updateCanvas();
  });

  function _drawImage(context: any, onImageDrawn: any) {
    var imageObj = new Image();
    imageObj.src =
      "https://s-media-cache-ak0.pinimg.com/236x/d7/b3/cf/d7b3cfe04c2dc44400547ea6ef94ba35.jpg";
    imageObj.onload = function() {
      // console.log(`${new Date()}: draw image: ${values.imgX}, ${values.imgY}`);
      context.drawImage(imageObj, values.imgX, values.imgY);
      onImageDrawn();
    };
  }

  function _clearCanvas(canvas: any) {
    var context = canvas.getContext("2d");

    // clear canvas
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
  }

  function _updateCanvas() {
    var canvas = canvasRef.current;
    var context: any = canvas.getContext("2d");

    // freeze canvas
    // context.save();

    // draw to offCanvas
    var offCanvas = offCanvasRef.current;
    var offContext = offCanvas.getContext("2d");

    // freeze canvas
    offContext.save();
    _clearCanvas(offCanvas);
    _drawImage(offContext, () => {
      // console.log("image drawn");
      _drawText(offContext, `(${values.x},${values.y}): ${values.mouseState}`);

      // unfreeze canvas
      offContext.restore();

      // requestAnimationFrame(_updateCanvas);

      _clearCanvas(canvas);

      // copy offCanvas to canvas
      context.drawImage(offCanvas, 0, 0);

      // unfreeze canvas
      // context.restore();
    });
  }

  function _drawText(context: any, message: string) {
    context.font = "10px Arial";
    context.fillStyle = "red";
    context.fillText(message, 0, 50);
  }

  function _onMouseDown(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    console.log("mouse down");
    var canvas = canvasRef.current;
    var clientRect = canvas.getBoundingClientRect();
    setValues({
      ...values,
      x: e.clientX - clientRect.x,
      y: e.clientY - clientRect.y,
      downX: e.clientX,
      downY: e.clientY,
      pressed: true,
      mouseState: "down"
    });
  }
  function _onMouseUp(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    console.log("mouse up");
    setValues({
      ...values,
      x: e.clientX,
      y: e.clientY,
      pressed: false,
      mouseState: "up"
    });
  }
  function _onMouseMove(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
    // console.log("mouse move");
    var canvas = canvasRef.current;
    var clientRect = canvas.getBoundingClientRect();
    if (values.pressed) {
      // console.log(`move: pressed: ${values.pressed}`);
      // _clearCanvas();
      setValues({
        ...values,
        imgX: e.clientX - clientRect.x,
        imgY: e.clientY - clientRect.y,
        x: e.clientX,
        y: e.clientY,
        mouseState: "move"
      });
    } else {
      setValues({
        ...values,
        x: e.clientX,
        y: e.clientY,
        mouseState: "move"
      });
    }
  }
  return (
    <div>
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        onMouseDown={_onMouseDown}
        onMouseUp={_onMouseUp}
        onMouseMove={_onMouseMove}
      />
      <canvas
        className={classes.offCanvas}
        ref={offCanvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
      />
    </div>
  );
}
