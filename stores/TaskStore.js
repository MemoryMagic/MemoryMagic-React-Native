var Dispatcher = require('flux').Dispatcher;
//var EventEmitter = require('events').EventEmitter;
// var assign = require('object-assign');
var AppDispatcher = Dispatcher()

// var TaskStore = assign({}, EventEmitter.prototype, {
// 	addChangeListener: function(name, callback) {
// 		this.on(name, callback);
// 	},
// 	removeChangeListener: function(name, callback) {
// 		this.removeListener(name, callback);
// 	},
// });

AppDispatcher.register(name, function(action) {
	switch(name) {
		case "new-item":
			console.log("TaskStore new-item");
			// TaskStore.emitChange();
		break;
	}
});

module.exports = TaskStore;