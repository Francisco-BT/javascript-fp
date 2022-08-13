const { getRandomLetter } = require("./sideEffects");

describe("getRandomLetter", function () {
  let spy;

  beforeEach(() => {
    spy && spy.mockClear();
  });

  it("returns A for values close to 0", () => {
    spy = jest.spyOn(Math, "random").mockReturnValueOnce(0.0001);

    const letterSmall = getRandomLetter();
    expect(Math.random).toHaveBeenCalled();
    expect(letterSmall).toBe("A");
  });

  it("returns Z for values close to 1", () => {
    spy = jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0.98)
      .mockReturnValueOnce(0.999);
    const letterBig1 = getRandomLetter();
    const letterBig2 = getRandomLetter();
    expect(Math.random).toHaveBeenCalledTimes(2);
    expect(letterBig1).toBe("Z");
    expect(letterBig2).toBe("Z");
  });

  it("returns a middle letter for values around 0.5", () => {
    spy = jest.spyOn(Math, "random").mockReturnValueOnce(0.49384712);
    const letterMiddle = getRandomLetter();
    expect(Math.random).toHaveBeenCalledTimes(1);
    expect(letterMiddle.charCodeAt(0)).toBeGreaterThan("G".charCodeAt(0));
    expect(letterMiddle.charCodeAt(0)).toBeLessThan("S".charCodeAt(0));
  });
});
