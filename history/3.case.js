class SyncWaterfallHook{
    constructor(args){
        this.tasks = [];
    }   
    tap(name, task){
        this.tasks.push(task)
    }
    call(...args){
        let [first, ...others] = this.tasks;
        others.reduce((result, current) => {
            return result? current(result) : current(...args)
        }, first(...args))
    }
}

let hook = new SyncWaterfallHook(['name']);
hook.tap('react',(name) => {
    console.log('react '+ name);
    return "react学的好"
});
hook.tap('node',(name) => {
    console.log('node '+ name);
});

hook.call('JW');