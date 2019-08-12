const {
	SyncHook,
	SyncBailHook,
	SyncWaterfallHook,
	SyncLoopHook,
	AsyncParallelHook,
	AsyncParallelBailHook,
	AsyncSeriesHook,
	AsyncSeriesBailHook,
	AsyncSeriesWaterfallHook
 } = require("tapable");

class Car {
   constructor(){
      this.hooks = {
        accelerate: new SyncHook(["newSpeed"]),
        brake: new SyncHook(),
        calculateRoutes: new AsyncParallelHook(["source", "target", "routesList"])
      };
    }
}
const myCar = new Car();
myCar.hooks.brake.tap("WarningLampPlugin", ()=> console.log('aaa'));
myCar.hooks.brake.call();
myCar.hooks.accelerate.tap("LoggerPlugin", newSpeed => console.log(`Accelerating to ${newSpeed}`));
myCar.hooks.accelerate.intercept({
	context: true,
	tap: (context, tapInfo) => {
		// tapInfo = { type: "sync", name: "NoisePlugin", fn: ... }
		console.log(`${tapInfo.name} is doing it's job`);

		// `context` starts as an empty object if at least one plugin uses `context: true`.
		// If no plugins use `context: true`, then `context` is undefined.
		if (context) {
			// Arbitrary properties can be added to `context`, which plugins can then access.
			context.hasMuffler = true;
		}
	}
});
myCar.hooks.accelerate.call(123);
myCar.hooks.calculateRoutes.tapAsync("CachedRoutesPlugin", (source, target, routesList) => {
	  console.log(source, target, routesList());
})
myCar.hooks.calculateRoutes.callAsync(1,2,function(){
  console.log("end");
  return "aaa"
});

