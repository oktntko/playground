/**
 * JSDoc
 *
 * @param {string[]} args 引数
 */
const main = async (args: string[] = []) => {
  console.log("Hello World"); // １行コメント
  const i /*文中コメント*/ = 1;
  /*
   * 改行コメント
   */
  console.log(args);
};

main();
