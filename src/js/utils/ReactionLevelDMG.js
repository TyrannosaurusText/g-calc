import { Trunc } from "./Trunc.js";
const lvlConstraint = (x, out) => (x > 0 && x < 91 ? out(x) : 0);
const ol = (x) =>
  Trunc(
    0.0000556 * Math.pow(x, 4) -
    0.0046801 * Math.pow(x, 3) +
    0.2997675 * Math.pow(x, 2) +
    1.0962838 * x +
    26.4887857
  );
const ec = (x) =>
  Trunc(
    0.0000265 * Math.pow(x, 4) -
    0.0016607 * Math.pow(x, 3) +
    0.1205241 * Math.pow(x, 2) +
    1.5494266 * x +
    14.6657471
  );
const sc = (x) =>
  Trunc(
    0.0008476 * Math.pow(x, 3) -
    0.0166807 * Math.pow(x, 2) +
    1.5968103 * x +
    3.2636734
  );
const s = (x) =>
  Trunc(
    0.0009943 * Math.pow(x, 3) -
    0.0187566 * Math.pow(x, 2) +
    1.9236568 * x +
    2.0633444
  );
const rd = (x) =>
  Trunc(
    0.00000009 * Math.pow(x, 3) -
    0.0002767 * Math.pow(x, 2) +
    0.46647865 * x +
    0.19667643
  );
const vm = (x) =>
  Trunc(
    0.00000004 * Math.pow(x, 3) -
    0.00011561 * Math.pow(x, 2) +
    0.19487198 * x +
    0.07024967
  );
const c = (x) =>
  Trunc(
    0.00000006 * Math.pow(x, 3) -
    0.00018527 * Math.pow(x, 2) +
    0.3113969 * x +
    0.1159055
  );
const Overload = (x) => lvlConstraint(x, ol);
const Electrocharge = (x) => lvlConstraint(x, ec);
const Superconduct = (x) => lvlConstraint(x, sc);
const Swirl = (x) => lvlConstraint(x, s);
const EMReactionDamage = (x) => rd(x);
const EMVaportizeMelt = (x) => vm(x);
const EMCrystalize = (x) => c(x);
const EMCalc = {
  EQA: x => EMReactionDamage(x),
  EQB: x => EMVaportizeMelt(x),
  EQC: x => EMCrystalize(x),
};
export { Overload, Electrocharge, Superconduct, Swirl, EMCalc };
