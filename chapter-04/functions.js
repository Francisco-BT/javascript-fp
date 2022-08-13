const colors = ["violet", "indigo", "blue", "green", "yellow", "orange", "red"];
colors.sort();
console.log(colors);

const spanishComparison = (a, b) => a.localeCompare(b, "es");
const palabras = ["ñandú", "oasis", "mano", "natural", "mítico", "musical"];
palabras.sort(spanishComparison);
console.log(palabras);
