import React from "react";
import { artifactSub } from "./utils/Effects.js";
import "../css/ArtifactField.css";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberFieldOnLine } from "./utils/NumberField.js";
import withFieldProps from "./withFieldProps.js";
import { ArtifactFieldName } from "./Names.js";

class ArtifactField extends React.PureComponent {
  constructor(props) {
    super(props);
    const artifactTypesString = `artifactTypes-${props.ArtifactNum}`;
    const artifactValuesString = `artifactValues-${props.ArtifactNum}`;
    if (props[artifactTypesString][0] == undefined)
      props[artifactTypesString][0] = props.mainStats[0];
    this.state = {
      artifactTypesString,
      artifactValuesString,
    };
  }
  onSubstatChange = (ArtifactName, LineNumber) => (value) => {
    var substat = this.props[ArtifactName];
    substat[LineNumber] = value;
    this.props.onChange(ArtifactName)(substat);
  };
  artifactSubField = (id) => {
    const artifactSubType = this.state.artifactTypesString;
    const artifactSubValue = this.state.artifactValuesString;

    const artifactSubFieldInputComponent = hideIfFalsyOrNone(
      this.props[artifactSubType][id],
      <NumberFieldOnLine
        name={"Value"}
        onChange={this.onSubstatChange(artifactSubValue, id)}
        defaultValue={this.props[artifactSubValue][id]}
      />
    );
    return (
      <div key={id}>
        <SelectionValueField
          key={id}
          array={artifactSub}
          onChange={this.onSubstatChange(artifactSubType, id)}
          defaultValue={this.props[artifactSubType][id]}
          component={artifactSubFieldInputComponent}
        />
      </div>
    );
  };
  render = () => {
    const artifactMainStatType = this.state.artifactTypesString;
    const artifactMainStatValue = this.state.artifactValuesString;
    const artifactMainStatInputComponent = (
      <NumberFieldOnLine
        name={"Value"}
        onChange={this.onSubstatChange(artifactMainStatValue, 0)}
        defaultValue={this.props[artifactMainStatValue][0]}
      />
    );
    return (
      <div className="section__artifactBody">
        Main Stat
        <div className="section__artifactMainLines">
          <div>
            <SelectionValueField
              array={this.props.mainStats}
              onChange={this.onSubstatChange(artifactMainStatType, 0)}
              component={artifactMainStatInputComponent}
              defaultValue={this.props[artifactMainStatType][0]}
              hideable={false}
            />
          </div>
        </div>
        Sub Stats
        <div className="section__artifactSubLines">
          {Array(4)
            .fill(0)
            .map((_, index) => this.artifactSubField(index + 1))}
        </div>
      </div>
    );
  };
}

export default withFieldProps(ArtifactField, ArtifactFieldName);
