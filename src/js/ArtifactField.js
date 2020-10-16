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

  updateSelection = (key) => (e) => {
    this.setState(
      {
        [key]:
          e.target.value.localeCompare("None") === 0
            ? undefined
            : e.target.value,
      },
      () => {
        localStorage.setItem(
          localStorageArtifactField,
          JSON.stringify(this.state)
        );
      }
    );
  };

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
    const artifactSubFieldInputComponent = (
      <NumberFieldOnLine
        name={"Value"}
        onChange={this.onChange(artifactId)}
        defaultValue={this.state[artifactId]}
      />
    );
    return (
      <SelectionValueField
        key={artifactId}
        array={artifactSub}
        selectionName={artifactId}
        onChange={this.updateSelection}
        component={artifactSubFieldInputComponent}
        fieldValue={this.state[artifactId]}
      />
    );
  };
  render = () => {
    console.log(this.state);
    const artifactMainStat = "artifactMainStat";
    const artifactMainStatInputComponent = (
      <NumberFieldOnLine
        name={"Value"}
        onChange={this.onChange(artifactMainStat)}
        defaultValue={this.state[artifactMainStat]}
      />
    );
    return (
      <div className="section__artifactBody">
        Main Stat
        <div className="section__artifactMainLines">
          <SelectionValueField
            array={this.state.mainStats}
            selectionName={artifactMainStat}
            onChange={this.updateSelection}
            component={artifactMainStatInputComponent}
            fieldValue={this.state[artifactMainStat]}
            hideable={false}
          />
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
