import match, { normalizeTeams, denormalizeTeams } from "@/match.js";

describe("match", function() {
  // it("should work", function() {
  //   const devs = [{id: 1, prefs: [1,2]}, {id: 2, prefs: [2,1]}, {id: 3, prefs: [2,1]}];
  //   const teams = [{id: 1, qtyNeeded: 1, prefs: [1,2,3]}, {id: 2, qtyNeeded: 2, prefs: [2,1,3]}]
  //   const expected = [
  //     {id: 1, devIds:[1], qtyNeeded: 1, prefs: [1,2,3]},
  //     {id: 2, devIds:[2,3], qtyNeeded: 2, prefs: [2,1,3]}
  //   ];
  //   expect(match(devs, teams)).toEqual(expected);
  // });
  it("should work", function() {
    const teams = [
      { id: "1", qtyNeeded: 1, prefs: [1, 2, 3] },
      { id: "2", qtyNeeded: 2, prefs: [2, 1, 3] }
    ];
    const expected = [
      { id: "1", devs: [1], qtyNeeded: 1, prefs: [1, 2, 3] },
      { id: "2", devs: [1, 1], qtyNeeded: 2, prefs: [2, 1, 3] }
    ];
    expect(match(null, teams)).toEqual(expected);
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
