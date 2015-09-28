'use strict';

var React = require('react-native');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;

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
			<TouchableHighlight underlayColor='white' onPress={this.onAddImagePressed.bind(this)}>
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

	onAddImagePressed(event) {
		// Specify any or all of these keys
		var options = {
			title: 'Select Avatar',
			cancelButtonTitle: 'Cancel',
			takePhotoButtonTitle: 'Take Photo...',
			takePhotoButtonHidden: false,
			chooseFromLibraryButtonTitle: 'Choose from Library...',
			chooseFromLibraryButtonHidden: false,

			maxWidth: 100,
			maxHeight: 100,
			returnBase64Image: false,
			returnIsVertical: false,
			quality: 0.2,
			allowsEditing: false, 
		};

		UIImagePickerManager.showImagePicker(options, (responseType, response) => {
			console.log(`Response Type = ${responseType}`);

			if (responseType !== 'cancel') {
				let source;
    		if (responseType === 'data') { // New photo taken OR passed returnBase64Image true -  response is the 64 bit encoded image data string
    			source = {uri: 'data:image/jpeg;base64,' + response, isStatic: true};
    		}
    		else if (responseType === 'uri') { // Selected from library - response is the URI to the local file asset
    			source = {uri: response.replace('file://', ''), isStatic: true};
    		}

    		this.setState({
    			avatarSource: source
    		});
    		}
    	});
	}
}

module.exports = AddTask;