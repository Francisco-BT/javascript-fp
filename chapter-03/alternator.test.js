const { alternator } = require("./alternator");

describe("alternator", () => {
  it("should call alternately function fnA and fnB", () => {
    const fnA = jest.fn();
    const fnB = jest.fn();
    const alt = alternator(fnA, fnB);

    alt();
    alt();
    alt();

    expect(fnA).toHaveBeenCalledTimes(2);
    expect(fnB).toHaveBeenCalledTimes(1);
  });
});
