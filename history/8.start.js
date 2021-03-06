const { AsyncSeriesHook } = require("tapable");

// 注册方法 tap tapAsync(回调) tapPromise
class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            arch: new AsyncSeriesHook(['name'])
        }
    }
    tap(){ // 注册监听函数
        this.hooks.arch.tapPromise('node', (name) => {
            return new Promise((resovle, reject) => {
                setTimeout(()=> {
                    console.log('node', name);
                    resovle();
                }, 1000);
            });
           
        });
        this.hooks.arch.tapPromise('react', function(name){
            return new Promise((resovle, reject) => {
                setTimeout(()=> {
                    console.log('react', name);
                    resovle();
                }, 1000);
            });
        });
    }
    start(){
        this.hooks.arch.promise('zfpx').then(function(){
            console.log("end");
        });
    }
}

let l = new Lesson();
l.tap();
l.start()