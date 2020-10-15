import React from "react";
import { artifactSub } from "./Effects.js";
import "../css/ArtifactField.css";
import { SelectionValueField } from "./SelectionValueField.js";

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
      <>
        Value <input type="text" />
      </>,
      this.state["artifactSub-" + id]
    );
  };
  artifactMainField = (id) => {
    return (
      <div key={"artifactMain-" + id}>
        <select id={"artifactMain-" + id}>
          {this.state.mainStats.map((name) => {
            return (
              <option key={name} value={"artifactMain_" + name}>
                {name}
              </option>
            );
          })}
        </select>{" "}
        Value <input type="text" />
      </div>
    );
  };
  render = () => {
    console.log(this.state);
    return (
      <div className="section__artifactBody">
        Main Stat
        <div className="section__artifactMainLines">
          {this.artifactMainField()}
        </div>
        Sub Stats
        <div className="section__artifactSubLines">
          {this.artifactSubField(0)}
          {this.artifactSubField(1)}
          {this.artifactSubField(2)}
          {this.artifactSubField(3)}
        </div>
      </div>
    );
  };
}

export default ArtifactField;
