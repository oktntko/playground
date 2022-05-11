export const main = () => {
  const greet = "Hello World";
  console.log("greet", greet);
  // 文字列結合
  const concat = greet + "晚上好";
  console.log("concat", concat);
  // 文字列の長さ
  console.log("greet", greet, greet.length);
  console.log("concat", concat, concat.length);

  // 文字列→数値
  const strNum = "1000";
  const num = Number(strNum);
  console.log("strNum", strNum);
  console.log("num", num);
};

main();
