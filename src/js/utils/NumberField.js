import React from "react";
import "./NumberField.css"
var NumberField = (props) => {
  return (
    <input
      className="input__NumberField"
      type="number"
      defaultValue={props.defaultValue}
      onBlur={(e) => {
        e.target.value = parseFloat(e.target.value);
        props.onChange(parseFloat(e.target.value));
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
