// 8.1 Headline
const compose = (...fns) =>
  fns.reduce((a, b) => (...args) => {
    return a(b(...args));
  });

const pipeline = (...fns) => compose(...fns.reverse());

const addLog = (args) => (console.log(args), args);
const getWords = (sentence) => sentence.split(/\s+/);
const upperFirst = (word) => {
  return `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}`;
};
const joinSentence = (words) => words.join(" ");
const map = (words) => {
  return words.map(upperFirst);
};

const headline = (sentence) =>
  compose(joinSentence, addLog, map, getWords)(sentence);

console.log(headline("Alice's ADVENTURES in WoNdErLaNd"));

// 8,2 Pending Task
const allTasks = {
  date: "2017-09-22",
  byPerson: [
    {
      responsible: "EG",
      tasks: [
        { id: 111, desc: "task 111", done: false },
        { id: 222, desc: "task 222", done: false },
      ],
    },
    {
      responsible: "FK",
      tasks: [
        { id: 555, desc: "task 555", done: false },
        { id: 777, desc: "task 777", done: true },
        { id: 999, desc: "task 999", done: false },
      ],
    },
    {
      responsible: "ST",
      tasks: [{ id: 444, desc: "task 444", done: true }],
    },
  ],
};

const getField = (attr) => (obj) => obj[attr];
const filter = (fn) => (arr) => arr.filter(fn);
const map2 = (fn) => (arr) => arr.map(fn);
const reduce = (fn, init) => (arr) => arr.reduce(fn, init);

const pending = (listOfTasks, name) =>
  pipeline(
    getField("byPerson"),
    filter((t) => t.responsible === name),
    map2((t) => t.tasks),
    reduce((y, x) => x, []),
    filter((t) => t && !t.done),
    map2(getField("id"))
  )(allTasks || { byPerson: [] }); //

console.log("tasks: ", pending(null, "FK1"));
