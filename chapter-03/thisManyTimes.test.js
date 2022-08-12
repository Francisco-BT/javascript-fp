const { thisManyTimes } = require("./thisManyTimes");

describe("thisManyTimes", () => {
  it("calls the function only once if limit is 1", () => {
    const limit = 1;
    const testFn = jest.fn();
    const many = thisManyTimes(testFn, limit);

    many();
    many();
    many();

    expect(testFn).toHaveBeenCalledTimes(1);
  });
});
