var numbers = [...Array(10_000).keys()];

console.log({ numbers });

var rgb = [];

for (index = 0; index < numbers.length / 4; index += 4) {
  rgb.push({
    red: numbers[index],
    blue: numbers[index + 1],
    green: numbers[index + 2],
    contrast: numbers[index + 3],
  });
}

var screen = [[], []];

for (index = 0; index < rgb.length / 2; index++) {
  for (subindex = 0; subindex < rgb.length / 2; subindex++) {
    screen[0].push(rgb[0]);
    rgb.shift();
  }
}

console.log({ screen });
