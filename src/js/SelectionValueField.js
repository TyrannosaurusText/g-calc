import React from "react";
import {longestArtifactName} from "./Effects.js"

var SelectionValueField = (props) => {
  var {
    selectionName,
    onChange,
    array,
    fieldValue,
    component,
    defaultValue,
    hideable = true,
  } = props;
  console.log(defaultValue)
  //TODO: fix default value
  return (
    <div>
      <select
        id={selectionName}
        defaultValue={defaultValue}
        onChange={onChange(selectionName)}
      >
        {array.map((arrayName) => {
          return (
            <option key={arrayName} value={arrayName}>
              {arrayName}
            </option>
          );
        })}
        <option hidden>{longestArtifactName}</option>
        {/* Just to keep selection field lengths consistent. */}
      </select>{" "}
      {true === hideable && fieldValue === undefined ? <></> : <>{component}</>}
    </div>
  );
};

export { SelectionValueField };
