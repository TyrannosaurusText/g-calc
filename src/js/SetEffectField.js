import React from "react";
import { setEffects } from "./utils/Effects.js";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberFieldOnLine } from "./utils/NumberField.js";
import { Button } from "./utils/Button.js";
const artifactSetType = "artifactTypes-5";
const artifactSetValue = "artifactValues-5";

class SetEffectField extends React.Component {
  constructor(props) {
    super(props);
    var artifactPassiveID = Array(props[artifactSetType].length)
      .fill(0)
      .map((_, index) => index);
    this.state = {
      artifactPassiveID: artifactPassiveID,
      counter: artifactPassiveID.length,
    };
  }

  PassiveInput = (id, index) => {
    var onPassiveChange = (key, index) => (value) => {
      var passives = this.props[key];
      passives[index] = value;
      this.props.onChange(key)(passives);
    };
    const PassiveInputComponent = (
      <>
        {hideIfFalsyOrNone(
          this.props[artifactSetType][index],
          <NumberFieldOnLine
            onChange={onPassiveChange(artifactSetValue, index)}
            defaultValue={this.props[artifactSetValue][index]}
          />
        )}
        <Button onClick={() => this.RemoveEffect(index)}>Remove</Button>
      </>
    );
    return (
      <SelectionValueField
        key={id}
        selectionName={artifactSetType}
        onChange={onPassiveChange(artifactSetType, index)}
        array={setEffects}
        component={PassiveInputComponent}
        defaultValue={this.props[artifactSetType][index]}
      />
    );
  };

  AddEffect = () => {
    var ids = this.state.artifactPassiveID;
    var type = this.props[artifactSetType];
    var value = this.props[artifactSetValue];
    ids.push(this.state.counter);
    type.push("None");
    value.push(0);
    this.setState({
      artifactPassiveID: ids,
      counter: this.state.counter + 1,
    });
    this.props.onChange(artifactSetType)(type);
    this.props.onChange(artifactSetValue)(value);
  };

  RemoveEffect = (index) => {
    var ids = this.state.artifactPassiveID;
    var type = this.props[artifactSetType];
    var value = this.props[artifactSetValue];
    ids.splice(index, 1);
    type.splice(index, 1);
    value.splice(index, 1);
    this.setState({ artifactPassiveID: ids });
    this.props.onChange(artifactSetType)(type);
    this.props.onChange(artifactSetValue)(value);
  };

  render = () => {
    return (
      <div>
        <div>
          Passive Set Effects
          <Button onClick={() => this.AddEffect()}>Add Passive</Button>
        </div>
        <div>
          <div>
            {this.state.artifactPassiveID
              ? this.state.artifactPassiveID.map((id, index) => {
                  return this.PassiveInput(id, index);
                })
              : null}
          </div>
        </div>
      </div>
    );
  };
}

export default SetEffectField;
