const path = require("path");
const glob = require("glob");
/** glob传入三个参数（需要匹配的文件路径，option,callback(er,files)） */
/** 动态多页面打包 */
/** __dirname:当前文件路径 */

function getEntry(rootSrc, gb, ignore) {
  /**glob.sync(rootSrc + gb)：所有index.js/ts */
  const map = {};
  let ignorePaths = [];
  if (ignore) {
    ignorePaths = glob.sync(rootSrc + ignore).map((file) =>
      path
        .relative(rootSrc, file)
        .replace(/\.[tj]s/, "")
        .replace(/\\/g, "/")
    );
  }
  glob.sync(rootSrc + gb).forEach((file) => {
    /**relative:解析出不同的部分  */
    var key = path
      .relative(rootSrc, file)
      .replace(/\.[tj]s/, "")
      .replace(/\\/g, "/");
    if (ignorePaths.includes(key)) {
      return;
    }
    map[key] = file.replace(/\\/g, "/");
  });
  return map;
}
// 所有page文件下的index.js/ts
module.exports.pagesEntry = getEntry(
  path.resolve(__dirname, "../src"),
  "/**/pages/**/@(index|main).[tj]s",
  "/**/components/**/index.[tj]s"
);
module.exports.componentEntry = getEntry(
  path.resolve(__dirname, "../src"),
  "/**/components/**/index.[tj]s"
);
