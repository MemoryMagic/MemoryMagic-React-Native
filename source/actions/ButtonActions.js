var AppDispatcher = require('../dispatcher/AppDispatcher');

var ButtonActionCreators = {
	click: function(eventName) {
		var action = {
			type: 'click',
			name: eventName,
			};

		AppDispatcher.dispatch(action);
	}
};

module.exports = ButtonActionCreators;