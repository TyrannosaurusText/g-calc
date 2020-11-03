import React from "react";
import { artifactSub } from "./utils/Effects.js";
import "../css/ArtifactField.css";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberFieldOnLine } from "./utils/NumberField.js";
import { useDispatch, useSelector } from "react-redux";
import { selectSheet } from "../features/sheet/sheetSlice.js";
import { updateSheetAndStatsType, updateSheetAndStatsValue, arrayUpdater } from './utils/updaters.js'

const ArtifactField = (props) => {
  props = { ...(useSelector(selectSheet)), ...props }
  const dispatch = useDispatch();
  const updateType = updateSheetAndStatsType(dispatch);
  const updateValue = updateSheetAndStatsValue(dispatch);
  const artifactTypesString = `artifactTypes-${props.ArtifactNum}`;
  const artifactValuesString = `artifactValues-${props.ArtifactNum}`;
  const artifactTypeValue = [artifactTypesString, artifactValuesString];
  const updateArtifactType = arrayUpdater(artifactTypeValue, updateType, props);
  const updateArtifactValue = arrayUpdater(artifactTypeValue, updateValue, props);
  const artifactSubField = (subStatIndex) => {
    const artifactSubFieldInputComponent = hideIfFalsyOrNone(
      props[artifactTypesString][subStatIndex],
      <NumberFieldOnLine
        name={"Value"}
        onChange={updateArtifactValue(artifactValuesString, subStatIndex)}
        defaultValue={props[artifactValuesString][subStatIndex]}
      />
    );
    return (
      <div key={subStatIndex}>
        <SelectionValueField
          key={subStatIndex}
          array={artifactSub}
          onChange={updateArtifactType(artifactTypesString, subStatIndex)}
          defaultValue={props[artifactTypesString][subStatIndex]}
          component={artifactSubFieldInputComponent}
        />
      </div>
    );
  };
  const artifactMainStatInputComponent = (
    <NumberFieldOnLine
      name={"Value"}
      onChange={updateArtifactValue(artifactValuesString, 0)}
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
            onChange={updateArtifactType(artifactTypesString, 0)}
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
