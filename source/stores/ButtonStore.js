var AppDispatcher = require('../dispatcher/AppDispatcher');
var TaskNotification = require('../notification/TaskNotification');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var CHANGE_EVENT = 'change';

// var ButtonStore = assign({}, EventEmitter.prototype, {
var ButtonStore = _.extend({}, EventEmitter.prototype, {
	addChangeListener: function (callback) {
		this.method = _.once(_.debounce(callback, 100));
		this.on(CHANGE_EVENT, this.method);
	},

	method: function() { },
	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
		//this.method.cancel(); why not work??
	},

	emitChange: function() {
		this.emit(CHANGE_EVENT);
	},

	init: function() {
	}
});

function handleAction(task) {
	if (task.type === 'click') {
		ButtonStore.emitChange();
	}
}

ButtonStore.dispatchToken = AppDispatcher.register(handleAction);
module.exports = ButtonStore;