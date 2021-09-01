import "./app.css";
import { Fragment, useEffect, useState } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

interface Vector2 {
  x: number;
  y: number;
}

// This is the context that Unity will use to communicate with the React app.
const unityContext = new UnityContext({
  loaderUrl: "unitybuild/myunityapp.loader.js",
  dataUrl: "unitybuild/myunityapp.data",
  frameworkUrl: "unitybuild/myunityapp.framework.js",
  codeUrl: "unitybuild/myunityapp.wasm",
});

// This is the React component that will be rendering the Unity app.
function App() {
  // The app's state.
  const [isUnityMounted, setIsUnityMounted] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(30);
  const [cubeRotation, setCubeRotation] = useState<number>(0);
  const [clickPosition, setClickPosition] = useState<Vector2>({ x: 0, y: 0 });
  const [saidMessage, setSaidMessage] = useState<string>("Nothing");

  // When the component is mounted, we'll register some event listener.
  useEffect(() => {
    unityContext.on("canvas", handleOnUnityCanvas);
    unityContext.on("loaded", handleOnUnityLoaded);
    unityContext.on("RotationDidUpdate", handleOnUnityRotationDidUpdate);
    unityContext.on("ClickedPosition", handleOnUnityClickedPosition);
    unityContext.on("Say", handleOnUnitySayMessage);
    // When the component is unmounted, we'll unregister the event listener.
    return function () {
      unityContext.removeAllEventListeners();
    };
  }, []);

  // When the rotation speed has been updated, it will be sent to Unity.
  useEffect(() => {
    unityContext.send("MeshCrate", "SetRotationSpeed", rotationSpeed);
  }, [rotationSpeed]);

  // Built-in event invoked when the Unity canvas is ready to be interacted with.
  function handleOnUnityCanvas(canvas: HTMLCanvasElement) {
    canvas.setAttribute("role", "unityCanvas");
  }

  // Built-in event invoked when the Unity app is loaded.
  function handleOnUnityLoaded() {
    console.log("Unity loaded");
  }

  // Custom event invoked when the Unity app sends a message indicating that the
  // rotation has changed.
  function handleOnUnityRotationDidUpdate(degrees: number) {
    setCubeRotation(Math.round(degrees));
  }

  // Custom event invoked when the Unity app sends a message indicating that the
  // mouse click position has changed.
  function handleOnUnityClickedPosition(x: number, y: number) {
    setClickPosition({ x, y });
  }

  // Custom event invoked when the Unity app sends a message including something
  // it said.
  function handleOnUnitySayMessage(message: string) {
    setSaidMessage(message);
  }

  // Event invoked when the user clicks the button, the speed will be increased.
  function handleOnClickIncreaseSpeed() {
    setRotationSpeed(rotationSpeed + 15);
  }

  // Event invoked when the user clicks the button, the speed will be decreased.
  function handleOnClickDecreaseSpeed() {
    setRotationSpeed(rotationSpeed - 15);
  }

  // Event invoked when the user clicks the button, the unity container will be
  // mounted or unmounted depending on the current mounting state.
  function handleOnClickUnMountUnity() {
    setIsUnityMounted(!isUnityMounted);
  }

  // This is the React component that will be rendering the Unity app.
  return (
    <Fragment>
      <div className="wrapper">
        {/* Introduction text */}
        <h1>React Unity WebGL Tests</h1>
        <p>
          In this React Application we'll explore the possibilities with the
          React Unity WebGL Module. Use the built-in events, custom events,
          mount, unmount, press the buttons and resize the view to see the magic
          in action.
        </p>
        {/* Some buttons to interact */}
        <button onClick={handleOnClickUnMountUnity}>(Un)mount Unity</button>
        <button onClick={handleOnClickIncreaseSpeed}>Increase speed</button>
        <button onClick={handleOnClickDecreaseSpeed}>Decrease speed</button>
        {/* The Unity app */}
        {isUnityMounted === true && (
          <Fragment>
            <div className="unity-container">
              {/* TODO add demo loading screen */}
              <Unity className="unity-canvas" unityContext={unityContext} />
            </div>
            {/* Displaying some output values */}
            <p>
              The cube is rotated <b>{cubeRotation}</b> degrees
              <br />
              The Unity app said <b>"{saidMessage}"</b>!
              <br />
              Clicked at <b>x{clickPosition.x}</b>, <b>y{clickPosition.y}</b>
            </p>
          </Fragment>
        )}
        <h6>
          Made with love by{" "}
          <a href="https://github.com/jeffreylanters">Jeffrey Lanters</a>
        </h6>
      </div>
    </Fragment>
  );
}

export default App;
