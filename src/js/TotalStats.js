import React from "react";
import { effects } from "./utils/Effects.js";
import "../css/TotalStats.css";
import { useSelector } from "react-redux";
import { selectStats } from "../features/totalStats/totalStatsSlice.js";
import "../css/TotalStats.css";
const TotalStats = () => {
  const props = useSelector(selectStats);
  const {
    totalHP = 0,
    totalATK = 0,
    totalDEF = 0,
    totalCrit = 0,
    totalCritDMG = 0,
    totalATKSPD = 0,
    totalRecharge = 0,
    totalEM = 0,
  } = props;

  const getVal = (stat) => {
    const val = props[stat] || 0;
    return val;
  };
  const totalAtkPercent = ((totalATK / (getVal(effects.ATK) || 1)));
  const critDmgPercent =
    ((totalCrit / 100) * ((1 / (totalCrit / 100) - 1) + (1 + totalCritDMG / 100)))


  const sumEffects = (...effects) => {
    var sum = 0;
    for (const i in effects) {
      sum += getVal(effects[i]);
    }
    return sum;
  };
  const normalAttackPercent =
    100 + sumEffects(effects.Normal, effects.Total, effects.phys);
  const chargeAttackPercent =
    100 + sumEffects(effects.Charge, effects.Total, effects.phys);
  const eleNormal =
    100 + sumEffects(effects.Normal, effects.Total, effects.ele);
  const eleCharge =
    100 + sumEffects(effects.Charge, effects.Total, effects.ele);
  const Skill = 100 + sumEffects(effects.Skill, effects.Total, effects.phys);
  const Burst = 100 + sumEffects(effects.Burst, effects.Total, effects.phys);

  const atkType = {
    "P. Normal": normalAttackPercent,
    "P. Charge": chargeAttackPercent,
    "E. Normal": eleNormal,
    "E. Charge": eleCharge,
    "E. Skill": Skill,
    "E. Burst": Burst,
  };
  const tableData = {
    "Total HP": Math.floor(totalHP),
    "Total ATK": Math.floor(totalATK),
    "Total DEF": Math.floor(totalDEF),
    "Elemental Mastery": totalEM,
    "Critical Rate": `${totalCrit.toFixed(2)}%`,
    "Critical Damage": `${totalCritDMG.toFixed(2)}%`,
    "Attack Speed": `${totalATKSPD.toFixed(2)}% `,
    "Energy Recharge": `${totalRecharge.toFixed(2)}% `,
    "": null,
    "Multipliers": null,
    "ATK Multiplier": `${totalAtkPercent.toFixed(3)}x`,
    "CRIT Multiplier": `${critDmgPercent.toFixed(3)}x`,
  }
  return (
    <>
      <table className="table__table">
        <tbody>
          {Object.keys(tableData).map((rowName, index) => {
            return (
              <tr key={index}>
                <td className="table__td">{rowName}</td>
                <td className="table__td">{tableData[rowName]}</td>
              </tr>
            );
          })}

          <tr>
            <th className="table__th">Attack Type</th>
            <th className="table__th">Multiplier</th>
          </tr>
          {Object.keys(atkType).map((atkName) => (
            <tr key={atkName}>
              <td className="table__td">{atkName}</td>
              <td className="table__td">{atkType[atkName] / 100}x</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TotalStats;
