var effects = {
    phys : "Phys. DMG %",
    ele : "Elemental DMG %",
    em: "Elemental Mastery",
    cr: "Crit Rate (%)",
    cd: "Crit DMG (%)",
    er: "Energy Recharge (%)",
    ATK: "ATK",
    HP: "HP",
    DEF: "DEF",
    PATK: "%ATK",
    PDEF: "%DEF",
    PHP: "%HP",
    healb: "Healing Bonus",
    None: "None"
}

var generalSubs = [
    effects.cr,
    effects.cd,
    effects.er,
    effects.em,
    effects.PATK,
    effects.PDEF,
    effects.PHP
];
var artifactMain = [ effects.em, effects.PATK, effects.PHP, effects.PDEF ];
var flowerMain = [effects.HP];
var plumeMain = [effects.ATK];
var sandsMain = [effects.er].concat(artifactMain);
var gobletMain = [effects.ele, effects.phys].concat(artifactMain);
var circletMain = [effects.cr, effects.cd, effects.healb].concat(artifactMain);
var weaponSub = [effects.None, effects.phys].concat(generalSubs);
var characterAscensionStat = weaponSub;
var characterStats = [effects.HP, effects.DEF, effects.ATK];
var weaponPassives = [effects.None, effects.ele, effects.phys].concat(generalSubs);
var artifactSub = [effects.None].concat(characterStats).concat(generalSubs);

export { weaponSub, characterAscensionStat, characterStats, weaponPassives, artifactSub, flowerMain, plumeMain, sandsMain, gobletMain,circletMain };
