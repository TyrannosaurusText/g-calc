import { Trunc } from "./Trunc.js";
const validate = (x, out) => (x > 0 && x < 91 ? out(x) : 0);
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
const Overload = (x) => validate(x, ol);
const Electrocharge = (x) => validate(x, ec);
const Superconduct = (x) => validate(x, sc);
const Swirl = (x) => validate(x, s);
const EMReactionDamage = (x) => validate(x, rd);
const EMVaportizeMelt = (x) => validate(x, vm);
const EMCrystalize = (x) => validate(x, c);
const EMCalc = (x) => ({
  EQA: EMReactionDamage(x),
  EQB: EMVaportizeMelt(x),
  EQC: EMCrystalize(x),
});
export { Overload, Electrocharge, Superconduct, Swirl, EMCalc };
