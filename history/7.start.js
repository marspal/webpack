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
        this.hooks.arch.tapAsync('node', (name, cb) => {
            setTimeout(()=> {
                console.log('node', name);
                cb();
            }, 1000);
        });
        this.hooks.arch.tapAsync('react', function(name, cb){
            setTimeout(()=> {
                console.log('react', name);
                cb();
            }, 1000);
        });
    }
    start(){
        this.hooks.arch.callAsync('zfpx', function(){
            console.log("end");
        });
    }
}

let l = new Lesson();
l.tap();
l.start()