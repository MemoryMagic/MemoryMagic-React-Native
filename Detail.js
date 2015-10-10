'use strict';

var React = require('react-native');

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
	container: {
		marginTop: 10,
		marginBottom: 10,
		resizeMode: 'cover',
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

		return (
			<View style={styles.container}>
				<ScrollView>
					<Text style={styles.title}>{property}</Text>
					<Text style={styles.title}>{property}</Text>
					<Text style={styles.title}>{property}</Text>
					<Text style={styles.title}>{property}</Text>
					<Text style={styles.title}>{property}</Text>
				</ScrollView>
			</View>
		);
	}
}

module.exports = Detail;