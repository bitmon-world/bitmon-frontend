const names = [];

async function main() {
  const obj = {};
  const amount = 19;
  for (let i = 1; i <= amount; i++) {
    obj[i] = {
      image: "/traits/mouth/" + i + ".png",
      name: names[i - 1],
    };
  }
  console.log(obj);
}

main();
