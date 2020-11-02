import React, { useState } from "react";
import { setEffects } from "./utils/Effects.js";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberFieldOnLine } from "./utils/NumberField.js";
import { Button } from "./utils/Button.js";
import { useSelector } from "react-redux";
import { selectSheet } from "../features/sheet/sheetSlice.js";
const artifactSetType = "artifactTypes-5";
const artifactSetValue = "artifactValues-5";

const SetEffectField = () => {
  const props = { ...(useSelector(selectSheet).sheet) }
  props.onChange = () => { };
  console.log(props);
  var artifactPassiveID = Array(props[artifactSetType].length)
    .fill(0)
    .map((_, index) => index);
  var [artifactPassiveID, setWPID] = useState(Array(props[artifactSetType].length));
  var [counter, setCount] = useState(0)

  const PassiveInput = (id, index) => {
    var onPassiveChange = (key, index) => (value) => {
      var passives = this.props[key];
      passives[index] = value;
      props.onChange(key)(passives);
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
      <div key={id}>
        <SelectionValueField
          selectionName={artifactSetType}
          onChange={onPassiveChange(artifactSetType, index)}
          array={setEffects}
          component={PassiveInputComponent}
          defaultValue={this.props[artifactSetType][index]}
        />
      </div>
    );
  };

  const AddEffect = () => {
    var ids = artifactPassiveID;
    var type = this.props[artifactSetType];
    var value = this.props[artifactSetValue];
    ids.push(counter);
    type.push("None");
    value.push(0);
    this.setState({
      artifactPassiveID: ids,
      counter: counter + 1,
    });
    props.onChange(artifactSetType)(type);
    props.onChange(artifactSetValue)(value);
  };

  const RemoveEffect = (index) => {
    var ids = artifactPassiveID;
    var type = this.props[artifactSetType];
    var value = this.props[artifactSetValue];
    ids.splice(index, 1);
    type.splice(index, 1);
    value.splice(index, 1);
    this.setState({ artifactPassiveID: ids });
    props.onChange(artifactSetType)(type);
    props.onChange(artifactSetValue)(value);
  };

  return (
    <div>
      <div>
        Passive Set Effects
          <Button onClick={() => this.AddEffect()}>Add Passive</Button>
      </div>
      <div>
        <div>
          {artifactPassiveID
            ? artifactPassiveID.map((id, index) => {
              return this.PassiveInput(id, index);
            })
            : null}
        </div>
      </div>
    </div>
  );
}

export default SetEffectField 
