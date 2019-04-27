import React from "react";
import Unity, { UnityContent } from "react-unity-webgl";

const content = new UnityContent(
  "unity_project_build/Build.json",
  "unity_project_build/UnityLoader.js"
);

function App() {
  return (
    <div>
      <h1>{"React Unity WebGL Test"}</h1>
      <Unity unityContent={content} />
      <p>!</p>
    </div>
  );
}

export default App;
