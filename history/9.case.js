class AsyncSeriesWaterfallHook{
    constructor(){
        this.tasks = [];
    }   
    tapAsync(name, task){
        this.tasks.push(task)
    }
    callAsync(...args){
        let finalCallback = args.pop();
        let index = 0;
        let next = (err, data) => {
            let task = this.tasks[index];
            if(!task || !!err) return finalCallback();
            if(index === 0){
                task(...args, next)
            }else {
                task(data, next)
            }
            index++;
        }
        next();
    }
}

let hook = new AsyncSeriesWaterfallHook(['name']);
hook.tapAsync('react',(name, next) => {
    setTimeout(()=>{
        console.log('react ', name)  
        next('error', "react data");
    },1000)
});
hook.tapAsync('node',(data, next) => {
    setTimeout(()=>{
        console.log('node ', data)  
        next();
    },1000)
});
hook.tapAsync('webpack',(data, next) => {
    setTimeout(()=>{
        console.log('webpack ', data)   
        next();
    },1000)
});

hook.callAsync('JW',()=>{
    console.log("end");
});