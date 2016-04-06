var AppDispatcher = require('../dispatcher/AppDispatcher');
// var EventEmitter = require('EventEmitter');
var TaskNotification = require('../notification/TaskNotification');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var SQLite = require('react-native-sqlite');
var moment = require('moment');
let format = "YYYY-MM-DD HH:mm";

var _tasks = [];
var CHANGE_EVENT = 'change';

function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	s4() + '-' + s4() + s4() + s4();
}

function create(text) {
	// Create the new task.
	var id = guid();
	var newTask = {
		taskId: id,
		taskTitle: text,
		createTime: moment().format(format)
	};
	// Save the new task to the DB.
	addData(newTask);
}

function deleteTask(task) {
	var database = SQLite.open("tasks.sqlite", function(error, database) {
		if (error) {
			console.log("Falied to open database: ", error);
			return;
		}

		var sql = "DELETE FROM Task WHERE taskId = ?";
		var params = [task.taskId]
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

			loadData(() => {
				TaskNotification.cancelLocalNotification(task);
			});
		}
	});
}

function addData(task) {
	var database = SQLite.open("tasks.sqlite", function(error, database) {
		if (error) {
			console.log("Falied to open database: ", error);
			return;
		}

		var sql = "INSERT INTO Task (taskId, taskTitle, createTime) VALUES (?, ?, ?)";
		var params = [task.taskId, task.taskTitle, task.createTime]
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

			loadData(() => {
            	TaskNotification.scheduleLocalNotification(task);
            });
		}
	});
}

function loadData(complete) {
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
			//complete();
			//TaskNotification.refreshLocalNotifications();
		}
	});
}

function createTable() {
	var database = SQLite.open("tasks.sqlite");
	database.executeSQL("CREATE TABLE IF NOT EXISTS Task (taskId TEXT PRIMARY KEY, taskTitle TEXT, createTime TEXT)", 
		[],
		(data) => {
			console.log("data: ", data);
		},
		(error) => {
			if (error !== null) {
				console.error("error: ", error);
			} else {
				console.log("create table success!");
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
		loadData(() => { });
	},

	createTable: function() {
		createTable();
	},

	getTodayTodo: function() {
		var todayTodoTasks = [];
		_tasks.map((task) => {
			let createTime = moment(task.createTime).startOf('day');
			let today = moment().startOf('day');
			if (moment(createTime).add(1, 'days').diff(today, 'days') === 0 ||
				moment(createTime).add(2, 'days').diff(today, 'days') === 0 ||
				moment(createTime).add(7, 'days').diff(today, 'days') === 0 ||
				moment(createTime).add(30, 'days').diff(today, 'days') === 0) 
			{
				todayTodoTasks.push(task);
			}
		});
		return todayTodoTasks;
	}
});

function handleAction(action) {
	if (action.type === 'create_task') {
		create(action.text)
	} else if (action.type === 'delete_task') {
		deleteTask(action.task)
	}
}

TaskStore.dispatchToken = AppDispatcher.register(handleAction);
module.exports = TaskStore;