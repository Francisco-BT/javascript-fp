const {
  isOldEnoughPure,
  roundFixPure,
  getRandomLetterPure,
  getRandomFileNamePure,
} = require("./pureFunctions");

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

describe("roundFixPure", () => {
  it("should round 3.14159 to 3 if differences are 0", () => {
    const { a, r } = roundFixPure(0.0, 3.14159);
    expect(a).toBeCloseTo(0.14159);
    expect(r).toBe(3);
  });

  it("should round 2.71828 to 3 if differences are 0.14159", () => {
    const { a, r } = roundFixPure(0.14159, 2.71828);
    expect(a).toBeCloseTo(-0.14013);
    expect(r).toBe(3);
  });

  it("should round 2.71828 to 2 if differences are -0.14013", () => {
    const { a, r } = roundFixPure(-0.14013, 2.71828);
    expect(a).toBeCloseTo(0.57815);
    expect(r).toBe(2);
  });

  it("should round 3.14159 to 4 if differences are 0.57815", () => {
    const { a, r } = roundFixPure(0.57815, 3.14159);
    expect(a).toBeCloseTo(-0.28026);
    expect(r).toBe(4);
  });
});

describe("getRandomLetterPure", function () {
  it("returns A for values close to 0", () => {
    const letterSmall = getRandomLetterPure(() => 0.0001);
    expect(letterSmall).toBe("A");
  });

  it("returns Z for values close to 1", () => {
    const letterBig = getRandomLetterPure(() => 0.99999);
    expect(letterBig).toBe("Z");
  });

  it("returns a middle letter for values around 0.5", () => {
    const letterMiddle = getRandomLetterPure(() => 0.49384712);
    expect(letterMiddle.charCodeAt(0)).toBeGreaterThan("G".charCodeAt(0));
    expect(letterMiddle.charCodeAt(0)).toBeLessThan("S".charCodeAt(0));
  });

  it("returns an ascending sequence of letters for ascending values", () => {
    const a = [0.09, 0.22, 0.6];
    const f = () => a.shift(); // impure!!

    const letter1 = getRandomLetterPure(f);
    const letter2 = getRandomLetterPure(f);
    const letter3 = getRandomLetterPure(f);
    expect(letter1.charCodeAt(0)).toBeLessThan(letter2.charCodeAt(0));
    expect(letter2.charCodeAt(0)).toBeLessThan(letter3.charCodeAt(0));
  });
});

describe("getRandomFileNamePure", function () {
  let a = [];
  const f = () => a.shift();

  beforeEach(() => {
    a = "SORTOFRANDOM".split("");
  });

  it("uses the given letters for the file name", () => {
    const fileName = getRandomFileNamePure("", f);
    expect(fileName.startsWith("SORTOFRANDOM")).toBe(true);
  });

  it("includes the right extension, and has the right length", () => {
    const fileName = getRandomFileNamePure(".pdf", f);
    expect(fileName.endsWith(".pdf")).toBe(true);
    expect(fileName.length).toBe(16);
  });
});
