// var assign = require('object-assign');
// var EventEmitter = require('events').EventEmitter;

// var TaskNotification = assign({}, EventEmitter.prototype, {

// });
var React = require('react-native');
var moment = require('moment');
let format = "YYYY-MM-DD HH:mm";
// var TaskStore =require('../stores/TaskStore');

var {
	PushNotificationIOS
} = React;

var TaskNotification = {
	scheduleLocalNotification: function(task) {
		this.refreshLocalNotifications();
		return;

		PushNotificationIOS.checkPermissions((permissions) => {
      	// If no permissions are allowed, request permissions.
      	if (!(permissions.alert || permissions.badge || permissions.sound)) {
        	PushNotificationIOS.requestPermissions()
      	}
    	});

    	let createTime = moment(task.createTime, format);
    	let createTime6am = createTime.startOf('day').add(6, 'hours');
		let dateAfterOneDay = moment(createTime6am).add(1, 'days');
		let dateAfterTwoDay = moment(createTime6am).add(2, 'days');
		let dateAfterOneWeek = moment(createTime6am).add(7, 'days');
		let dateAfterOneMonth = moment(createTime6am).add(30, 'days');

		console.log('+ task.taskId: ' + task.taskId);
		let dateAfterOneMinutes = moment(createTime).add(1, 'minutes');
		let list = [dateAfterOneMinutes, dateAfterOneDay, dateAfterTwoDay, dateAfterOneWeek, dateAfterOneMonth];
		list.map((time) => {
			console.log('time: '+time.format(format));
			PushNotificationIOS.scheduleLocalNotification({
				alertBody: '今日复习任务: ' + task.taskTitle,
				fireDate: time.format("YYYY-MM-DDTHH:mm:ss.sssZ"),
				userInfo: { taskId: task.taskId }
			});
		});
	},

	cancelLocalNotification: function(task) {
		this.refreshLocalNotifications();
		return;

		console.log('- task.taskId: ' + task.taskId);
		PushNotificationIOS.cancelLocalNotifications({ taskId: task.taskId });
	},

	
	refreshLocalNotifications: function() {
		PushNotificationIOS.checkPermissions((permissions) => {
      	// If no permissions are allowed, request permissions.
      	if (!(permissions.alert || permissions.badge || permissions.sound)) {
        	PushNotificationIOS.requestPermissions()
      	}
    	});
    	
		var TaskStore = require('../stores/TaskStore');
		var tasks = TaskStore.getAll();
		console.log('tasks.length: ' + tasks.length);
		var dic =[];
		tasks.map((task) => {
			let createTime = moment(task.createTime, format);
    		let createTime6am = createTime.startOf('day').add(6, 'hours');
			let dateAfterOneDay = moment(createTime6am).add(1, 'days').format('YYYY-MM-DD HH');
			let dateAfterTwoDay = moment(createTime6am).add(2, 'days').format('YYYY-MM-DD HH');
			let dateAfterOneWeek = moment(createTime6am).add(7, 'days').format('YYYY-MM-DD HH');
			let dateAfterOneMonth = moment(createTime6am).add(30, 'days').format('YYYY-MM-DD HH');
			
			var tasksCount = 1;
			if (dateAfterOneDay in dic) {
				tasksCount = dic[dateAfterOneDay];
				tasksCount += 1;
			}
			dic[dateAfterOneDay] = tasksCount;
			
			tasksCount = 1;
			if (dateAfterTwoDay in dic) {
				tasksCount = dic[dateAfterTwoDay];
				tasksCount += 1;
			}
			dic[dateAfterTwoDay] = tasksCount;
			
			tasksCount = 1;
			if (dateAfterOneWeek in dic) {
				tasksCount = dic[dateAfterOneWeek];
				tasksCount += 1;
			}
			dic[dateAfterOneWeek] = tasksCount;

			tasksCount = 1;
			if (dateAfterOneMonth in dic) {
				tasksCount = dic[dateAfterOneMonth];
				tasksCount += 1;
			}
			dic[dateAfterOneMonth] = tasksCount;
		});
		// Cancel all local notification.
		PushNotificationIOS.cancelAllLocalNotifications();

		// Schedule local notification by date.
		for (var dateTime in dic) {
			var tasksCount = dic[dateTime];
			console.log('今天你有' + tasksCount + '个任务需要复习，请一定要完成它！🙇');
			console.log(dateTime + ' -> ' + moment(dateTime) + ' -> ' + moment(dateTime).format(format));
			PushNotificationIOS.scheduleLocalNotification({
				alertBody: '今天你有 ' + tasksCount + ' 个任务需要复习，请一定要完成它！🙇',
				fireDate: moment(dateTime).format("YYYY-MM-DDTHH:mm:ss.sssZ"),
			});
		}
	},

};

module.exports = TaskNotification;