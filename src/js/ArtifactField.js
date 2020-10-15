import React from "react";
import { artifactSub } from "./Effects.js";
import "../css/ArtifactField.css";
import { SelectionValueField } from "./SelectionValueField.js";
import { inputFieldOnLine } from "./InputField.js";

class ArtifactField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mainStats: props.mainStats };
  }

  updateSelection = (key) => (e) =>
    this.setState({
      [key]:
        e.target.value.localeCompare("None") === 0 ? undefined : e.target.value,
    });

  artifactSubField = (id) => {
    return SelectionValueField(
      artifactSub,
      "artifactSub-" + id,
      this.updateSelection,
      inputFieldOnLine,
      this.state["artifactSub-" + id]
    );
  };
  render = () => {
    console.log(this.state);
    return (
      <div className="section__artifactBody">
        Main Stat
        <div className="section__artifactMainLines">
          {SelectionValueField(
            this.state.mainStats,
            "artifactMain",
            this.updateSelection,
            inputFieldOnLine,
            this.state["artifactMainStat"],
            false
          )}
        </div>
        Sub Stats
        <div className="section__artifactSubLines">
          {Array(4)
            .fill(0)
            .map((_, index) => this.artifactSubField(index))}
        </div>
      </div>
    );
  };
}

export default ArtifactField;
