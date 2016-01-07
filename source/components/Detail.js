'use strict';

var React = require('react-native');
var moment = require('moment');
let format = "YYYY-MM-DD HH:mm"
var {
	StyleSheet,
	Image,
	View,
	TouchableHighlight,
	Text,
	ScrollView,
	Component
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
		color: 'lightgray',
		fontSize: 12,
		marginTop: 15,
		marginLeft: 15,
		marginRight: 15,
	},

	title: {
		fontSize: 21,
		marginTop: 0,
		marginLeft: 15,
		marginRight: 15,
	},

	createTime: {
		color: 'gray',
		fontSize: 16,
		marginTop:5,
		marginLeft: 15,
		marginRight: 15,

	},

	passTime: {
		color: 'green',
		fontSize: 16,
		marginTop:0,
		marginLeft: 15,
		marginRight: 15,

	},

	futureTime: {
		color: 'red',
		fontSize: 16,
		marginTop: 0,
		marginLeft: 15,
		marginRight: 15,
	}
});

class Detail extends Component {
	render() {
		var task = this.props.property;
		console.log("task: ", task);

		let now = moment();

		let createTime = moment(task.createTime, format);
		let dateAfterOneDay = moment(createTime).add(1, 'days');
		let dateAfterTwoDay = moment(createTime).add(2, 'days');
		let dateAfterOneWeek = moment(createTime).add(1, 'weeks');
		let dateAfterOneMonth = moment(createTime).add(1, 'months');

		let isNowBeforeOneDay = now.isBefore(dateAfterOneDay);
		let isNowBeforeTwoDay = now.isBefore(dateAfterTwoDay);
		let isNowBeforeOneWeek = now.isBefore(dateAfterOneWeek);
		let isNowBeforeOneMonth = now.isBefore(dateAfterOneMonth);
		return (
			<View style={styles.container}>
			<ScrollView>
			<Text style={styles.title}>Title: {task.taskTitle}</Text>
			<Text style={styles.message}>根据艾宾浩斯遗忘曲线规律，你将在以下时间得到复习提醒⏰。</Text>
			<Text style={ styles.createTime }>Create at: {task.createTime}</Text>
			<Text style={ isNowBeforeOneDay ? styles.futureTime : styles.passTime }>Day 1: {dateAfterOneDay.format(format)}</Text>
			<Text style={ isNowBeforeTwoDay ? styles.futureTime : styles.passTime }>Day 2: {dateAfterTwoDay.format(format)}</Text>
			<Text style={ isNowBeforeOneWeek ? styles.futureTime : styles.passTime }>Day 7: {dateAfterOneWeek.format(format)}</Text>
			<Text style={ isNowBeforeOneMonth ? styles.futureTime : styles.passTime }>Day 30: {dateAfterOneMonth.format(format)}</Text>

			</ScrollView>
			</View>
			);
	}
}

module.exports = Detail;