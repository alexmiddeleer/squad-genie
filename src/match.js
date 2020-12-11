import { cloneDeep } from "lodash";

// devs = devs who fulfill the given role being filled.
// example: [{id: 1, prefs: [1,2]}, {id: 2, prefs: [2,1]}, {id: 3, prefs: [2,1]}]
// teams = teams that need the given role being filled.
// example: [{id: 1, qtyNeeded: 1, prefs: [1,2,3]}, {id: 2, qtyNeeded: 2, prefs: [2,1,3]}]
// example result (no offered swaps would be accepted):
// [{id: 1, devIds:[1]}, {id: 2, devIds:[2,3]}]
export default function match(devs, teams) {
  devs = cloneDeep(devs);
  teams = cloneDeep(teams);

  // if (isStable(teams)) {

  // }

  return cloneDeep([{}]);
}
