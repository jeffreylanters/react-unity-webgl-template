import React, { Component } from "react";
import Unity, { UnityContent, UnityVersion } from "../../../React-Unity-WebGL/";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotation: 0
    };
    this.speed = 30;
    this.unityContent = new UnityContent(
      "unity_project_build/Build.json",
      "unity_project_build/UnityLoader.js"
    );
    this.unityContent.on("Say", message => {
      console.log("Wow Unity said: " + message);
    });
    this.unityContent.on("SendRotation", rotation => {
      this.setState({ rotation: Math.round(rotation) });
    });
  }
  onClickStart() {
    this.unityContent.send("mesh-crate", "StartRotation");
  }
  onClickStop() {
    this.unityContent.send("mesh-crate", "StopRotation");
  }
  onClickFaster() {
    this.speed += 10;
    this.unityContent.send("mesh-crate", "SetRotationSpeed", this.speed);
  }
  onClickSlower() {
    this.speed -= 10;
    this.unityContent.send("mesh-crate", "SetRotationSpeed", this.speed);
  }

  render() {
    return (
      <div>
        <h1>React Unity WebGL Test</h1>
        <p>Rotation: {this.state.rotation}deg</p>
        <button onClick={this.onClickStart.bind(this)}>{"Start"}</button>
        <button onClick={this.onClickStop.bind(this)}>{"Stop"}</button>
        <button onClick={this.onClickFaster.bind(this)}>{"Faster"}</button>
        <button onClick={this.onClickSlower.bind(this)}>{"Slower"}</button>
        <Unity unityContent={this.unityContent} />
      </div>
    );
  }
}
