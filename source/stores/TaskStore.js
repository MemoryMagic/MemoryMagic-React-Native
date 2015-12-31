var AppDispatcher = require('../dispatcher/AppDispatcher');
// var EventEmitter = require('EventEmitter');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var SQLite = require('react-native-sqlite');

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

function addData(task) {
	var database = SQLite.open("tasks.sqlite", function(error, database) {
		if (error) {
			console.log("Falied to open database: ", error);
			return;
		}

		var sql = "INSERT INTO Task (taskTitle) VALUES (?)";
		var params = [task.taskTitle]
		database.executeSQL(sql, params, rowCallback, completeCallback);
		
		function rowCallback(rowData) {
			// tasks.push(rowData);
		}
		function completeCallback(error) {
			if (error) {
				console.log("Falied to excute query: ", error);
				return;
			}
			console.log("Query complete!");
			database.close(function (error) {
				if (error) {
					console.log("Failed to close database: ", error);
					return;
				}
			});

			loadData();
		}
	});
}

function loadData() {
	var tasks = [];

	var database = SQLite.open("tasks.sqlite", function(error, database) {
		if (error) {
			console.log("Falied to open database: ", error);
			return;
		}

		var sql = "SELECT * from Task";
		var params = []
		database.executeSQL(sql, params, rowCallback, completeCallback);
		
		function rowCallback(rowData) {
			tasks.push(rowData);
		}
		function completeCallback(error) {
			if (error) {
				console.log("Falied to excute query: ", error);
				return;
			}
			console.log("Query complete!");
			database.close(function (error) {
				if (error) {
					console.log("Failed to close database: ", error);
					return;
				}
			});
			_tasks = tasks
			TaskStore.emitChange();
		}
	});
}

var TaskStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback)
	},

	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getAll: function() {
		return _tasks;
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	init: function() {
		loadData();
	}
});

function handleAction(task) {
	if (task.type === 'create_task') {
		create(task.text);
		//TaskStore.emitChange();
	}
}

TaskStore.dispatchToken = AppDispatcher.register(handleAction);
module.exports = TaskStore;