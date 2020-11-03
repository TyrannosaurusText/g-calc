import React from "react";
import {
  SelectionValueField,
} from "./utils/SelectionValueField.js";
import { NumberField } from "./utils/NumberField.js";
import { MultiField, addEffect, removeEffect } from "./utils/MultiField.js";
import { useSelector } from "react-redux";
import { selectSheet } from "../features/sheet/sheetSlice.js";

const TalentName = "TalentName";
const SetTypeStr = "DamageType";
const SetValueStr = "DamageValue";
const DamageField = () => {
  const props = { ...(useSelector(selectSheet).sheet) }
  props.onChange = () => { };

  const add = () => {
    var keys = [TalentName, SetTypeStr, SetValueStr];
    var vals = [undefined, "Phys. Normal", undefined];
    keys.forEach((name, index) => {
      addEffect(props, name, props.onChange, vals[index]);
    });
  };
  const remove = (index) => {
    var keys = [TalentName, SetTypeStr, SetValueStr];
    keys.forEach((name) => {
      removeEffect(props, name, props.onChange, index);
    });
  };
  const PassiveInput = ({ id, index }) => {
    var onValueChange = (key, index) => (value) => {
      var passives = props[key];
      passives[index] = value;
      props.onChange(key)(passives);
    };
    return (
      <div key={id}>
        Skill Name:
        <input
          type={"text"}
          defaultValue={props[TalentName][index]}
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
                defaultValue={props[SetValueStr][index]}
              />
            </>
          }
          defaultValue={"Phys. Normal"}
        />
      </div>
    );
  };
  const monsterLevelStr = "monsterLevelStr";
  const monsterResStr = "monsterLevelStr";
  // const monsterDamageReduction =
  //   (props[monsterResStr] * (100 + props[monsterLevelStr])) /
  //   (100 + props[characterLevel]);
  return (
    <div>
      Monster Level:
      <NumberField
        onChange={props.onChange(monsterLevelStr)}
        defaultValue={props[monsterLevelStr]}
      />
        Monster Res:
      <NumberField
        onChange={props.onChange(monsterResStr)}
        defaultValue={props[monsterResStr]}
      />
      {/* Total Damage Reduction: {monsterDamageReduction} */}
      <MultiField
        initialLength={props[TalentName].length}
        component={PassiveInput}
        addEffect={add}
        removeEffect={remove}
      />
    </div>
  );
}

export default DamageField;
