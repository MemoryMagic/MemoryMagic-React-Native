// var assign = require('object-assign');
// var EventEmitter = require('events').EventEmitter;

// var TaskNotification = assign({}, EventEmitter.prototype, {

// });
var React = require('react-native');
var moment = require('moment');
let format = "YYYY-MM-DD HH:mm";

var {
	PushNotificationIOS
} = React;

var TaskNotification = {
	scheduleLocalNotification: function(task) {
		let createTime = moment(task.createTime, format);
		let dateAwfterOneSecond = moment().add(10, 'seconds');
		// let dateAfterOneDay = moment(createTime).add(1, 'days');
		// let dateAfterTwoDay = moment(createTime).add(2, 'days');
		// let dateAfterOneWeek = moment(createTime).add(1, 'weeks');
		// let dateAfterOneMonth = moment(createTime).add(1, 'months');


		PushNotificationIOS.checkPermissions((permissions) => {
      	// If no permissions are allowed, request permissions.
      	if (!(permissions.alert || permissions.badge || permissions.sound)) {
        	PushNotificationIOS.requestPermissions()
      	}
    	});

    	PushNotificationIOS.scheduleLocalNotification({
			fireDate: dateAfterOneSecond,
			alertBody: task.taskTitle
		});
	}
};

module.exports = TaskNotification;