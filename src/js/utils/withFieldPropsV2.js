import React, { useContext, useState } from "react";
import { PlayerStatsContext } from "./PlayerStatsContext.js";

const withFieldPropsV2 = (Component, FieldName) => (props) => {
  var [count, setCount] = useState(0);
  const { updateValue, updateType } = useContext(PlayerStatsContext);
  return (
    <Component
      count={count}
      {...props[FieldName]}
      updateValue={(...args) => (...args2) => {
        setCount(count + 1);
        return updateValue(FieldName)(...args)(...args2);
      }}
      updateType={(...args) => (...args2) => {
        setCount(count + 1);
        return updateType(FieldName)(...args)(...args2);
      }}
    />
  );
};

export default withFieldPropsV2;
