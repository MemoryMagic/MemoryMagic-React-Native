var AppDispatcher = require('../dispatcher/AppDispatcher');

var TaskActionCreators = {
	create: function(text) {

		var action = {
			type: 'create_task',
			text: text
		};

		AppDispatcher.dispatch(action);
	},
	delete: function(task) {
		var action = {
			type: 'delete_task',
			task: task
		};
		AppDispatcher.dispatch(action);
	}
};

module.exports = TaskActionCreators;