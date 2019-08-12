class AsyncSeriesHook{
    constructor(){
        this.tasks = [];
    }   
    tapPromise(name, task){
        this.tasks.push(task)
    }
    promise(...args){
        let [first, ...others] = this.tasks;
        return others.reduce((p,a)=> {
            return p.then(()=> a(...args))
        }, first(...args))
    }
}

let hook = new AsyncSeriesHook(['name']);
hook.tapPromise('react',(name, next) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('react ', name)  
            resolve();
        },1000)
    })
});
hook.tapPromise('node',(name) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('node ', name)  
            resolve();
        },1000)
    })
});
hook.tapPromise('webpack',(name) => {
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            console.log('webpack ', name)   
            resolve();
        },1000)
    })
});

hook.promise('JW').then(()=>{
    console.log("end");
});