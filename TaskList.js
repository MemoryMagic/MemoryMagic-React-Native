'use strict';

var React = require('react-native');
var SQLite = require('react-native-sqlite');
var database = SQLite.open("tasks.sqlite");
var Detail = require('./Detail');
var disclosure_indicator = require('image!disclosure_indicator');
var {
	StyleSheet,
	ListView,
	View,
	Text,
	Image,
	TouchableHighlight,

	Component
} = React;

var styles = StyleSheet.create({
	container: {
		marginTop: 65,
	},
	textContainer: {
		flex: 1
	},
	separator: {
		height: 0.3,
		backgroundColor: '#C8C7CC',
		marginBottom: 0,
	},
	title: {
		fontSize: 16,
		color: 'black',
		alignSelf: 'center',
		marginLeft: 10,
		flex: 9,
		textAlign: 'left'
	},
	rowContainer: {
		height: 65,
		flexDirection: 'row',
		padding: 10,
	},
	disclosureIndicator: {
		marginRight: 10,
		alignSelf: 'center'
	}
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

	 async loadData() {
		var tasks = ['The magnitude of the acceleration of an object is directly proportional to the net force applied to the object, and inversely proportional to the object\'s mass. The direction of the acceleration is the same as the direction of the net force.',
			'The magnitude of the acceleration of an object is directly proportional to the net force applied to the object',
			'and inversely proportional to the object\'s mass. ',
			'The direction of the acceleration is the same as the direction of the net force.'];
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
		return (
			<TouchableHighlight 
			onPress={() => this._pressRow(rowID, rowData)}
			underlayColor='#dddddd'>
			<View>
			<View style={styles.rowContainer}>
			<Text numberOfLines={2} style={styles.title}>{rowData}</Text>
			<Image source={require('image!disclosure_indicator')} style={styles.disclosureIndicator} />
			</View>
			<View style={styles.separator} />
			</View>
			</TouchableHighlight>
			);
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
			title: row,
			component: Detail,
			passProps: {property: row}
		});
	}

}

module.exports = TaskList;