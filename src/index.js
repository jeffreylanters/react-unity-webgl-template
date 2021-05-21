import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "build/myunityapp.loader.js",
  dataUrl: "build/myunityapp.data",
  frameworkUrl: "build/myunityapp.framework.js",
  codeUrl: "build/myunityapp.wasm",
});

window.u = unityContext;

unityContext.on("RotationDidUpdate", (degrees) => {
  console.log({ degrees });
});
unityContext.on("Say", (message) => {
  console.log({ message });
});
unityContext.on("progress", (progression) => {
  console.log({ progression });
});
unityContext.on("canvas", (canvas) => {
  console.log({ canvas });
});
unityContext.on("ClickedPosition", (x, y) => {
  console.log({ x, y });
});
unityContext.on("error", (message) => {
  console.log("An error!", message);
});
unityContext.on("log", (message) => {
  console.log("A message!", message);
});

export const App = () => {
  return (
    <Fragment>
      <div>
        <button
          children={"Start Rotation"}
          onClick={() => unityContext.send("MeshCrate", "StartRotation")}
        />
        <button
          children={"Stop Rotation"}
          onClick={() => unityContext.send("MeshCrate", "StopRotation")}
        />
      </div>
      <Unity
        unityContext={unityContext}
        // devicePixelRatio={1}
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
};

ReactDOM.render(<App />, document.getElementById("root"));
