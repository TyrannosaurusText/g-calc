import React from "react";
import AttackPowerCalc from "./AttackPowerCalc.js";
import { effects } from "./utils/Effects.js";
import "../css/TotalStats.css";
import { Trunc } from "./utils/Trunc.js";
class TotalStats extends React.Component {
  getStats = (props) => {
    const { WeaponField, ArtifactField, CharacterField } = props.data;
    if (null == WeaponField || null == ArtifactField || null == CharacterField)
      return null;
    var calcStat = (stat) => {
      var base = getVal(stat) || 0;
      var percent = getVal("%" + stat) / 100;
      var flat = getVal("+" + stat) || 0;
      return Trunc(base * (1 + percent) + flat);
    };
    var getVal = (stat) => {
      var val = sumStats[stat] || 0;
      return val;
    };
    var sumStats = {};
    var increment = (source, value) =>
      source ? source + (value || 0) : value || 0;
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
    sumStats.totalHP = calcStat(effects.HP);
    sumStats.totalATK = calcStat(effects.ATK);
    sumStats.totalDEF = calcStat(effects.DEF);
    sumStats.totalCrit = Math.min(100, 5 + getVal(effects.cr));
    sumStats.totalEM = getVal(effects.em);
    sumStats.totalCritDMG = 50 + getVal(effects.cd);
    sumStats.totalATKSPD = 100 + getVal(effects.ATKSPD);
    sumStats.totalRecharge = 100 + getVal(effects.er);
    var EMCalc = (x) => ({
      EQA:
        Trunc(0.00000009 * Math.pow(x, 3) -
        0.0002767 * Math.pow(x, 2) +
        0.46647865 * x +
        0.19667643),
      EQB:
        Trunc(0.00000004 * Math.pow(x, 3) -
        0.00011561 * Math.pow(x, 2) +
        0.19487198 * x +
        0.07024967),
      EQC:
        Trunc(0.00000006 * Math.pow(x, 3) -
        0.00018527 * Math.pow(x, 2) +
        0.3113969 * x +
        0.1159055),
    });
    var EMPercent = EMCalc(getVal(effects.em));
    for (var eq in EMPercent) {
      sumStats[eq] = EMPercent[eq];
    }
    return sumStats;
  };

  render = () => {
    var allStats = this.getStats(this.props);
    if (null == allStats) return <div></div>;
    var displayStats = JSON.parse(JSON.stringify(allStats));
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
      ...displayStats
    } = displayStats;

    return (
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
        {Object.keys(displayStats).map((key, index) => (
          <div key={index}>
            {key}: {displayStats[key]}%
          </div>
        ))}
        {attackPowerCalcComponent}
        {/* <SelectionValueField></SelectionValueField> */}
      </div>
    );
  };
}

export default TotalStats;
