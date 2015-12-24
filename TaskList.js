'use strict';

var React = require('react-native');
var SQLite = require('react-native-sqlite');
var database = SQLite.open("tasks.sqlite");
var Detail = require('./Detail');
var TaskCell = require('./TaskCell');
//var AppDispatcher = require('NativeModules').AppDispatcher;

var {
	StyleSheet,
	ListView,
	View,
	Text,
	PushNotificationIOS,
	Component
} = React;

var styles = StyleSheet.create({
	container: {
		marginTop: 65,
	},
});

class TaskList extends Component {

	constructor(props) {
		super(props);
		var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.guid !== r2.guid });
		// var data = Array.apply(null, {length: 10}).map(Number.call, Number);
		var data = [];
		this.state = {
			data: data,
			dataSource: dataSource.cloneWithRows(data)
		};
		this.loadData();
	}

	componentWillMount() {
		console.log("componentWillMount");
		PushNotificationIOS.addEventListener('notification', this._onChange);	
	}

	componentWillUnmount() {
		console.log("componentWillUnmount");
		PushNotificationIOS.removeEventListener('notification', this._onChange);
	}

	componentDidMount() {
		console.log("componentDidMount");
		// AppDispatcher.register("addSuccess", (responseType, response) => {
		// 	console.log("!!!!!!");
		// 	this.loadData();
		// });
	}
	async loadData() {
		var tasks = [];
		await database.executeSQL(
			"SELECT * from Task",
			[],
			(row) => {
				tasks.push(row);
			},
			(error) =>{
				if (error) {
					console.log("error:", error);
				} else {
					console.log("get data from database success -> tasks: ", tasks);
					this.setState({data: tasks, dataSource: this.state.dataSource.cloneWithRows(tasks)});
				}
			});
	}

	renderRow(rowData, sectionID, rowID) {
		return (<TaskCell data={rowData} onPress={ () => this._pressRow(rowID, rowData) } />);
	}

	render() {
		return (
			<ListView 
			dataSource={this.state.dataSource}
			renderRow={this.renderRow.bind(this)}>
			</ListView>
			);
	}

	_pressRow(rowID: number, propertyGuid: number) {
		console.log('rowID: ' + rowID + ', propertyGuid: ' + propertyGuid);
		console.log('this.state.dataSource: ' + this.state.dataSource);
		console.log('this.state.data: ' + this.state.data);
		var row = this.state.data[rowID];
		console.log('row: ' + row);
		this.props.navigator.push({
			title: 'Detail',
			component: Detail,
			passProps: {
				property: row
			}
		});
	}

}

module.exports = TaskList;