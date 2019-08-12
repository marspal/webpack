class AsyncParallelHook{
    constructor(){
        this.tasks = [];
    }   
    tapAsync(name, task){
        this.tasks.push(task)
    }
    callAsync(...args){
        let finalCallback = args.pop();
        let i = 0;
        var done = () => {
            ++i;
            if(i === this.tasks.length) finalCallback();
        }
        this.tasks.forEach(task => {
            task(...args, done);
        })
    }
}

let hook = new AsyncParallelHook(['name']);
hook.tapAsync('react',(name, cb) => {
    console.log(cb);
    setTimeout(() => {
        console.log('react ', name)
        cb();
    },1000);
});
hook.tapAsync('node',(name, cb) => {
    setTimeout(() => {
        console.log('node ', name)
        cb();
    },1000);
});

hook.callAsync('JW', function(){
    console.log("end")
});