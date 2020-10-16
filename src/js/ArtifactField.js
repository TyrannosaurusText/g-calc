import React from "react";
import { artifactSub } from "./Effects.js";
import "../css/ArtifactField.css";
import { SelectionValueField } from "./SelectionValueField.js";
import { NumberFieldOnLine } from "./NumberField.js";

const localStorageArtifactField = "ArtifactField";
class ArtifactField extends React.Component {
  constructor(props) {
    super(props);
    var val = JSON.parse(localStorage.getItem(localStorageArtifactField));
    this.state = { ...val, mainStats: props.mainStats };
  }

  updateSelection = (key) => (e) =>
    this.setState({
      [key]:
        e.target.value.localeCompare("None") === 0 ? undefined : e.target.value,
    });

  onChange = (key) => (value) => {
    this.setState({ [key]: value }, () => {
      localStorage.setItem(
        localStorageArtifactField,
        JSON.stringify(this.state)
      );
    });
  };

  artifactSubField = (id) => {
    const artifactId = `artifactSub-${id}`;
    return SelectionValueField(
      artifactSub,
      artifactId,
      this.updateSelection,
      <NumberFieldOnLine
        name={artifactId}
        onChange={this.onChange(artifactId)}
        defaultValue={this.state[artifactId]}
      />,
      this.state[artifactId]
    );
  };
  render = () => {
    console.log(this.state);
    const artifactMainStat = "artifactMainStat";
    return (
      <div className="section__artifactBody">
        Main Stat
        <div className="section__artifactMainLines">
          {SelectionValueField(
            this.state.mainStats,
            artifactMainStat,
            this.updateSelection,
            <NumberFieldOnLine 
              name={"Value"}
              onChange={this.onChange(artifactMainStat)}
              defaultValue={this.state[artifactMainStat]}
            />,
            this.state[artifactMainStat],
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
