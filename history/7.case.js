class AsyncSeriesHook{
    constructor(){
        this.tasks = [];
    }   
    tapAsync(name, task){
        this.tasks.push(task)
    }
    callAsync(...args){
        let finalCallback = args.pop()
        let index = 0; // 异步迭代 需要中间函数
        let next = () => {
            if(index === this.tasks.length) return finalCallback();
            let task = this.tasks[index++];
            task(...args, next);
        }
        next();
    }
}

let hook = new AsyncSeriesHook(['name']);
hook.tapAsync('react',(name, next) => {
    setTimeout(()=>{
        console.log('react ', name)
        next();
    },1000)
});
hook.tapAsync('node',(name, next) => {
    setTimeout(()=>{
        console.log('node ', name)
        next();
    },1000)
});
hook.tapAsync('webpack',(name, next) => {
    setTimeout(()=>{
        console.log('webpack ', name)
        next();
    },1000)
});

hook.callAsync('JW',()=>{
    console.log("end");
});