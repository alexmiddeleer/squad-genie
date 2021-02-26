import { cloneDeep } from "lodash";

// This will need to be called separately for each role.
//
// devs = devs who fulfill the given role being filled.
// example: [{id: 1, prefs: [1,2]}, {id: 2, prefs: [2,1]}, {id: 3, prefs: [2,1]}]
// teams = teams that need the given role being filled.
// example: [{id: 1, qtyNeeded: 1, prefs: [1,2,3]}, {id: 2, qtyNeeded: 2, prefs: [2,1,3]}]
// example result (no offered swaps would be accepted):
// [{id: 1, devIds:[1]}, {id: 2, devIds:[2,3]}]
// Impl. note: Splits teams that needs N devs into N different teams and joins them at the end
export default function match(devs, teams) {
  teams = normalizeTeams(cloneDeep(teams));
  const unmatched = cloneDeep(devs);
  let iterations = 0;
  while (unmatched.length) {
    iterations++;
    if (iterations > 1000000) {
      alert(
        "failed to find stable match after 1000000 iterations, check input"
      );
      break;
    }

    const dev = unmatched.pop();
    for (let pref of dev.prefs) {
      const newTeam = checkPref(teams, dev, pref);
      if (newTeam) {
        if (newTeam.dev) {
          const dropped = newTeam.dev;
          unmatched.push(dropped);
        }
        newTeam.dev = dev;
        break;
      }
    }
  }
  return denormalizeTeams(teams);
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

export function offerJoin(dev, team) {
  if (!team.dev) {
    return true;
  }
  if (!team.prefs || !team.prefs.length) {
    return false;
  }
  const prefOrderDev = team.prefs.indexOf(dev.id);
  if (prefOrderDev < 0) {
    return false;
  }
  const prefOrderTeamDev = team.prefs.indexOf(team.dev.id);
  if (prefOrderTeamDev < 0) {
    return true;
  }
  return prefOrderDev < prefOrderTeamDev;
}

export function checkPref(teams, dev, pref) {
  return teams.find(t => {
    return t.id.split(delimiter).shift() === pref && offerJoin(dev, t);
  });
}
