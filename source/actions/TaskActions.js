var AppDispatcher = require('../dispatcher/AppDispatcher');

var TaskActionCreators = {
	create: function(text, link, image) {

		var action = {
			type: 'create_task',
			text: text,
			link: link,
			image: image
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