const { SyncWaterfallHook } = require("tapable");

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncWaterfallHook(['name'])
        }
    }
    tap(){ // 注册监听函数
        this.hooks.arch.tap('node', function(name){
            console.log('node' + name)
            return "node学的不错";
        });
        this.hooks.arch.tap('react', function(data){
            console.log('react ' + data)
        });
    }
    start(){
        this.hooks.arch.call('zfpx')
    }
}

let l = new Lesson();
l.tap();
l.start()