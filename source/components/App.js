import React, { Component } from "react";
import Unity from "../../../React-Unity-WebGL/";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.myUnity = new Unity();
  }
  render() {
    return (
      <div>
        <h1>React Unity WebGL Test</h1>
        <this.myUnity />
      </div>
    );
  }
}
