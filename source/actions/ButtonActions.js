var AppDispatcher = require('../dispatcher/AppDispatcher');

var ButtonActionCreators = {
	click: function() {

		var action = {
			type: 'click'
					};

		AppDispatcher.dispatch(action);
	}
};

module.exports = ButtonActionCreators;