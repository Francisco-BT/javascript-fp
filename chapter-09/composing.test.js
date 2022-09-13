let fn1, fn2;
const { pipeTwo, pipeline, compose } = require("./composing");

describe("pipeTwo", function () {
  beforeEach(() => {
    fn1 = jest.fn();
    fn2 = jest.fn();
  });

  it("works with single arguments", () => {
    fn1.mockReturnValue(1);
    fn2.mockReturnValue(2);

    const pipe = pipeTwo(fn1, fn2);
    const result = pipe(22);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith(22);
    expect(fn2).toHaveBeenCalledWith(1);
    expect(result).toBe(2);
  });

  it("works with multiple arguments", () => {
    fn1.mockReturnValue(11);
    fn2.mockReturnValue(22);

    const pipe = pipeTwo(fn1, fn2);
    const result = pipe(12, 4, 56);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith(12, 4, 56);
    expect(fn2).toHaveBeenCalledWith(11);
    expect(result).toBe(22);
  });
});

describe("pipeline", function () {
  beforeEach(() => {
    fn1 = jest.fn();
    fn2 = jest.fn();
    fn3 = jest.fn();
    fn4 = jest.fn();
  });

  it("works with a single function", () => {
    fn1.mockReturnValue(11);

    const pipe = pipeline(fn1);
    const result = pipe(60);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith(60);
    expect(result).toBe(11);
  });

  // we omit here tests for 2 functions,
  // which are similar to those for pipeTwo()

  it("works with 4 functions, multiple arguments", () => {
    fn1.mockReturnValue(111);
    fn2.mockReturnValue(222);
    fn3.mockReturnValue(333);
    fn4.mockReturnValue(444);

    const pipe = pipeline(fn1, fn2, fn3, fn4);
    const result = pipe(24, 11, 63);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn3).toHaveBeenCalledTimes(1);
    expect(fn4).toHaveBeenCalledTimes(1);
    expect(fn1).toHaveBeenCalledWith(24, 11, 63);
    expect(fn2).toHaveBeenCalledWith(111);
    expect(fn3).toHaveBeenCalledWith(222);
    expect(fn4).toHaveBeenCalledWith(333);
    expect(result).toBe(444);
  });
});

describe("compose", function () {
  beforeEach(() => {
    fn1 = jest.fn();
    fn2 = jest.fn();
    fn3 = jest.fn();
    fn4 = jest.fn();
  });

  // other tests omitted...

  it("works with 4 functions, multiple arguments", () => {
    fn1.mockReturnValue(111);
    fn2.mockReturnValue(222);
    fn3.mockReturnValue(333);
    fn4.mockReturnValue(444);

    const pipe = compose(fn4, fn3, fn2, fn1);
    const result = pipe(24, 11, 63);

    expect(fn1).toHaveBeenCalledTimes(1);
    expect(fn2).toHaveBeenCalledTimes(1);
    expect(fn3).toHaveBeenCalledTimes(1);
    expect(fn4).toHaveBeenCalledTimes(1);

    expect(fn1).toHaveBeenCalledWith(24, 11, 63);
    expect(fn2).toHaveBeenCalledWith(111);
    expect(fn3).toHaveBeenCalledWith(222);
    expect(fn4).toHaveBeenCalledWith(333);
    expect(result).toBe(444);
  });
});
