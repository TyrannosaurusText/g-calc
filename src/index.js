import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import "./css/bootstrap.css";
import App from "./App.js";

class Index extends React.Component {

  render() {
    return <App />;
  }
}
ReactDOM.render(<Index />, document.getElementById("root"));