'use strick';

var React = require('react-native');
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
		flex: 9
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
		var data = ['Amsterdam', 'Rotterdam', 'The Hague', 'Number'];
		this.state = {
			dataSource: dataSource.cloneWithRows(data)
		};
	}

	renderRow(rowData, sectionID, rowID) {
		return (
			<TouchableHighlight>
				<View>
					<View style={styles.rowContainer}>
						<Text style={styles.title}>{rowData}</Text>
						<Image source={require('image!disclosure_indicator')} style={styles.disclosureIndicator} />
					</View>
					<View style={styles.separator} />
				</View>
			</TouchableHighlight>
			);
	}

	render() {
		// return <View style={styles.container}>
		// 	<Text style={styles.title}>A.jgfhjdghsdsdsfdjgfhgjkgjf</Text>
		// </View>
		return (
			<ListView 
				dataSource={this.state.dataSource}
				renderRow={this.renderRow.bind(this)}>
			</ListView>
			);
	}

}

module.exports = TaskList;