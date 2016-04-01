import React, {
	View,
	Text,
	StyleSheet,
	Component,
	ListView
} from 'react-native';

import NoTasksMessage from './NoTasksMessage';
import TaskStore from '../stores/TaskStore';
import TaskCell from './TaskCell';
import Detail from './Detail';
import ButtonActions from '../actions/ButtonActions';

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#EEEEF4',		
		flex: 1
	}
});

class TodayTodo extends Component {

	constructor(props) {
		super(props);
		var data = TaskStore.getTodayTodo();
		var dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.guid !== r2.guid });

		this.state = {
			data: data,
			dataSource: dataSource.cloneWithRows(data)
		};
	}

	render() {
		return (
			<View style={ styles.container }>
			<ListView 
			style={{ backgroundColor: this.state.data.length > 0 ? 'white' : '#EEEEF4' }} 
			dataSource={this.state.dataSource}
			renderRow={this.renderRow.bind(this)} />
			<NoTasksMessage visible={this.state.data.length <= 0} message='无复习任务' />
			</View>
			);
	}

	renderRow(rowData, sectionID, rowID) {
		return (<TaskCell data={rowData} onPress={ () => this._pressRow(rowID, rowData) } />);
	}

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

module.exports = TodayTodo;