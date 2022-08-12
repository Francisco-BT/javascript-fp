const { once } = require("./once");

describe("once", () => {
  let testFunction = jest.fn();

  beforeEach(() => {
    testFunction = jest.fn();
  });

  it("without 'once', a function always runs", () => {
    testFunction();
    testFunction();
    testFunction();
    expect(testFunction).toHaveBeenCalledTimes(3);
  });

  it("with 'once', a function runs one time", () => {
    const sut = {
      onceFn: once(testFunction),
    };
    jest.spyOn(sut, "onceFn");

    sut.onceFn();
    sut.onceFn();
    sut.onceFn();

    expect(sut.onceFn).toHaveBeenCalledTimes(3);
    expect(testFunction).toHaveBeenCalledTimes(1);
  });
});
