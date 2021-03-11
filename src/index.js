import React, { Component } from "react";
import ReactDOM from "react-dom";
import { TestFuncComponent } from "./test-func-component";
// import { TestClassComponent } from "./test-class-component";

class App extends Component {
  render() {
    return <TestFuncComponent />;
    // return <TestClassComponent />;
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
