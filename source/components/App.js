import React, { Component } from "react";
import Unity, { UnityContent, UnityVersion } from "../../../React-Unity-WebGL/";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.unityContent = new UnityContent(
      "Public/Build/myGame.json",
      "Public/Build/UnityLoader.js"
    );
    this.unityContent.on("onLoad", () => {
      console.log("Wow! did load");
    });
    window.setTimeout(() => {
      this.unityContent.send("1", "2", "3");
    }, 1000);
  }

  render() {
    return (
      <div>
        <h1>React Unity WebGL Test</h1>
        <Unity
          unityContent={this.unityContent}
          className="test"
          width="300px"
          height="200px"
        />
      </div>
    );
  }
}
