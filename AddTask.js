'use strict';

var React = require('react-native');

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
		marginTop: 65
	},
	title: {

	},
	button: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#48bbec',
		borderColor: '#48bbec',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 10,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	imageContainer: {
		backgroundColor: 'red',
		width: 146,
		height: 146
	},
	addImageButton: {
		width: 146,
	},
	saveButton: {

	}
});

class AddTask extends Component {
	render() {
		return (
			<View style={styles.container}>
				<TouchableHighlight underlayColor='white'>
					<Image source={require('image!add_image')} />
				</TouchableHighlight>
				<TouchableHighlight underlayColor='#dddddd'>
					<View style={styles.saveButton}>
						<Text>Save</Text>
					</View>
				</TouchableHighlight>
			</View>
		);
	}


}

module.exports = AddTask;