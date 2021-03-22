import React, { Component, Fragment } from "react";
import Unity, { UnityContext } from "react-unity-webgl";

export class TestClassComponent extends Component {
  constructor() {
    super();
    this.speed = 30;
    this.state = {
      progression: 0,
      isLoaded: false,
      degrees: 0,
      message: "-",
      showUnity: true,
      clickedPositionX: 0,
      clickedPositionY: 0,
    };
    this.unityContext = new UnityContext({
      codeUrl: "/build/myunityapp.wasm",
      frameworkUrl: "/build/myunityapp.framework.js",
      dataUrl: "/build/myunityapp.data",
      loaderUrl: "/build/myunityapp.loader.js",
    });
    this.unityContext.on("RotationDidUpdate", (degrees) => {
      this.setState({ degrees: Math.round(degrees) });
    });
    this.unityContext.on("Sayx", (message) => {
      this.setState({ message });
    });
    this.unityContext.on("ClickedPosition", (x, y) => {
      this.setState({ clickedPositionX: x, clickedPositionY: y });
    });
    this.unityContext.on("progress", (progression) => {
      this.setState({ progression });
    });
    this.unityContext.on("loaded", () => {
      this.setState({ isLoaded: true });
    });
    this.unityContext.on("error", (message) => {
      console.log("AN ERROR OCCURED", message);
    });
    this.unityContext.on("debug", (message) => {
      console.log("GOT A LOG", message);
    });
  }
  render() {
    return (
      <Fragment>
        <h1>React UnityWebGL</h1>
        <p>Loading: {this.state.progression * 100}%...</p>
        <p>Rotation {this.state.degrees}deg</p>
        <p>Last Said {this.state.message}</p>
        <p>
          Last Clicked Position {this.state.clickedPositionX},
          {this.state.clickedPositionY}
        </p>
        <button
          children={"Start Rotation"}
          onClick={() => this.unityContext.send("MeshCrate", "StartRotation")}
        />
        <button
          children={"Stop Rotation"}
          onClick={() => this.unityContext.send("MeshCrate", "StopRotation")}
        />
        <button
          children={"Faster Rotation"}
          onClick={() => {
            this.speed += 5;
            this.unityContext.send("MeshCrate", "SetRotationSpeed", this.speed);
          }}
        />
        <button
          children={"Slower Rotation"}
          onClick={() => {
            this.speed -= 5;
            this.unityContext.send("MeshCrate", "SetRotationSpeed", this.speed);
          }}
        />
        <button
          children={"(re)Unmount"}
          onClick={() => this.setState({ showUnity: !this.state.showUnity })}
        />
        <div>
          {this.state.showUnity === true ? (
            <Unity
              style={{
                width: "600px",
                height: 400,
                border: "2px solid black",
                background: "grey",
                visibility: this.state.isLoaded ? "visible" : "hidden",
              }}
              unityContext={this.unityContext}
              devicePixelRatio={1}
            />
          ) : (
            <div />
          )}
        </div>
      </Fragment>
    );
  }
}
