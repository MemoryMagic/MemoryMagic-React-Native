var AppDispatcher = require('../dispatcher/AppDispatcher');
// var EventEmitter = require('EventEmitter');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var SQLite = require('react-native-sqlite');
var database = SQLite.open("tasks.sqlite");

var _tasks = []
var CHANGE_EVENT = 'change';

function create(text) {

	// Create the new task.
	var id = Date.now();
	var newTask = {
		taskId: id,
		taskTitle: text
	};

	// Save the new task to the DB.
	addData(newTask);
}

async function addData(task) {
		await database.executeSQL(
			"INSERT INTO Task (taskTitle) VALUES (?)",
			[task.taskTitle],
			(data) => {
				console.log("data: ", data);
			},
			(error) =>{
				if (error) {
					console.log("error:", error);
				} else {
					console.log("insert success!");
					AppDispatcher.dispatch("addSuccess", null);
					// this.props.navigator.pop();
				}
			});
	}

 async function loadData() {
	var tasks = [];
	 await database.executeSQL(
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
	return tasks
}

var TaskStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback)
	},

	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getAll: function() {
		loadData();
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