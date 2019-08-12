class AsyncParallelHook{
    constructor(){
        this.tasks = [];
    }   
    tapPromise(name, task){
        this.tasks.push(task)
    }
    promise(...args){
        let promiseAll = this.tasks.map(task => task(...args))
        return Promise.all(promiseAll)
    }
}

let hook = new AsyncParallelHook(['name']);
hook.tapPromise('react',(name) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('react ', name)
            resolve();
        },1000);
    });
});
hook.tapPromise('node',(name) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            console.log('node ', name)
            resolve();
        },1000);
    });
});

hook.promise('JW').then(function(){
    console.log("end1")
});