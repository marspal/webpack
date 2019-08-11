class SyncLoopHook{
    constructor(args){
        this.tasks = [];
    }   
    tap(name, task){
        this.tasks.push(task)
    }
    call(...args){
        this.tasks.forEach(task => {
            let ret;
            do{
                ret = task(...args);
            }while(ret !== undefined)
        });
    }
}

let hook = new SyncLoopHook(['name']);
let index = 0;
hook.tap('react',(name) => {
    console.log('react '+ name);
    ++index
    return index === 3? undefined : "react学的好";
});
hook.tap('node',(name) => {
    console.log('node '+ name);
});

hook.call('JW');