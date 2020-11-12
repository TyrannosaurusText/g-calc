import React from "react";
import { savePage } from "./utils/LoadPage.js";
class SheetStore extends React.Component {
  beforeUnload = () => {
    savePage(this.props.uid, JSON.stringify(this.props.sheet));
  };
  componentDidMount = () => {
    window.addEventListener("beforeunload", this.beforeUnload.bind(this));
  };

  componentWillUnmount = () => {
    window.removeEventListener("beforeunload", this.beforeUnload.bind(this));
  };

  render = () => null;
}

export default SheetStore;