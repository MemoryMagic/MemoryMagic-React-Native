'use strict';

var React = require('react-native');
var disclosure_indicator = require('image!disclosure_indicator');

var {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableHighlight,
	Component
} = React;

var styles = StyleSheet.create({
	container: {
		height: 65,
		flexDirection: 'row',
		padding: 10,
	},
	
	title: {
		fontSize: 17,
		color: '#555555',
		alignSelf: 'center',
		marginLeft: 10,
		flex: 9,
		textAlign: 'left'
	},

	disclosureIndicator: {
		marginRight: 10,
		alignSelf: 'center'
	},

	separator: {
		height: 0.3,
		backgroundColor: '#C8C7CC',
		marginBottom: 0,
	}
});

class TaskCell extends Component {

	propTypes: {
		// customText: React.propTypes.string,
		onPress: React.propTypes.func,
		data: React.propTypes.any,
		isTodayTodo: React.propTypes.bool
	}

	constructor(props) {
		super(props);
	}

	render() {
		var color = () => {
			if (this.props.isTodayTodo) {
				return '#32bec3'
			}
			return '#555555'
		}
		var title = {
			fontSize: 17,
			color: color(),
			alignSelf: 'center',
			marginLeft: 10,
			flex: 9,
			textAlign: 'left'
		}
		//console.log('cell: ' + this.props.data.taskId + ': ' + this.props.data.taskTitle);
		return (
			<TouchableHighlight 
			onPress={(rowID, rowData) => this._pressRow(rowID, rowData)}
			underlayColor='#dddddd'>
			<View>
			<View style={styles.container}>
			<Text numberOfLines={2} style={ title }>{this.props.data.taskTitle}</Text>
			<Image source={require('image!disclosure_indicator')} style={styles.disclosureIndicator} />
			</View>
			<View style={styles.separator} />
			</View>
			</TouchableHighlight>
			); 
	}

	_pressRow(rowID: number, propertyGuid: number) {
		this.props.onPress && this.props.onPress(rowID, propertyGuid);
	}
}

module.exports = TaskCell;