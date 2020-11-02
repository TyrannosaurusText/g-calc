import React from "react";
import { artifactSub } from "./utils/Effects.js";
import "../css/ArtifactField.css";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberFieldOnLine } from "./utils/NumberField.js";
import { selectSheet } from "../features/sheet/sheetSlice.js";
import { useSelector } from "react-redux";
const updateValue = () => { }
const updateType = () => { }
const ArtifactField = (props) => {
  props = { ...(useSelector(selectSheet).sheet), ...props }

  const artifactTypesString = `artifactTypes-${props.ArtifactNum}`;
  const artifactValuesString = `artifactValues-${props.ArtifactNum}`;
  const onSubstatChange = (ArtifactName, LineNumber, skipRender = false) => (
    value
  ) => {
    const effectName = props[artifactTypesString][LineNumber];
    const prevValue = props[artifactValuesString][LineNumber];
    const newFieldValue = props[ArtifactName];
    newFieldValue[LineNumber] = value;
    const params = [
      effectName,
      prevValue,
      ArtifactName,
      LineNumber,
      skipRender,
    ];
    if (ArtifactName === artifactTypesString) updateType(...params)(value);
    else updateValue(...params)(newFieldValue);
  };
  const artifactSubField = (id) => {
    const artifactSubFieldInputComponent = hideIfFalsyOrNone(
      props[artifactTypesString][id],
      <NumberFieldOnLine
        name={"Value"}
        onChange={onSubstatChange(artifactValuesString, id)}
        defaultValue={props[artifactValuesString][id]}
      />
    );
    return (
      <div key={id}>
        <SelectionValueField
          key={id}
          array={artifactSub}
          onChange={onSubstatChange(artifactTypesString, id)}
          defaultValue={props[artifactTypesString][id]}
          component={artifactSubFieldInputComponent}
        />
      </div>
    );
  };
  const artifactMainStatInputComponent = (
    <NumberFieldOnLine
      name={"Value"}
      onChange={onSubstatChange(artifactValuesString, 0)}
      defaultValue={props[artifactValuesString][0]}
    />
  );
  return (
    <div className="section__artifactBody">
      Main Stat
      <div className="section__artifactMainLines">
        <div>
          <SelectionValueField
            array={props.mainStats}
            onChange={onSubstatChange(artifactTypesString, 0)}
            component={artifactMainStatInputComponent}
            defaultValue={props[artifactTypesString][0]}
            hideable={false}
          />
        </div>
      </div>
      Sub Stats
      <div className="section__artifactSubLines">
        {Array(4)
          .fill(0)
          .map((_, index) => artifactSubField(index + 1))}
      </div>
    </div>
  );
};

export default ArtifactField;
