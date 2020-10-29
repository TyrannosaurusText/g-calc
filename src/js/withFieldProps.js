import React, { useState } from "react";

const withFieldProps = (Component, FieldName) => ({ onChange, ...props }) => {
  var [count, setCount] = useState(0);
  return (
    <Component
      count={count}
      {...props[FieldName]}
      onChange={(key) => (value) => {
        const fn = onChange(FieldName)(key);
        setCount(count + 1);
        return fn(value);
      }}
    />
  );
};

export default withFieldProps;
