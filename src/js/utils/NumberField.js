import React from "react";
import "./NumberField.css";
var NumberField = (props) => {
  return (
    <input
      className={props.className || "item__fillWidth"}
      type="number"
      key={props.defaultValue}
      defaultValue={props.defaultValue === undefined ? '' : props.defaultValue}
      onBlur={(e) => {
        const value = parseFloat(e.target.value);
        props.onChange(isNaN(value) ? null : value);
      }}
    />
  );
};

var NumberFieldOnLine = (props) => (
  <>
    {props.name} <NumberField {...props} />
  </>
);

export { NumberField, NumberFieldOnLine };
