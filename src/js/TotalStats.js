import React from "react";
import AttackPowerCalc from "./AttackPowerCalc.js";
import { effects } from "./utils/Effects.js";
import "../css/TotalStats.css";
import { useDispatch, useSelector } from "react-redux";
import { selectStats } from "../features/totalStats/totalStatsSlice.js";

var TotalStats = () => {
  const state = { ...(useSelector(selectStats)) }
  console.log(state);
  var displayStats = JSON.parse(JSON.stringify(state));
  if (null == displayStats)
    return <div></div>;
  var attackPowerCalcComponent = <AttackPowerCalc {...displayStats} />;
  [
    "null",
    "None",
    effects.cr,
    effects.cd,
    effects.er,
    effects.ATKSPD,
    effects.er,
    effects.em,
    effects.HP,
    effects.PHP,
    effects.ART_HP,
    effects.ATK,
    effects.PATK,
    effects.ART_ATK,
    effects.DEF,
    effects.PDEF,
    effects.ART_DEF,
    effects.LVL,
    "EQA",
    "EQB",
    "EQC",
  ].map((key) => delete displayStats[key]);
  var {
    totalHP,
    totalATK,
    totalDEF,
    totalCrit,
    totalCritDMG,
    totalATKSPD,
    totalRecharge,
    totalEM,
    ...remainder
  } = displayStats;

  return (
    <div>
      <div>
        <div> Total HP: {totalHP}</div>
        <div> Total ATK: {totalATK}</div>
        <div> Total DEF: {totalDEF}</div>
        <div>
          {effects.em}: {totalEM}
        </div>
        <div> Critical Rate: {totalCrit}%</div>
        <div> Critical Damage: {totalCritDMG}%</div>
        <div> Attack Speed: {totalATKSPD}%</div>
        <div>
          {effects.er}: {totalRecharge}%
        </div>
        {Object.keys(remainder).map((key, index) => (
          <div key={index}>
            {key}: {remainder[key]}%
          </div>
        ))}
        {attackPowerCalcComponent}
        {/* <SelectionValueField></SelectionValueField> */}
      </div>
    </div>
  );
};

export default TotalStats;
