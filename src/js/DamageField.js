import React from "react";
import { Button } from "./utils/Button.js";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { DamageFieldName } from "./Names.js";
import { NumberField } from "./utils/NumberField.js";
import { MultiField, addEffect, removeEffect } from "./utils/MultiField.js";
import withFieldProps from "./utils/withFieldProps.js";

const TalentName = "TalentName";
const SetTypeStr = "DamageType";
const SetValueStr = "DamageValue";
class DamageField extends React.Component {
  constructor(props) {
    super(props);
  }
  setView = (view) => {
    this.setState({ view: view });
  };

  add = () => {
    var keys = [TalentName, SetTypeStr, SetValueStr];
    var vals = [undefined, "Phys. Normal", undefined];
    keys.map((name, index) => {
      addEffect(this.props, name, this.props.onChange, vals[index]);
    });
  };
  remove = (index) => {
    var keys = [TalentName, SetTypeStr, SetValueStr];
    keys.map((name) => {
      removeEffect(this.props, name, this.props.onChange, index);
    });
  };
  PassiveInput = (props) => {
    const { id, index } = props;
    var onValueChange = (key, index) => (value) => {
      var passives = this.props[key];
      passives[index] = value;
      this.props.onChange(key)(passives);
    };
    return (
      <div key={id}>
        Skill Name:
        <input
          type={"text"}
          defaultValue={this.props[TalentName][index]}
          onBlur={(e) => onValueChange(TalentName, index)(e.target.value)}
        ></input>
        Skill Type:
        <SelectionValueField
          array={[
            "Phys. Normal",
            "Phys. Charge",
            "Ele. Normal",
            "Ele. Charge",
            "Ele Skill",
            "Ele Burst",
          ]}
          onChange={onValueChange(SetTypeStr, index)}
          component={
            <>
              Skill Damage (%):
              <NumberField
                onChange={onValueChange(SetValueStr, index)}
                defaultValue={this.props[SetValueStr][index]}
              />
            </>
          }
          defaultValue={"Phys. Normal"}
        />
      </div>
    );
    return (
      <SelectionValueField
        key={id}
        selectionName={SetTypeStr}
        onChange={onPassiveChange(SetTypeStr, index)}
        array={setEffects}
        component={PassiveInputComponent}
        defaultValue={this.props[SetTypeStr][index]}
      />
    );
  };
  render = () => {
    const monsterLevelStr = "monsterLevelStr";
    const monsterResStr = "monsterLevelStr";
    const monsterDamageReduction = this.props[monsterResStr] * (100+this.props[monsterLevelStr])/(100+this.props[])
    return (
      <div>
        Monster Level:
        <NumberField
          onChange={this.props.onChange(monsterLevelStr)}
          defaultValue={this.props[monsterLevelStr]}
        />
        Monster Res:
        <NumberField
          onChange={this.props.onChange(monsterResStr)}
          defaultValue={this.props[monsterResStr]}
        />
        Total Damage Reduction: {monsterDamageReduction}
        <MultiField
          initialLength={this.props[TalentName].length}
          component={this.PassiveInput}
          addEffect={this.add}
          removeEffect={this.remove}
        />
      </div>
    );
  };
}

export default withFieldProps(DamageField, DamageFieldName);
