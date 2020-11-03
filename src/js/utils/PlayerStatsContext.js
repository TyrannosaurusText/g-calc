import React, { useState } from "react";
import { Trunc } from "./Trunc.js";
import { effects } from "./Effects.js";
import { EMCalc } from "./ReactionLevelDMG.js";
import { useSelector } from "react-redux";
import { selectSheet } from "../../features/sheet/sheetSlice.js";

var getStats = (props) => {
  const increment = (source, value) =>
    source ? source + (value || 0) : value || 0;
  const sumStats = {};

  const { LVL, HP, DEF, ATK } = props;
  const Char = { LVL, HP, DEF, ATK };
  const { ascensionStatType, ascensionStatValue } = props;
  for (var key in Char) {
    sumStats[key] = increment(sumStats[key], Char[key]);
  }
  sumStats[ascensionStatType] = increment(
    sumStats[ascensionStatType],
    ascensionStatValue
  );
  console.log(sumStats)
  Array(6)
    .fill(0)
    .forEach((_, artifactIndex) => {
      const aTypes = `artifactTypes-${artifactIndex}`;
      const aVals = `artifactValues-${artifactIndex}`;
      const artifactType = props[aTypes];
      const artifactValue = props[aVals];
      for (var index = 0; index < artifactType.length; index++) {
        sumStats[artifactType[index]] = increment(
          sumStats[artifactType[index]],
          artifactValue[index]
        );
      }
    });
  sumStats[props.weaponSubstatType] = increment(
    sumStats[props.weaponSubstatType],
    props.weaponSubstatValue
  );
  const { weaponPassivesType, weaponPassivesValue } = props;
  for (var index = 0; index < weaponPassivesType.length; index++) {
    sumStats[weaponPassivesType[index]] = increment(
      sumStats[weaponPassivesType[index]],
      weaponPassivesValue[index]
    );
  }
  return calcTotals(sumStats);
};
const calcTotals = (state) => {
  const calcStat = (stat) => {
    const base = getVal(stat) || 0;
    const percent = getVal("%" + stat) / 100;
    const flat = getVal("+" + stat) || 0;
    return Trunc(base * (1 + percent) + flat);
  };
  const getVal = (stat) => {
    return state[stat] || 0;
  };
  state.totalHP = calcStat(effects.HP);
  state.totalATK = calcStat(effects.ATK);
  state.totalDEF = calcStat(effects.DEF);
  state.totalCrit = Math.min(100, 5 + getVal(effects.cr));
  state.totalEM = getVal(effects.em);
  state.totalCritDMG = 50 + getVal(effects.cd);
  state.totalATKSPD = 100 + getVal(effects.ATKSPD);
  state.totalRecharge = 100 + getVal(effects.er);
  var EMPercent = EMCalc(getVal(effects.em));
  for (var eq in EMPercent) {
    state[eq] = EMPercent[eq];
  }
  return state;
};
const PlayerStatsContext = React.createContext(undefined);

const PlayerStats = ({ children }) => {
  const props = { ...(useSelector(selectSheet).sheet) }
  console.log(props);
  // const [state, setState] = useState(calcTotals());
  // const updateValue = (field) => (
  //   effectName,
  //   prevValue,
  //   fieldInputName,
  //   index = -1,
  //   skipRender = false
  // ) => (value) => {
  //   const newState = state;
  //   const newValue = index >= 0 ? value[index] : value;
  //   newState[effectName] = state[effectName] - prevValue + newValue;
  //   if (!skipRender) setState(calcTotals(newState));
  //   props.onChange(field)(fieldInputName)(value);
  // };
  // const updateType = (field) => (
  //   effectName,
  //   prevValue,
  //   fieldInputName,
  //   index = -1,
  //   skipRender = false
  // ) => (value) => {
  //   const newState = state;
  //   const newValue = index >= 0 ? value[index] : value;
  //   newState[effectName] = state[effectName] - prevValue;
  //   newState[effectName] = state[newValue] + prevValue;
  //   if (!skipRender) setState(calcTotals(newState));
  //   props.onChange(field)(fieldInputName)(value);
  // };
  // const data = { state, updateType, updateValue };
  const data = getStats(props);
  console.log(data)
  return (
    <PlayerStatsContext.Provider value={data}>
      {children}
    </PlayerStatsContext.Provider>
  );
};

export { PlayerStats, PlayerStatsContext };
