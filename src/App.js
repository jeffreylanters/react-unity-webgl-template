import React from "react";
import Unity, { UnityContent } from "react-unity-webgl";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.speed = 30;
    this.state = { rotation: 0, unityShouldBeMounted: true };

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

    this.unityContent.on("progress", progression => {
      console.log("Unity progress", progression);
    });

    this.unityContent.on("loaded", () => {
      console.log("Yay! Unity is loaded!");
    });
  }

  onClickStart() {
    this.unityContent.send("mesh-crate", "StartRotation");
  }

  onClickStop() {
    this.unityContent.send("mesh-crate", "StopRotation");
  }

  onClickUpdateSpeed(speed) {
    this.speed += speed;
    this.unityContent.send("mesh-crate", "SetRotationSpeed", this.speed);
  }

  onClickUnount() {
    this.setState({ unityShouldBeMounted: false });
  }

  render() {
    return (
      <div>
        <h1>{"React Unity WebGL Test"}</h1>
        <p>{"Rotation: " + this.state.rotation}deg</p>
        <button onClick={this.onClickStart.bind(this)}>{"Start"}</button>
        <button onClick={this.onClickStop.bind(this)}>{"Stop"}</button>
        <button onClick={this.onClickUpdateSpeed.bind(this, 10)}>
          {"Faster"}
        </button>
        <button onClick={this.onClickUpdateSpeed.bind(this, -10)}>
          {"Slower"}
        </button>
        <button onClick={this.onClickUnount.bind(this)}>
          {"Unmount (2019.1=>)"}
        </button>
        {this.state.unityShouldBeMounted === true && (
          <Unity unityContent={this.unityContent} />
        )}
      </div>
    );
  }
}

export default App;
