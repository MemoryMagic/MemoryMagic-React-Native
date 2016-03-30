var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskNotification = require('../notification/TaskNotification');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

//var CHANGE_EVENT = 'change';

// var ButtonStore = assign({}, EventEmitter.prototype, {
	var ButtonStore = _.extend({}, EventEmitter.prototype, {
		addChangeListener: function (eventName, callback) {
		this.method = _.debounce(callback, 100);
		this.on(eventName, this.method);
		console.log('debounce');
	},

	method: function() { },
	removeChangeListener: function (eventName, callback) {
		this.removeListener(eventName, this.method);
		_.debounce(callback).cancel();
		console.log('cancel');
	},

	emitChange: function(eventName) {
		this.emit(eventName);
	},

	init: function() {
	}
});

	function handleAction(action) {
		if (action.type === 'click') {
			ButtonStore.emitChange(action.name);
		}
	}

	ButtonStore.dispatchToken = AppDispatcher.register(handleAction);
	module.exports = ButtonStore;