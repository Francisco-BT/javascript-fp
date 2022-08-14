const serviceResult = {
  accountsData: [
    {
      id: "F220960K",
      balance: 1024,
    },
    {
      id: "S120456T",
      balance: 2260,
    },
    {
      id: "J140793A",
      balance: -38,
    },
    {
      id: "M120396V",
      balance: -114,
    },
    {
      id: "A120289L",
      balance: 55000,
    },
  ],
};

const delinquent = serviceResult.accountsData.filter(
  (account) => account.balance < 0
);
console.log("delinquent accounts: ", delinquent);

const delinquentIds = serviceResult.accountsData
  .filter((account) => account.balance < 0)
  .map((account) => account.id);

console.log("delinquent ids: ", delinquentIds);

const myFilter = (arr, fn) =>
  arr.reduce((x, y) => (fn(y) ? x.concat(y) : x), []);

console.log(
  "using myFilter: ",
  myFilter(serviceResult.accountsData, (v) => v.balance < 0)
);
