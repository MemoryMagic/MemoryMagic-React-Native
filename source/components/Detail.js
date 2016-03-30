'use strict';

var React = require('react-native');
var moment = require('moment');
let format = "M月D日 早6时"
var ButtonStore = require('../stores/ButtonStore');
var TaskActions = require('../actions/TaskActions');
var {
	StyleSheet,
	Image,
	View,
	TouchableHighlight,
	Text,
	ScrollView,
	Component,
	ActionSheetIOS
} = React;

var styles = StyleSheet.create({
	// resizeMode: 'cover',
	container: {
		marginTop: 10,
		marginBottom: 10,
		flexDirection: 'column',
		alignItems: 'stretch',
		flex: 1,
	},
	message: {
		fontSize: 16,
		marginTop: 30,
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 2,
	},

	title: {
		fontSize: 20,
		marginTop: 10,
		marginLeft: 15,
		marginRight: 15,
	},

	createTime: {
		color: 'gray',
		fontSize: 12,
		marginTop:4,
		marginLeft: 15,
		marginRight: 15,

	},

	normalTime: {
		fontSize: 18,
		marginTop:5,
		marginLeft: 15,
		marginRight: 15,

	},

	passTime: {
		color: 'gray',
		fontSize: 18,
		marginTop:0,
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 10,

	},

	futureTime: {
		fontSize: 18,
		marginTop: 0,
		marginLeft: 15,
		marginRight: 15,
		marginBottom: 10,
	}
});

var BUTTONS = [
'删除',
'取消',
];
var DELETE_INDEX = 0;
var CANCEL_INDEX = 1;

class Detail extends Component {
	render() {
		var task = this.props.property;
		console.log("task: ", task);

		let now = moment();

		let createTime = moment(task.createTime);
		let createTime6am = createTime.startOf('day').add(6, 'hours');
		let dateAfterOneDay = moment(createTime6am).add(1, 'days');
		let dateAfterTwoDay = moment(createTime6am).add(2, 'days');
		let dateAfterOneWeek = moment(createTime6am).add(1, 'weeks');
		let dateAfterOneMonth = moment(createTime6am).add(1, 'months');

		let isNowBeforeOneDay = now.isBefore(dateAfterOneDay);
		let isNowBeforeTwoDay = now.isBefore(dateAfterTwoDay);
		let isNowBeforeOneWeek = now.isBefore(dateAfterOneWeek);
		let isNowBeforeOneMonth = now.isBefore(dateAfterOneMonth);
		return (
			<View style={styles.container}>
			<ScrollView>
			<Text style={styles.title}>{task.taskTitle}</Text>
			<Text style={ styles.createTime }>{ task.createTime }</Text>
			<Text style={styles.message}>根据艾宾浩斯遗忘曲线规律，你将在以下时间得到复习提醒:</Text>
			<Text style={ styles.createTime }>一天后:</Text>
			<Text style={ isNowBeforeOneDay ? styles.futureTime : styles.passTime }>{dateAfterOneDay.format(format)} </Text>
			<Text style={ styles.createTime }>两天后:</Text>
			<Text style={ isNowBeforeTwoDay ? styles.futureTime : styles.passTime }>{dateAfterTwoDay.format(format)} </Text>
			<Text style={ styles.createTime }>一周后:</Text>
			<Text style={ isNowBeforeOneWeek ? styles.futureTime : styles.passTime }>{dateAfterOneWeek.format(format)} </Text>
			<Text style={ styles.createTime }>一月后:</Text>
			<Text style={ isNowBeforeOneMonth ? styles.futureTime : styles.passTime }>{dateAfterOneMonth.format(format)} </Text>

			</ScrollView>
			</View>
			);
	}

	componentWillUnmount() {
		console.log('remove transh listener');
		ButtonStore.removeChangeListener('trash', this._onTrashButtonClicked);
	}
	
	componentDidMount() {
		console.log('add transh listener');
		ButtonStore.addChangeListener('trash', this._onTrashButtonClicked.bind(this));
	}
	
	_onTrashButtonClicked() {
		console.log('show ActionSheet');
		this.showActionSheet();
	}

	deleteTask() {
		var task = this.props.property
		TaskActions.delete(task.taskId);
		this.props.navigator.pop();
	}

	showActionSheet() {
		ActionSheetIOS.showActionSheetWithOptions({
			options: BUTTONS,
			destructiveButtonIndex: DELETE_INDEX,
			cancelButtonIndex: CANCEL_INDEX,

		},
		(buttonIndex) => {
			console.log('index: ' + buttonIndex);
			if (buttonIndex === 0) {
				this.deleteTask();
			}
		});
	}
}

module.exports = Detail;