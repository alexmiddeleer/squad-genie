import { cloneDeep } from "lodash";

// devs = devs who fulfill the given role being filled.
// example: [{id: 1, prefs: [1,2]}, {id: 2, prefs: [2,1]}, {id: 3, prefs: [2,1]}]
// teams = teams that need the given role being filled.
// example: [{id: 1, qtyNeeded: 1, prefs: [1,2,3]}, {id: 2, qtyNeeded: 2, prefs: [2,1,3]}]
// example result (no offered swaps would be accepted):
// [{id: 1, devIds:[1]}, {id: 2, devIds:[2,3]}]
// idea: split team that needs N devs into N different teams and then join them at the end
export default function match(devs, teams) {
  const unmatched = cloneDeep(devs);
  teams = cloneDeep(teams);

  teams = normalizeTeams(teams);
  teams.forEach(team => (team.dev = 1));
  return denormalizeTeams(teams);

  // while(unmatched.length) {
  //   const dev = unmatched.pop();
  //   dev.prefs.forEach(teamId => {
  //     const team = teams.find(t => t.id === teamId);
  //     if
  //   })
  // }

  return cloneDeep([{}]);
}

const delimiter = "%%%";

export function normalizeTeams(teams) {
  return teams.reduce((acc, team) => {
    if (team.qtyNeeded === 1) {
      acc.push(team);
      return acc;
    }
    for (let i = 0; i < team.qtyNeeded; i++) {
      const subteam = cloneDeep(team);
      subteam.id = `${team.id}${delimiter}${i + 1}`;
      acc.push(subteam);
    }
    return acc;
  }, []);
}

export function denormalizeTeams(teams) {
  return teams.reduce((acc, team) => {
    if (team.qtyNeeded === 1) {
      team.devs = [team.dev];
      delete team.dev;
      acc.push(team);
      return acc;
    }
    const teamId = team.id.split(delimiter).shift();
    const i = acc.findIndex(t => t.id === teamId);
    if (i > -1) {
      acc[i].devs.push(team.dev);
    } else {
      const denormalizedTeam = cloneDeep(team);
      denormalizedTeam.devs = [denormalizedTeam.dev];
      delete denormalizedTeam.dev;
      denormalizedTeam.id = teamId;
      acc.push(denormalizedTeam);
    }
    return acc;
  }, []);
}
