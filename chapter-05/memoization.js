const cache = [];

const fibonacci = (n) => {
  if (!cache[n]) {
    if (n === 0 || n === 1) {
      cache[n] = n;
    } else {
      cache[n] = fibonacci(n - 2) + fibonacci(n - 1);
    }
  }

  return cache[n];
};

console.log(fibonacci(10)); // 55, a bit slowly
console.log(`cache is ${cache}\n`);
console.log(fibonacci(20)); // 55, a bit slowly
console.log(`cache is ${cache}\n`);
console.log(fibonacci(30)); // 55, a bit slowly
console.log(`cache is ${cache}\n`);
console.log(fibonacci(40)); // 55, a bit slowly
console.log(`cache is ${cache}\n`);
