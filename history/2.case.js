class SyncBailHook{
    constructor(args){
        this.tasks = [];
    }   
    tap(name, task){
        this.tasks.push(task)
    }
    call(...args){
        let ret, i = 0;
        do{
           ret = this.tasks[i++](...args)
        }while(ret === undefined && i < this.tasks.length)
    }
}

let hook = new SyncBailHook(['name']);
hook.tap('react',(name) => {
    console.log('react '+ name);
    return "react学不来了"
});
hook.tap('node',(name) => {
    console.log('node '+ name);
});

hook.call('JW');