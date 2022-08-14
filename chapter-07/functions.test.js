const { addLogging, addLogging3, memoize } = require("./functions");

describe("a logging function", () => {
  it("should log twice with well behaved functions", () => {
    let something = (a, b) => `result=${a}:${b}`;
    something = addLogging(something);

    jest.spyOn(console, "log");
    something(22, 9);
    expect(console.log).toHaveBeenCalledTimes(2);
    expect(console.log).toHaveBeenCalledWith("entering something: 22,9");
    expect(console.log).toHaveBeenCalledWith("exiting something: result=22:9");
  });

  it("should report a thrown exception", () => {
    jest.resetAllMocks();
    let thrower = (a, b, c) => {
      throw "CRASH!";
    };
    jest.spyOn(console, "log");
    expect(thrower).toThrow();

    thrower = addLogging(thrower);
    try {
      thrower(1, 2, 3);
    } catch (e) {
      expect(console.log).toHaveBeenCalledTimes(2);
      expect(console.log).toHaveBeenCalledWith("entering thrower: 1,2,3");
      expect(console.log).toHaveBeenCalledWith("exiting thrower: threw CRASH!");
    }
  });
});

describe("after addLogging3()", function () {
  let dummy;

  beforeEach(() => {
    dummy = { logger() {} };
    const sut = jest.spyOn(dummy, "logger");
    sut.mockClear();
  });

  it("should call the provided logger", () => {
    let something = (a, b) => `result=${a}:${b}`;
    something = addLogging3(something, dummy.logger);

    something(22, 9);
    expect(dummy.logger).toHaveBeenCalledTimes(2);
    expect(dummy.logger).toHaveBeenCalledWith("entering something: 22,9");
    expect(dummy.logger).toHaveBeenCalledWith("exiting something: result=22:9");
  });

  it("a throwing function should be reported", () => {
    let thrower = (a, b, c) => {
      throw "CRASH!";
    };
    thrower = addLogging3(thrower, dummy.logger);

    try {
      thrower(1, 2, 3);
    } catch (e) {
      expect(dummy.logger).toHaveBeenCalledTimes(2);
      expect(dummy.logger).toHaveBeenCalledWith("entering thrower: 1,2,3");
      expect(dummy.logger).toHaveBeenCalledWith(
        "exiting thrower: threw CRASH!"
      );
    }
  });
});

describe("memoization", () => {
  const sut = {
    fib: null,
  };
  beforeEach(() => {
    sut.fib = (n) => {
      if (n == 0) {
        return 0;
      } else if (n == 1) {
        return 1;
      } else {
        return sut.fib(n - 2) + sut.fib(n - 1);
      }
    };
  });

  describe("the original fib", function () {
    it("should produce correct results", () => {
      expect(sut.fib(0)).toBe(0);
      expect(sut.fib(1)).toBe(1);
      expect(sut.fib(5)).toBe(5);
      expect(sut.fib(8)).toBe(21);
      expect(sut.fib(10)).toBe(55);
    });

    it("should repeat calculations", () => {
      jest.spyOn(sut, "fib");
      expect(sut.fib(6)).toBe(8);
      expect(sut.fib).toHaveBeenCalledTimes(25);
    });
  });

  describe("the memoized fib", function () {
    beforeEach(() => {
      sut.fib = memoize(sut.fib);
    });

    it("should produce same results", () => {
      expect(sut.fib(0)).toBe(0);
      expect(sut.fib(1)).toBe(1);
      expect(sut.fib(5)).toBe(5);
      expect(sut.fib(8)).toBe(21);
      expect(sut.fib(10)).toBe(55);
    });

    it("shouldn't repeat calculations", () => {
      jest.spyOn(sut, "fib");

      expect(sut.fib(6)).toBe(8); // 11 calls
      expect(sut.fib).toHaveBeenCalledTimes(11);

      expect(sut.fib(5)).toBe(5); // 1 call
      expect(sut.fib(4)).toBe(3); // 1 call
      expect(sut.fib(3)).toBe(2); // 1 call
      expect(sut.fib).toHaveBeenCalledTimes(14);
    });
  });
});
