'use strict';

var React = require('react-native');
var Detail = require('./Detail');
var TaskCell = require('./TaskCell');
var TaskStore = require('../stores/TaskStore');
//var AppDispatcher = require('NativeModules').AppDispatcher;
var ButtonActions = require('../actions/ButtonActions');

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
	}
});

class TaskList extends Component {

	constructor(props) {
		super(props);

		//TaskStore.showAppleStockPriceAsync();
		TaskStore.init();
		var data = TaskStore.getAll();
		var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.guid !== r2.guid });

		this.state = {
			data: data,
			dataSource: dataSource.cloneWithRows(data)
		};
	}

	componentWillMount() {
	}

	componentWillUnmount() {
		TweetStore.removeChangeListener(this._onChange);
	}

	componentDidMount() {
		TaskStore.addChangeListener(this._onChange.bind(this));
	}

	_onChange() {
		var data = TaskStore.getAll();		
		var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.guid !== r2.guid });

		// for (var i = 0; i < data.length; i++) {
		// 	var item = data[i];
		// 	console.log(item);
		// }

		this.setState({
			data: data,
			dataSource: dataSource.cloneWithRows(data)
		});
	}

	render() {
		
		return (
			<ListView 
			dataSource={this.state.dataSource}
			renderRow={this.renderRow.bind(this)}>
			</ListView>
			);
	}

	renderRow(rowData, sectionID, rowID) {
		return (<TaskCell data={rowData} onPress={ () => this._pressRow(rowID, rowData) } />);
	}
// 			rightButtonIcon: require('image!NavBarButtonTransh'),

	_pressRow(rowID: number, propertyGuid: number) {
		//console.log('rowID: ' + rowID + ', propertyGuid: ' + propertyGuid);
		var row = this.state.data[rowID];
		console.log('row: ' + row.taskTitle);
		this.props.navigator.push({
			title: '任务详情',
			rightButtonTitle: '删除',
			onRightButtonPress: () => {
				 ButtonActions.click('trash');
				 console.log('click trash');
			 },
			component: Detail,
			passProps: {
				property: row
			}
		});
	}
}

module.exports = TaskList;