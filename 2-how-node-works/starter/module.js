// console.log("arguments");
// console.log(require("module"));

const C = require('./test-module1');
const cal = new C();
console.log(cal.add(2,3));


const C2 = require('./test-module2');
console.log(C2.add(2,8));

require('./test-module3')();
require('./test-module3')();
require('./test-module3')();