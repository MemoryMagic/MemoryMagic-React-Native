var AppDispatcher = require('../dispatcher/AppDispatcher');

var TaskActionCreators = {
	create: function(text) {

		var action = {
			type: 'create_task',
			text: text
		};

		AppDispatcher.dispatch(action);
	},
	delete: function(taskId) {
		var action = {
			type: 'delete_task',
			id: taskId
		};
		AppDispatcher.dispatch(action);
	}
};

module.exports = TaskActionCreators;