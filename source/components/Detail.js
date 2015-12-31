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

		var date = new Date();
		var dateString = date.toISOString();

		dateString = moment(date).format("YYYY-MM-DD HH:mm")
		return (
			<View style={styles.container}>
			<ScrollView>
			<Text style={styles.title}>{property.taskTitle}</Text>
			<Text style={styles.title}>{dateString}</Text>
			</ScrollView>
			</View>
			);
	}
}

module.exports = Detail;