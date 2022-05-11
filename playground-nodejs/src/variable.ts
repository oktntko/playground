export const main = () => {
  // # 変数の特徴
  // + 変数のスコープ
  {
    const const_in_block = "const_in_block";
    let let_in_block = "let_in_block";
    var var_in_block = "var_in_block";
  }
  // console.log(const_in_block); // error
  // console.log(let_in_block); // error
  console.log(var_in_block); // ok

  // + 変数の再代入
  {
    const c = 1;
    // c = 1 + 1; // error
    let l = 1;
    l = 1 + 1; // ok
    console.log(l);
  }

  // + 変数の再宣言
  {
    const const_a = "const_a";
    // const const_a = "const_a"; // error
    let let_b = "let_b";
    // let let_b = "let_b"; // error
    var var_c = "var_c";
    var var_c = "var_var";
    console.log(var_c);
  }

  // # データ型
  const n = 1; // number
  const b = true; // boolean
  const str = "string"; // string
  console.log(n, b, str);

  const obj = {
    name: "Ken",
    age: 24,
  }; // object
  console.log(obj);

  const ni = null;
  const un = undefined;
  console.log(ni, un);
};

main();
