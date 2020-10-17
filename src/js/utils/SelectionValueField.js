import React, { Fragment } from "react";
import { longestArtifactName } from "./Effects.js";

var SelectionValueField = (props) => {
  var { onChange, array, component, defaultValue } = props;
  return (
    <div>
      <select
        defaultValue={defaultValue}
        onChange={(e) => onChange(e.target.value)}
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
      </select>
      {component}
    </div>
  );
};

var hideIfFalsyOrNone = (val, component) => {
  return val == undefined || val.localeCompare("None") === 0 ? <Fragment/> : component
};

export { SelectionValueField, hideIfFalsyOrNone };
