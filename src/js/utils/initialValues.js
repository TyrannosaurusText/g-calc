const initialDamageField = {
  TalentName: [],
  DamageType: [],
  DamageValue: [],
};
const initialCharacterField = {
  ascensionStatType: "None",
  ascensionStatValue: 0,
};
const initialArtifactField = (() => {
  var obj = {};
  Array(5)
    .fill(0)
    .map((_, index) => {
      obj[`artifactTypes-${index}`] = Array(5).fill(null);
      obj[`artifactValues-${index}`] = Array(5).fill(0);
    });
  obj[`artifactTypes-5`] = [];
  obj[`artifactValues-5`] = [];
  return obj;
})();
const initialWeaponField = {
  weaponSubstatType: "None",
  weaponPassivesType: [],
  weaponPassivesValue: [],
};
export {
  initialWeaponField,
  initialDamageField,
  initialCharacterField,
  initialArtifactField,
};
