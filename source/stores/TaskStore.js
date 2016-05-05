var AppDispatcher = require('../dispatcher/AppDispatcher');
// var EventEmitter = require('EventEmitter');
var TaskNotification = require('../notification/TaskNotification');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var SQLite = require('react-native-sqlite');
var moment = require('moment');
let format = "YYYY-MM-DD HH:mm";
import React, {
	AsyncStorage
} from 'react-native';
var _tasks = [];
var CHANGE_EVENT = 'change';
var DB_VERSION_TRACE_KEY = '@AsncStorageDataBaseV12:key';

function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	s4() + '-' + s4() + s4() + s4();
}

function create(text, link, image) {
	// Create the new task.
	var id = guid();
	var newTask = {
		taskId: id,
		taskTitle: text,
		link: link,
		image: image,
		createTime: moment().format(format)
	};
	// Save the new task to the DB.
	addData(newTask);
}

function deleteTask(task) {
	var database = SQLite.open("tasks.sqlite", function(error, database) {
		if (error) {
			console.log("❌Falied to open database: ", error);
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
				console.log("❌Falied to excute query: ", error);
				return;
			}
			console.log("✅Query complete! - DELETE");
			database.close(function (error) {
				if (error) {
					console.log("❌Failed to close database: ", error);
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
			console.log("❌Falied to open database: ", error);
			return;
		}

		var sql = "INSERT INTO Task (taskId, taskTitle, link, image, createTime) VALUES (?, ?, ?, ?, ?)";
		var params = [task.taskId, task.taskTitle, task.link, task.image, task.createTime]
		console.log(params);
		database.executeSQL(sql, params, rowCallback, completeCallback);
		
		function rowCallback(rowData) {
			// tasks.push(rowData);
		}
		function completeCallback(error) {
			if (error) {
				console.log("❌Falied to excute query: ", error);
				return;
			}
			console.log("✅Query complete! - INSERT");
			database.close(function (error) {
				if (error) {
					console.log("❌Failed to close database: ", error);
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
			console.log("❌Falied to open database: ", error);
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
				console.log("❌Falied to excute query: ", error);
				return;
			}
			console.log("Query complete! - SELECT");
			database.close(function (error) {
				if (error) {
					console.log("❌Failed to close database: ", error);
					return;
				}
			});
			_tasks = tasks
			TaskStore.emitChange();
			complete();
			//TaskNotification.refreshLocalNotifications();
		}
	});
}

function closeDataBase (database) {
	database.close(function (error) {
		if (error) {
			console.log("❌Failed to close database: ", error);
		} else {
			console.log("✅Close database success!");
		}
	});
}
function upgradeTable() {
	var trace = AsyncStorage.getItem(DB_VERSION_TRACE_KEY);
	if (trace === null) {
		console.log('trace === null => true');
		renameTable();
		AsyncStorage.setItem(DB_VERSION_TRACE_KEY, "*");
	} else {
		console.log('trace === null => false');
	}
}

function renameTable() {
	var database = SQLite.open("tasks.sqlite", function(error, database) {
		if (error) {
			console.log("❌Falied to open the database: ", error);							
			return;
		}
		database.executeSQL("ALTER TABLE Task RENAME TO tmp_Task", 
			[], 
			null, 
			(error) => {
				if (error !== null) {
					console.error("❌Error: ", error);
					closeDataBase(database);
				} else {
					console.log("✅Rename the old table success!")
					createNewTable(database);
				}
		});
	});
}
function createNewTable(database) {
	database.executeSQL("CREATE TABLE IF NOT EXISTS Task (taskId TEXT PRIMARY KEY, taskTitle TEXT, link TEXT, image TEXT, createTime TEXT)", 
		[],
		(data) => {
			console.log("data: ", data);
		},
		(error) => {
			if (error !== null) {
				console.error("❌Error: ", error);
				closeDataBase(database);
			} else {
				console.log("✅Create the new table success!");
				moveOldDataToNewTable(database);
			}
	});
}
function moveOldDataToNewTable (database) {
	database.executeSQL("INSERT INTO Task(taskId, taskTitle, createTime) SELECT taskId, taskTitle, createTime from tmp_Task",
		[],
		null,
		(error) => {
			if (error !== null) {
				console.error("❌Error: ", error);
				closeDataBase(database);
			} else {
				console.log("✅Move the old data to the new table success!");
				dropOldTable(database);
			}
	});
}
function dropOldTable(database) {
	database.executeSQL("DROP TABLE tmp_Task",
		[],
		null,
		(error) => {
			if (error !== null) {
				console.error("❌Error: ", error);
			} else {
				console.log("✅Drop the old table success!");
			}
			closeDataBase(database);
	});
}

function createTable() {
	var database = SQLite.open("tasks.sqlite");
	database.executeSQL("CREATE TABLE IF NOT EXISTS Task (taskId TEXT PRIMARY KEY, taskTitle TEXT, link TEXT, image TEXT, createTime TEXT)", 
		[],
		(data) => {
			console.log("data: ", data);
		},
		(error) => {
			if (error !== null) {
				console.error("Error: ", error);
			} else {
				console.log("Create table success!");
			}
		});
	upgradeTable();

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
		create(action.text, action.link, action.image)
	} else if (action.type === 'delete_task') {
		deleteTask(action.task)
	}
}

TaskStore.dispatchToken = AppDispatcher.register(handleAction);
module.exports = TaskStore;