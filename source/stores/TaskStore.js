var AppDispatcher = require('../dispatcher/AppDispatcher');
// var EventEmitter = require('EventEmitter');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var SQLite = require('react-native-sqlite');
var database = SQLite.open("tasks.sqlite");

var _tasks = []
var CHANGE_EVENT = 'change';

function create(text) {
	var id = Date.now();
	_tasks.push({
		taskId: id,
		taskTitle: text
	});
}

 function loadData() {
	var tasks = [];
	 database.executeSQL(
		"SELECT * from Task",
		[],
		(row) => {
			tasks.push(row);
		},
		(error) =>{
			if (error) {
				console.log("error:", error);
			} else {
				console.log("get data from database success -> tasks: ", tasks);
					console.log("1 else l: "+tasks.length);
					_tasks = tasks
			}
	});
	console.log("2 l: "+tasks.length);
	// return tasks
}

var TaskStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback)
	},

	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getAll: function() {
		// _tasks = loadData();

		//loadData();
		var id = Date.now();
		// _tasks[id] = {
		// 	taskId: id,
		// 	taskTitle: "task title " + id,
		// };

		//_tasks.push({taskId: id, taskTitle: "task title"+id});
		// console.log("getAll() task: " + _tasks.length);

		return _tasks;
	},
	emitChange: function() {
		this.emit(CHANGE_EVENT);
	}
});

function handleAction(task) {
	if (task.type === 'create_task') {
		create(task.text);
		TaskStore.emitChange();
	}
}

TaskStore.dispatchToken = AppDispatcher.register(handleAction);
module.exports = TaskStore;