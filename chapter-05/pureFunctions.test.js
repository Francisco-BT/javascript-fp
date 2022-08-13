const { isOldEnoughPure } = require("./pureFunctions");

describe("isOldEnough", () => {
  it("is false for people younger than 18", () => {
    expect(isOldEnoughPure(1978, 1963)).toBe(false);
  });

  it("is true for people older than 18", () => {
    expect(isOldEnoughPure(1988, 1965)).toBe(true);
  });

  it("is true for people exactly 18", () => {
    expect(isOldEnoughPure(1998, 1980)).toBe(true);
  });
});
