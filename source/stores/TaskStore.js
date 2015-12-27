var AppDispatcher = require('../dispatcher/AppDispatcher');
// var EventEmitter = require('EventEmitter');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var _tasks = {}
var CHANGE_EVENT = 'change';

function create(text) {
	var id = Date.now();
	_tasks[id] = {
		id: id,
		text: text,
	};
}

var TaskStore = assign({}, EventEmitter.prototype, {
	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback)
		//this.addListener(CHANGE_EVENT, callback);

	},

	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	},

	getAll: function() {
		var id = Date.now();
		_tweets[id] = {
			id: id,
			text: 'item'+id
		};
		return _tweets;
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