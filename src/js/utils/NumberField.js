import React from "react";

var NumberField = (props) => {
  return (
    <input
      type="number"
      defaultValue={props.defaultValue}
      onBlur={(e) => props.onChange(e.target.value)}
    />
  );
};

var NumberFieldOnLine = (props) => (
  <>
    {props.name} <NumberField {...props} />
  </>
);

export { NumberField, NumberFieldOnLine };