const { SyncLoopHook } = require("tapable");

class Lesson {
    constructor() {
        this.index = 0;
        this.hooks = {
            arch: new SyncLoopHook(['name'])
        }
    }
    tap(){ // 注册监听函数
        this.hooks.arch.tap('node', (name) => {
            console.log('node' + name)
            ++this.index
            return  this.index === 3 ? undefined : '继续学';
        });
        this.hooks.arch.tap('react', function(name){
            console.log('react ' + name)
        });
    }
    start(){
        this.hooks.arch.call('zfpx')
    }
}

let l = new Lesson();
l.tap();
l.start()