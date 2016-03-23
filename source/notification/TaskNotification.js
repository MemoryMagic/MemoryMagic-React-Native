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

		PushNotificationIOS.checkPermissions((permissions) => {
      	// If no permissions are allowed, request permissions.
      	if (!(permissions.alert || permissions.badge || permissions.sound)) {
        	PushNotificationIOS.requestPermissions()
      	}
    	});

    	let createTime = moment(task.createTime, format);
    	let today6am = moment().startOf('day').add(6, 'hours');
		let dateAfterOneDay = moment(today6am).add(1, 'days');
		let dateAfterTwoDay = moment(today6am).add(2, 'days');
		let dateAfterOneWeek = moment(today6am).add(7, 'days');
		let dateAfterOneMonth = moment(today6am).add(30, 'days');

		let list = [dateAfterOneDay, dateAfterTwoDay, dateAfterOneWeek, dateAfterOneMonth];
		list.map((time) => {
			console.log('time: '+time.format(format));
			PushNotificationIOS.scheduleLocalNotification({
				alertBody: task.taskTitle,
				fireDate: time.format("YYYY-MM-DDTHH:mm:ss.sssZ")
			});
		});
	}


};

module.exports = TaskNotification;