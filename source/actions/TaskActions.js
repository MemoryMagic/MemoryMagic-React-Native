var AppDispatcher = require('../dispatcher/AppDispatcher');

var TaskActionCreators = {
	create: function(text) {

		var action = {
			type: 'create_task',
			text: text
		};

		AppDispatcher.dispatch(action);
	}
};

module.exports = TaskActionCreators;