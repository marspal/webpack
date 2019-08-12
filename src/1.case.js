class AsyncSeriesWaterfallHook{
    constructor(){
        this.tasks = [];
    }   
    tapPromise(name, task){
        this.tasks.push(task)
    }
    callPromise(...args){
     
    }
}

let hook = new AsyncSeriesWaterfallHook(['name']);
hook.tapPromise('react',(name, next) => {
    setTimeout(()=>{
        console.log('react ', name)  
        next('error', "react data");
    },1000)
});
hook.tapPromise('node',(data, next) => {
    setTimeout(()=>{
        console.log('node ', data)  
        next();
    },1000)
});
hook.tapPromise('webpack',(data, next) => {
    setTimeout(()=>{
        console.log('webpack ', data)   
        next();
    },1000)
});

hook.callPromise('JW').then(()=>{
    console.log("end");
});