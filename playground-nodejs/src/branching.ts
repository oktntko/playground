export const main = () => {
  const x = 120 / 3;
  const y = (2 + 2) * 10;
  if (x === y) {
    console.log("x = y");
  } else {
    console.log("x != y");
  }

  const o = "oreo";
  const p = "pie";
  op(o, p);

  mySwitch("orange");
  mySwitch("apple");
  mySwitch("pen");
};

const op = (o: string, p: string) => {
  if (o === p) {
    console.log("o = p");
  } else if (o.length > p.length) {
    console.log("o.length > p.length");
  } else {
    console.log("else");
  }
};

const mySwitch = (a: string) => {
  switch (a) {
    case "orange":
      console.log("orange");
      break;
    case "apple":
      console.log("apple");
      break;
    default:
      console.log("default");
      break;
  }
};
main();
