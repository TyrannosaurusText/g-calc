import { createSlice } from '@reduxjs/toolkit';
import { Trunc } from "../../js/utils/Trunc.js";
import { effects } from "../../js/utils/Effects.js";
import { EMCalc } from "../../js/utils/ReactionLevelDMG.js";

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

export const totalStatsSlice = createSlice({
    name: 'stats',
    initialState: {},
    reducers: {
        calcDelta: (state, action) => {
            console.log(action.payload)
            const { oldType, oldValue, newType, newValue } = action.payload
            if (oldType)
                state[oldType] = (state[oldType] || 0) - (oldValue || 0);
            state[newType] = (state[newType] || 0) + (newValue || 0);
            const newTotals = calcTotals(state)
            for (var key in newTotals)
                state[key] = newTotals[key]
        },
        calcStats: (state, action) => {
            const stats = getStats(action.payload)
            for (var key in stats) {
                state[key] = stats[key];
            }
        }
    },
});

export const { calcDelta, calcStats } = totalStatsSlice.actions;
export const selectStats = state => state.stats;
export default totalStatsSlice.reducer;
