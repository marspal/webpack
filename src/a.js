
export default "1223"
class B {}

function * gen(){
  yield 1;
}
console.log(gen().next())


function test(){
  return new Promise((resolve,reject) => {
    setTimeout(resolve,0)
  });
}
test().then(()=>{
  console.log('---');
});

console.log("aaa".includes("a"));