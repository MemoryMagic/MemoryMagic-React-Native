'use strict';

var React = require('react-native');
var moment = require('moment');

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
	title: {
		fontSize: 21,
		marginTop: 0,
		marginLeft: 15,
		marginRight: 15,
	}
});

class Detail extends Component {
	render() {
		var property = this.props.property;
		console.log("property: ", property);


		let dateString = moment().format("YYYY-MM-DD HH:mm");
		let dateStringDay = moment().add(1, 'days').format("YYYY-MM-DD HH:mm");
		let dateStringWeek = moment().add(1, 'weeks').format("YYYY-MM-DD HH:mm");
		let dateStringMonth = moment().add(1, 'months').format("YYYY-MM-DD HH:mm");
		return (
			<View style={styles.container}>
			<ScrollView>
			
			<Text style={styles.title}>{property.taskTitle}</Text>
			<Text style={styles.title}>{dateString}</Text>
			<Text style={styles.title}>{dateStringDay}</Text>
			<Text style={styles.title}>{dateStringWeek}</Text>
			<Text style={styles.title}>{dateStringMonth}</Text>

			</ScrollView>
			</View>
			);
	}
}

module.exports = Detail;