import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Unity from "react-unity-webgl";
import { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "build/myunityapp.loader.js",
  dataUrl: "build/myunityapp.data",
  frameworkUrl: "build/myunityapp.framework.js",
  codeUrl: "build/myunityapp.wasm",
});

window.ctx = unityContext;

function App() {
  const [isLoaded, setLoaded] = useState(false);
  const [progression, setProgression] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [message, setMessage] = useState("");
  const [clickedPosition, setClickedPosition] = useState({ x: 0, y: 0 });

  useEffect(function () {
    unityContext.on("progress", setProgression);
    unityContext.on("loaded", function () {
      setLoaded(true);
    });
    unityContext.on("error", function (message) {
      console.log("An error!", message);
    });
    unityContext.on("log", function (message) {
      console.log("A message!", message);
    });
    unityContext.on("canvas", function (element) {
      console.log("Canvas", element);
    });
    unityContext.on("RotationDidUpdate", setRotation);
    unityContext.on("Say", setMessage);
    unityContext.on("ClickedPosition", function (x, y) {
      setClickedPosition({ x, y });
    });
  }, []);

  function startRotation() {
    unityContext.send("MeshCrate", "StartRotation");
  }

  function stopRotation() {
    unityContext.send("MeshCrate", "StopRotation");
  }

  return (
    <Fragment>
      <h1>React Unity WebGL Test</h1>
      <p>Loading {progression * 100} percent...</p>
      {isLoaded === true && <p>Loaded!</p>}
      <p>Rotation {rotation}deg</p>
      <p>Message {message}</p>
      <p>
        Clicked Position {clickedPosition.x}, {clickedPosition.y}
      </p>
      <button children={"Start Rotation"} onClick={startRotation} />
      <button children={"Stop Rotation"} onClick={stopRotation} />
      <br />
      <Unity
        unityContext={unityContext}
        matchWebGLToCanvasSize={false}
        style={{
          width: "600px",
          height: 400,
          border: "2px solid black",
          background: "grey",
        }}
      />
    </Fragment>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
