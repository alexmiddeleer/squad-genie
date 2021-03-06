import match, {
  normalizeTeams,
  denormalizeTeams,
  offerJoin,
  checkPref
} from "@/match.js";

describe("match", function() {
  it("should place one dev", function() {
    const devs = [{ id: "1", prefs: ["1"] }];
    const teams = [{ id: "1", qtyNeeded: 1, prefs: ["1"] }];
    const expected = [{ ...teams[0], devs: [devs[0]] }];
    expect(match(devs, teams)).toEqual(expected);
  });
  it("should place two devs on one team", function() {
    const devs = [
      { id: "1", prefs: ["1"] },
      { id: "2", prefs: ["1"] }
    ];
    const teams = [{ id: "1", qtyNeeded: 2, prefs: ["1", "2"] }];
    const expected = [{ ...teams[0], devs: [devs[0], devs[1]] }];
    expect(match(devs, teams)).toEqual(expected);
  });
  it("should place two devs on two teams", function() {
    const devs = [
      { id: "1", prefs: ["1", "2"] },
      { id: "2", prefs: ["1", "2"] }
    ];
    const teams = [
      { id: "1", qtyNeeded: 1, prefs: ["1", "2"] },
      { id: "2", qtyNeeded: 1, prefs: ["2", "1"] }
    ];
    const expected = [
      { ...teams[0], devs: [devs[0]] },
      { ...teams[1], devs: [devs[1]] }
    ];
    expect(match(devs, teams)).toEqual(expected);
  });
  it("should place two devs on two teams (swap variant)", function() {
    const devs = [
      { id: "1", prefs: ["1", "2"] },
      { id: "2", prefs: ["1", "2"] }
    ];
    const teams = [
      { id: "1", qtyNeeded: 1, prefs: ["2", "1"] },
      { id: "2", qtyNeeded: 1, prefs: ["1", "2"] }
    ];
    const expected = [
      { ...teams[0], devs: [devs[1]] },
      { ...teams[1], devs: [devs[0]] }
    ];
    expect(match(devs, teams)).toEqual(expected);
  });
  it("should place three devs on one team", function() {
    const devs = [
      { id: "1", prefs: ["1", "2", "3"] },
      { id: "1", prefs: ["1", "2", "3"] },
      { id: "2", prefs: ["1", "2", "3"] }
    ];
    const teams = [{ id: "1", qtyNeeded: 3, prefs: ["1", "2", "3"] }];
    const expected = [{ ...teams[0], devs: [devs[0], devs[1], devs[2]] }];
    expect(match(devs, teams)).toEqual(expected);
  });
  it("should place two devs on two teams (swap variant)", function() {
    const devs = [
      { id: "1", prefs: ["1", "2"] },
      { id: "2", prefs: ["1", "2"] }
    ];
    const teams = [
      { id: "1", qtyNeeded: 1, prefs: ["2", "1"] },
      { id: "2", qtyNeeded: 1, prefs: ["2", "1"] }
    ];
    const expected = [
      { ...teams[0], devs: [devs[1]] },
      { ...teams[1], devs: [devs[0]] }
    ];
    expect(match(devs, teams)).toEqual(expected);
  });
  it("should place 3 devs on two teams", function() {
    const devs = [
      { id: "1", prefs: ["1", "2"] },
      { id: "2", prefs: ["1", "2"] },
      { id: "3", prefs: ["1", "2"] }
    ];
    const teams = [
      { id: "1", qtyNeeded: 1, prefs: ["1", "2", "3"] },
      { id: "2", qtyNeeded: 2, prefs: ["1", "2", "3"] }
    ];
    const expected = [
      { ...teams[0], devs: [devs[0]] },
      { ...teams[1], devs: [devs[1], devs[2]] }
    ];
    expect(match(devs, teams)).toEqual(expected);
  });
  it("should place 3 devs on two teams (swap variant)", function() {
    const devs = [
      { id: "1", prefs: ["1", "2"] },
      { id: "2", prefs: ["1", "2"] },
      { id: "3", prefs: ["1", "2"] }
    ];
    const teams = [
      { id: "1", qtyNeeded: 1, prefs: ["3", "2", "1"] },
      { id: "2", qtyNeeded: 2, prefs: ["1", "2", "3"] }
    ];
    const expected = [
      { ...teams[0], devs: [devs[2]] },
      { ...teams[1], devs: [devs[0], devs[1]] }
    ];
    expect(match(devs, teams)).toEqual(expected);
  });
  it("should place 3 devs on two teams (swap variant 2)", function() {
    const devs = [
      { id: "1", prefs: ["1", "2"] },
      { id: "2", prefs: ["1", "2"] },
      { id: "3", prefs: ["1", "2"] }
    ];
    const teams = [
      { id: "1", qtyNeeded: 2, prefs: ["3", "2", "1"] },
      { id: "2", qtyNeeded: 1, prefs: ["1", "2", "3"] }
    ];
    const expected = [
      { ...teams[0], devs: [devs[2], devs[1]] },
      { ...teams[1], devs: [devs[0]] }
    ];
    expect(match(devs, teams)).toEqual(expected);
  });
  it("should place 3 devs on two teams (prefs variant)", function() {
    const devs = [
      { id: "1", prefs: ["2", "1"] },
      { id: "2", prefs: ["1", "2"] },
      { id: "3", prefs: ["1", "2"] }
    ];
    const teams = [
      { id: "1", qtyNeeded: 1, prefs: ["1", "2", "3"] },
      { id: "2", qtyNeeded: 2, prefs: ["1", "2", "3"] }
    ];
    const expected = [
      { ...teams[0], devs: [devs[1]] },
      { ...teams[1], devs: [devs[0], devs[2]] }
    ];
    expect(match(devs, teams)).toEqual(expected);
  });
  it("three teams", function() {
    const devs = [
      { id: "1", prefs: ["1", "2", "3"] },
      { id: "2", prefs: ["1", "2", "3"] },
      { id: "3", prefs: ["1", "2", "3"] }
    ];
    const teams = [
      { id: "1", qtyNeeded: 1, prefs: ["1", "2", "3"] },
      { id: "2", qtyNeeded: 1, prefs: ["1", "2", "3"] },
      { id: "3", qtyNeeded: 1, prefs: ["1", "2", "3"] }
    ];
    const expected = [
      { ...teams[0], devs: [devs[0]] },
      { ...teams[1], devs: [devs[1]] },
      { ...teams[2], devs: [devs[2]] }
    ];
    expect(match(devs, teams)).toEqual(expected);
  });
  it("three teams (swap variant)", function() {
    const devs = [
      { id: "1", prefs: ["1", "2", "3"] },
      { id: "2", prefs: ["1", "2", "3"] },
      { id: "3", prefs: ["1", "2", "3"] }
    ];
    const teams = [
      { id: "1", qtyNeeded: 1, prefs: ["3", "2", "1"] },
      { id: "2", qtyNeeded: 1, prefs: ["1", "2", "3"] },
      { id: "3", qtyNeeded: 1, prefs: ["1", "2", "3"] }
    ];
    const expected = [
      { ...teams[0], devs: [devs[2]] },
      { ...teams[1], devs: [devs[0]] },
      { ...teams[2], devs: [devs[1]] }
    ];
    expect(match(devs, teams)).toEqual(expected);
  });
  it("three teams (swap variant 2)", function() {
    const devs = [
      { id: "1", prefs: ["1", "2", "3"] },
      { id: "2", prefs: ["1", "2", "3"] },
      { id: "3", prefs: ["1", "2", "3"] }
    ];
    const teams = [
      { id: "1", qtyNeeded: 1, prefs: ["3", "2", "1"] },
      { id: "2", qtyNeeded: 1, prefs: ["3", "2", "1"] },
      { id: "3", qtyNeeded: 1, prefs: ["3", "2", "1"] }
    ];
    const expected = [
      { ...teams[0], devs: [devs[2]] },
      { ...teams[1], devs: [devs[1]] },
      { ...teams[2], devs: [devs[0]] }
    ];
    expect(match(devs, teams)).toEqual(expected);
  });
  it("three teams 4 devs", function() {
    const devs = [
      { id: "1", prefs: ["1", "2", "3"] },
      { id: "2", prefs: ["1", "2", "3"] },
      { id: "3", prefs: ["1", "2", "3"] },
      { id: "4", prefs: ["1", "2", "3"] }
    ];
    const teams = [
      { id: "1", qtyNeeded: 1, prefs: ["3", "2", "1", "4"] },
      { id: "2", qtyNeeded: 2, prefs: ["3", "2", "1", "4"] },
      { id: "3", qtyNeeded: 1, prefs: ["3", "2", "1", "4"] }
    ];
    const expected = [
      { ...teams[0], devs: [devs[2]] },
      { ...teams[1], devs: [devs[1], devs[0]] },
      { ...teams[2], devs: [devs[3]] }
    ];
    expect(match(devs, teams)).toEqual(expected);
  });
});

describe("normalizeTeams", function() {
  it("should return [] if input is []", function() {
    expect(normalizeTeams([])).toEqual([]);
  });
  it("should echo back [{ id: 1, qtyNeeded: 1 }]", function() {
    const input = [{ id: "1", qtyNeeded: 1 }];
    expect(normalizeTeams(input)).toEqual(input);
  });
  it("should split a team [{ id: '1', qtyNeeded: 2 }]", function() {
    const input = [{ id: "1", qtyNeeded: 2 }];
    const expected = [
      { id: "1%%%1", qtyNeeded: 2 },
      { id: "1%%%2", qtyNeeded: 2 }
    ];
    expect(normalizeTeams(input)).toEqual(expected);
  });
  it("should split multiple teams", function() {
    const input = [
      { id: "1", qtyNeeded: 1 },
      { id: "2", qtyNeeded: 2 }
    ];
    const expected = [
      { id: "1", qtyNeeded: 1 },
      { id: "2%%%1", qtyNeeded: 2 },
      { id: "2%%%2", qtyNeeded: 2 }
    ];
    expect(normalizeTeams(input)).toEqual(expected);
  });
});

describe("denormalizeTeams", function() {
  it("should return [] if input is []", function() {
    expect(denormalizeTeams([])).toEqual([]);
  });
  it("should listify the dev field", function() {
    const input = [{ id: "1", qtyNeeded: 1, dev: 5 }];
    const expected = [{ id: "1", qtyNeeded: 1, devs: [5] }];
    expect(denormalizeTeams(input)).toEqual(expected);
  });
  it("should unsplit a team", function() {
    const input = [
      { id: "1%%%1", qtyNeeded: 2, dev: 1 },
      { id: "1%%%2", qtyNeeded: 2, dev: 2 }
    ];
    const expected = [{ id: "1", qtyNeeded: 2, devs: [1, 2] }];
    expect(denormalizeTeams(input)).toEqual(expected);
  });
  it("should unsplit multiple teams", function() {
    const input = [
      { id: "1", qtyNeeded: 1, dev: 1 },
      { id: "2%%%1", qtyNeeded: 2, dev: 2 },
      { id: "2%%%2", qtyNeeded: 2, dev: 3 }
    ];
    const expected = [
      { id: "1", qtyNeeded: 1, devs: [1] },
      { id: "2", qtyNeeded: 2, devs: [2, 3] }
    ];
    expect(denormalizeTeams(input)).toEqual(expected);
  });
});

describe("offerJoin", function() {
  it("should return true if team has no dev", function() {
    expect(offerJoin(null, {})).toBeTruthy();
  });
  it("should return true if team has no dev (variant 2)", function() {
    expect(offerJoin(null, { dev: null })).toBeTruthy();
  });
  it("should return false if team has no prefs and has a dev", function() {
    expect(offerJoin({ id: 1 }, { dev: { id: 2 } })).toBeFalsy();
  });
  it("should return false if dev not found in team prefs", function() {
    expect(offerJoin({ id: 1 }, { dev: { id: 2 }, prefs: [] })).toBeFalsy();
  });
  it("should return false if dev not found in team prefs (variant 2)", function() {
    expect(offerJoin({ id: 1 }, { dev: { id: 2 }, prefs: [2] })).toBeFalsy();
  });
  it("should return true if dev in prefs and team dev is not", function() {
    expect(offerJoin({ id: 1 }, { dev: { id: 2 }, prefs: [1] })).toBeTruthy();
  });
  it("should return false if dev less preferable", function() {
    expect(offerJoin({ id: 1 }, { dev: { id: 2 }, prefs: [2, 1] })).toBeFalsy();
  });
  it("should return true if dev is more preferable", function() {
    expect(
      offerJoin({ id: 1 }, { dev: { id: 2 }, prefs: [1, 2] })
    ).toBeTruthy();
  });
});

describe("checkPref", function() {
  it("should not find team if no teams", function() {
    expect(checkPref([], { id: "1" }, "1")).toBeFalsy();
  });
  it("should find team", function() {
    expect(checkPref([{ id: "1" }], { id: "1" }, "1")).toBeTruthy();
  });
  it("should find team in normalized team", function() {
    const teams = [
      { id: "1%%%1", qtyNeeded: 2 },
      { id: "1%%%2", qtyNeeded: 2 }
    ];
    expect(checkPref(teams, { id: "1" }, "1")).toBeTruthy();
  });
  it("should find team in normalized team (variant 2)", function() {
    const teams = [
      { id: "1%%%1", qtyNeeded: 2, dev: 2 },
      { id: "1%%%2", qtyNeeded: 2 }
    ];
    expect(checkPref(teams, { id: "1" }, "1")).toEqual({
      id: "1%%%2",
      qtyNeeded: 2
    });
  });
  it("should find team in normalized team (variant 3)", function() {
    const teams = [
      { id: "1%%%1", qtyNeeded: 2, dev: { id: "1" }, prefs: ["1", "2"] },
      { id: "1%%%2", qtyNeeded: 2, prefs: ["1", "2"] }
    ];
    expect(checkPref(teams, { id: "2" }, "1")).toEqual({
      id: "1%%%2",
      qtyNeeded: 2,
      prefs: ["1", "2"]
    });
  });
  it("should find team in multiple teams", function() {
    const teams = [
      { id: "2", qtyNeeded: 1 },
      { id: "1%%%1", qtyNeeded: 2, dev: { id: "1" }, prefs: ["1", "2"] },
      { id: "1%%%2", qtyNeeded: 2, prefs: ["1", "2"] }
    ];
    expect(checkPref(teams, { id: "2" }, "1")).toEqual({
      id: "1%%%2",
      qtyNeeded: 2,
      prefs: ["1", "2"]
    });
  });
  it("should find team in multiple teams", function() {
    const teams = [
      { id: "2%%%1", qtyNeeded: 1 },
      { id: "2%%%2", qtyNeeded: 1 },
      { id: "1%%%1", qtyNeeded: 2, dev: { id: "1" }, prefs: ["1", "2"] },
      { id: "1%%%2", qtyNeeded: 2, prefs: ["1", "2"] }
    ];
    expect(checkPref(teams, { id: "2" }, "1")).toEqual({
      id: "1%%%2",
      qtyNeeded: 2,
      prefs: ["1", "2"]
    });
  });
});
