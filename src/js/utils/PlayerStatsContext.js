import React, { useState } from "react";
import { Trunc } from "./Trunc.js";
import { effects } from "./Effects.js";
import { EMCalc } from "./ReactionLevelDMG.js";

var getStats = (props) => {
  const { WeaponField, ArtifactField, CharacterField } = props;
  if (null == WeaponField || null == ArtifactField || null == CharacterField)
    return null;
  var increment = (source, value) =>
    source ? source + (value || 0) : value || 0;
  var sumStats = {};

  var { ascensionStatType, ascensionStatValue, ...Char } = CharacterField;
  for (var key in Char) {
    sumStats[key] = increment(sumStats[key], Char[key]);
  }
  sumStats[ascensionStatType] = increment(
    sumStats[ascensionStatType],
    ascensionStatValue
  );
  Array(6)
    .fill(0)
    .map((_, artifactIndex) => {
      var aTypes = `artifactTypes-${artifactIndex}`;
      var aVals = `artifactValues-${artifactIndex}`;
      var artifactType = ArtifactField[aTypes];
      var artifactValue = ArtifactField[aVals];
      for (var index = 0; index < artifactType.length; index++) {
        sumStats[artifactType[index]] = increment(
          sumStats[artifactType[index]],
          artifactValue[index]
        );
      }
    });
  sumStats[WeaponField.weaponSubstatType] = increment(
    sumStats[WeaponField.weaponSubstatType],
    WeaponField.weaponSubstatValue
  );
  var { weaponPassivesType, weaponPassivesValue } = WeaponField;
  for (var index = 0; index < weaponPassivesType.length; index++) {
    sumStats[weaponPassivesType[index]] = increment(
      sumStats[weaponPassivesType[index]],
      weaponPassivesValue[index]
    );
  }
  return sumStats;
};
const calcTotals = (state) => {
  var calcStat = (stat) => {
    var base = getVal(stat) || 0;
    var percent = getVal("%" + stat) / 100;
    var flat = getVal("+" + stat) || 0;
    return Trunc(base * (1 + percent) + flat);
  };
  var getVal = (stat) => {
    var val = state[stat] || 0;
    return val;
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

const PlayerStats = ({ children, ...props }) => {
  const [state, setState] = useState(calcTotals(getStats(props)));
  const updateValue = (field) => (
    effectName,
    prevValue,
    fieldInputName,
    index = -1,
    skipRender = false
  ) => (value) => {
    const newState = state;
    const newValue = index >= 0 ? value[index] : value;
    newState[effectName] = state[effectName] - prevValue + newValue;
    if (!skipRender) setState(calcTotals(newState));
    props.onChange(field)(fieldInputName)(value);
  };
  const updateType = (field) => (
    effectName,
    prevValue,
    fieldInputName,
    index = -1,
    skipRender = false
  ) => (value) => {
    const newState = state;
    const newValue = index >= 0 ? value[index] : value;
    newState[effectName] = state[effectName] - prevValue;
    newState[effectName] = state[newValue] + prevValue;
    if (!skipRender) setState(calcTotals(newState));
    props.onChange(field)(fieldInputName)(value);
  };
  const data = { state, updateType, updateValue };
  return (
    <PlayerStatsContext.Provider value={data}>
      {children}
    </PlayerStatsContext.Provider>
  );
};

export { PlayerStats, PlayerStatsContext };
