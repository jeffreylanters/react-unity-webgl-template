import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import Unity, { UnityContext } from "react-unity-webgl";
import "./index.css";

class App extends Component {
  constructor() {
    super();
    this.speed = 30;
    this.state = {
      degrees: 0,
      message: "-",
      showUnity: true,
    };
    this.unityContext = new UnityContext({
      codeUrl: "/build/myunityapp.wasm",
      frameworkUrl: "/build/myunityapp.framework.js",
      dataUrl: "/build/myunityapp.data",
      loaderUrl: "/build/myunityapp.loader.js",
      devicePixelRatio: 2,
    });
    this.unityContext.on("RotationDidUpdate", (degrees) => {
      this.setState({ degrees: Math.round(degrees) });
    });
    this.unityContext.on("Say", (message) => {
      this.setState({ message });
    });
  }
  render() {
    return (
      <Fragment>
        <h1>React UnityWebGL</h1>
        <p>Rotation {this.state.degrees}deg</p>
        <p>Last Said {this.state.message}</p>
        <button
          children={"Start Rotation"}
          onClick={() => this.unityContext.send("mesh-crate", "StartRotation")}
        />
        <button
          children={"Stop Rotation"}
          onClick={() => this.unityContext.send("mesh-crate", "StopRotation")}
        />
        <button
          children={"Faster Rotation"}
          onClick={() => {
            this.speed += 5;
            this.unityContext.send(
              "mesh-crate",
              "SetRotationSpeed",
              this.speed
            );
          }}
        />
        <button
          children={"Slower Rotation"}
          onClick={() => {
            this.speed -= 5;
            this.unityContext.send(
              "mesh-crate",
              "SetRotationSpeed",
              this.speed
            );
          }}
        />
        <button
          children={"(re)Unmount"}
          onClick={() => this.setState({ showUnity: !this.state.showUnity })}
        />
        <div>
          {this.state.showUnity === true ? (
            <Unity width={"100%"} unityContext={this.unityContext} />
          ) : (
            <div />
          )}
        </div>
      </Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
