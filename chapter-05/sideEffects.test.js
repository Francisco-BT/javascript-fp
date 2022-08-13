const { getRandomLetter, getRandomFileName } = require("./sideEffects");

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

describe("getRandomFileName, with an impure getRandomLetter function", function () {
  it("generates 12 letter long names", () => {
    for (let i = 0; i < 100; i++) {
      expect(getRandomFileName().length).toBe(12);
    }
  });

  it("generates names with letters A to Z, only", () => {
    for (let i = 0; i < 100; i++) {
      let n = getRandomFileName();
      for (j = 0; j < n.length; n++) {
        expect(n[j] >= "A" && n[j] <= "Z").toBe(true);
      }
    }
  });

  it("includes the right extension if provided", () => {
    const fileName1 = getRandomFileName(".pdf");
    expect(fileName1.length).toBe(16);
    expect(fileName1.endsWith(".pdf")).toBe(true);
  });

  it("doesn't include any extension if not provided", () => {
    const fileName2 = getRandomFileName();
    expect(fileName2.length).toBe(12);
    expect(fileName2.includes(".")).toBe(false);
  });
});
