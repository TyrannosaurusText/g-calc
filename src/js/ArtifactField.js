import React from "react";
import { artifactSub } from "./utils/Effects.js";
import "../css/ArtifactField.css";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberFieldOnLine } from "./utils/NumberField.js";
import { updateSelection } from "./utils/UpdateSelection.js";

const artifactMainStatType = "aMainStatType";
const artifactMainStatValue = "aMainStatValue";
const artifactSubType = `aSubType`;
const artifactSubValue = `aSubValue`;

const localStorageArtifactField = "ArtifactField";
class ArtifactField extends React.Component {
  constructor(props) {
    super(props);
    var val = JSON.parse(localStorage.getItem(localStorageArtifactField));
    this.state = {
      ...val,
      mainStats: props.mainStats,
      index: props.index,
      artifactMainStatType: artifactMainStatType + "-" + props.index,
      artifactMainStatValue: artifactMainStatValue + "-" + props.index,
      artifactSubType: artifactSubType + "-" + props.index,
      artifactSubValue: artifactSubValue + "-" + props.index,
    };
  }

  onChange = (key) => (value) => {
    this.setState({ [key]: value }, () => {
      localStorage.setItem(
        localStorageArtifactField,
        JSON.stringify(this.state)
      );
    });
  };

  artifactSubField = (id) => {
    const artifactSubType = this.state.artifactSubType+`-${id}`;
    const artifactSubValue = this.state.artifactSubValue+`artifactSubValue-${id}`;
    const artifactSubFieldInputComponent = hideIfFalsyOrNone(
      this.state[artifactSubType],
      <NumberFieldOnLine
        name={"Value"}
        onChange={this.onChange(artifactSubValue)}
        defaultValue={this.state[artifactSubValue]}
      />
    );
    return (
      <SelectionValueField
        key={artifactSubType}
        array={artifactSub}
        onChange={updateSelection(this.onChange, artifactSubType)}
        defaultValue={this.state[artifactSubType]}
        component={artifactSubFieldInputComponent}
      />
    );
  };
  render = () => {
    const artifactMainStatType = this.state.artifactMainStatType
    const artifactMainStatValue = this.state.artifactMainStatValue;
    console.log(this.state);
    const artifactMainStatInputComponent = (
      <NumberFieldOnLine
        name={"Value"}
        onChange={this.onChange(artifactMainStatValue)}
        defaultValue={this.state[artifactMainStatValue]}
      />
    );
    return (
      <div className="section__artifactBody">
        Main Stat
        <div className="section__artifactMainLines">
          <SelectionValueField
            array={this.state.mainStats}
            onChange={updateSelection(this.onChange, artifactMainStatType)}
            component={artifactMainStatInputComponent}
            defaultValue={this.state[artifactMainStatType]}
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
