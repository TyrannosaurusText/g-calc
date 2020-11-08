import React from "react";
import { artifactSub } from "./utils/Effects.js";
import "../css/ArtifactField.css";
import {
  SelectionValueField,
  hideIfFalsyOrNone,
} from "./utils/SelectionValueField.js";
import { NumberField } from "./utils/NumberField.js";
import { useDispatch, useSelector } from "react-redux";
import { selectSheet } from "../features/sheet/sheetSlice.js";
import {
  updateSheetAndStatsType,
  updateSheetAndStatsValue,
  arrayUpdater,
} from "./utils/updaters.js";

const ArtifactField = (props) => {
  props = { ...useSelector(selectSheet), ...props };
  const dispatch = useDispatch();
  const updateType = updateSheetAndStatsType(dispatch);
  const updateValue = updateSheetAndStatsValue(dispatch);
  const artifactTypesString = `artifactTypes-${props.ArtifactNum}`;
  const artifactValuesString = `artifactValues-${props.ArtifactNum}`;
  const artifactTypeValue = [artifactTypesString, artifactValuesString];
  const updateArtifactType = arrayUpdater(artifactTypeValue, updateType, props);
  const updateArtifactValue = arrayUpdater(
    artifactTypeValue,
    updateValue,
    props
  );
  const artifactSubField = (subStatIndex) => {
    const artifactSubFieldInputComponent = hideIfFalsyOrNone(
      props[artifactTypesString][subStatIndex],
      <NumberField
        name={"Value"}
        onChange={updateArtifactValue(artifactValuesString, subStatIndex)}
        defaultValue={props[artifactValuesString][subStatIndex]}
      />
    );
    return (
      <tr key={subStatIndex}>
        <td className="table__td">Line #{subStatIndex}</td>
        <td className="table__td">
          <SelectionValueField
            key={subStatIndex}
            array={artifactSub}
            onChange={updateArtifactType(artifactTypesString, subStatIndex)}
            defaultValue={props[artifactTypesString][subStatIndex]}
          />
        </td>
        <td className="table__td">{artifactSubFieldInputComponent}</td>
      </tr>
    );
  };
  const artifactMainStatInputComponent = (
    <NumberField
      name={"Value"}
      onChange={updateArtifactValue(artifactValuesString, 0)}
      defaultValue={props[artifactValuesString][0]}
    />
  );
  return (
    <table className="table__table">
      <tbody>
        <tr>
          <td className="table__td">Main Stat</td>
          <td className="table__td">
            <SelectionValueField
              array={props.mainStats}
              onChange={updateArtifactType(artifactTypesString, 0)}
              defaultValue={props[artifactTypesString][0]}
              hideable={false}
            />
          </td>
          <td className="table__td">{artifactMainStatInputComponent}</td>
        </tr>
        {Array(4)
          .fill(0)
          .map((_, index) => artifactSubField(index + 1))}
      </tbody>
    </table>
  );
};

export default ArtifactField;
