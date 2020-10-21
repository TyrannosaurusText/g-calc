import React from "react";
import { artifactSub } from "./utils/Effects.js";
import "../css/ArtifactField.css";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberFieldOnLine } from "./utils/NumberField.js";

const aMainStatType = "aMainStatType";
const aMainStatValue = "aMainStatValue";
const aSubType = `aSubType`;
const aSubValue = `aSubValue`;

class ArtifactField extends React.Component {
  constructor(props) {
    super(props);
    const artifactMainStatType = aMainStatType + "-" + props.index;
    this.state = {
      artifactMainStatType: artifactMainStatType,
      artifactMainStatValue: aMainStatValue + "-" + props.index,
      artifactSubType: aSubType + "-" + props.index,
      artifactSubValue: aSubValue + "-" + props.index,
      artifactMainStatType:
        props[artifactMainStatType] == undefined
          ? props.mainStats[0]
          : props[artifactMainStatType],
    };
  }

  artifactSubField = (id) => {
    const artifactSubType = this.state.artifactSubType + `-${id}`;
    const artifactSubValue = this.state.artifactSubValue + `-${id}`;
    const artifactSubFieldInputComponent = hideIfFalsyOrNone(
      this.props[artifactSubType],
      <NumberFieldOnLine
        name={"Value"}
        onChange={this.props.onChange(artifactSubValue)}
        defaultValue={this.props[artifactSubValue]}
      />
    );
    return (
      <SelectionValueField
        key={artifactSubType}
        array={artifactSub}
        onChange={this.props.onChange(artifactSubType)}
        defaultValue={this.props[artifactSubType]}
        component={artifactSubFieldInputComponent}
      />
    );
  };
  render = () => {
    const artifactMainStatType = this.state.artifactMainStatType;
    const artifactMainStatValue = this.state.artifactMainStatValue;
    const artifactMainStatInputComponent = (
      <NumberFieldOnLine
        name={"Value"}
        onChange={this.props.onChange(artifactMainStatValue)}
        defaultValue={this.props[artifactMainStatValue]}
      />
    );
    return (
      <div className="section__artifactBody">
        Main Stat
        <div className="section__artifactMainLines">
          <SelectionValueField
            array={this.props.mainStats}
            onChange={this.props.onChange(artifactMainStatType)}
            component={artifactMainStatInputComponent}
            defaultValue={this.props[artifactMainStatType]}
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
