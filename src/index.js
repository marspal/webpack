require("./index.css")
var a = require("./a.js");
require("./index.less")
console.log(a);

const fn = () => {
  console.log('aaa');
}

fn();

@log
class A {
  a = 1;
}

function log(target,key,descriptor){
  console.log(target, key)
}
let ccc = new A();
console.log(ccc,'====')