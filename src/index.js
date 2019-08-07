import str from './source.js';


console.log(str, '===')
if(module.hot){
  module.hot.accept('./source.js', () => {
    console.log('更新了');
    let str = require("./source.js");
    console.log(str, '==ss');
  });
}