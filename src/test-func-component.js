import React, { Fragment } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

const unityContext = new UnityContext({
  loaderUrl: "build/myunityapp.loader.js",
  dataUrl: "build/myunityapp.data",
  frameworkUrl: "build/myunityapp.framework.js",
  codeUrl: "build/myunityapp.wasm",
});

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

export const TestFuncComponent = () => {
  return (
    <Fragment>
      <div>
        <button
          children={"Start Rotation"}
          onClick={() => unityContext.send("mesh-crate", "StartRotation")}
        />
        <button
          children={"Stop Rotation"}
          onClick={() => unityContext.send("mesh-crate", "StopRotation")}
        />
      </div>
      <Unity
        unityContext={unityContext}
        devicePixelRatio={1}
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
