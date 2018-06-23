import React, { Component } from "react";
import Unity, { UnityContent } from "../../../React-Unity-WebGL/";
import { UnityVersion } from "../../../React-Unity-WebGL/source/enums/UnityVerions";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.unityContent = new UnityContent(
      "Public/Build/myGame.json",
      "Public/Build/UnityLoader.js"
    );
    console.log(this.unityContent);
  }
  render() {
    return (
      <div>
        <h1>React Unity WebGL Test</h1>
        <Unity content={this.unityContent} />
      </div>
    );
  }
}
