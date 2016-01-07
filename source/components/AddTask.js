'use strict';

var React = require('react-native');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
var AppDispatcher = require('NativeModules').AppDispatcher;
var SQLite = require('react-native-sqlite');
var database = SQLite.open("tasks.sqlite");
var TaskList = require('./TaskList');
var TaskActions = require('../actions/TaskActions');

var {
	StyleSheet,
	View,
	Text,
	TextInput,
	Image,
	TouchableHighlight,
	Component
} = React;

var styles = StyleSheet.create({

	// resizeMode: 'cover',
	container: {
		marginTop: 65,
		flexDirection: 'column',
		alignItems: 'center',
		flex: 1,
	},
	titleContainer: {
		flex: 5, //1
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	titleInput: {
		padding: 1,
		marginTop: 20,
		marginLeft: 20,
		marginRight: 20,
		marginBottom: 20,
		fontSize: 18,
		borderWidth: 0,
		borderColor: 'lightgray',
		borderRadius: 0,
		color: '#48bbec',
		alignSelf: 'stretch',
		flex: 1,
		height: 30
	},
	
	imageContainer: {
		flex: 9,
		alignSelf: 'stretch',
		marginLeft: 20,
		marginRight: 20,
	},
	addImageButton: {
		width: 146,
	},
	saveButtonContainer: {
		flex: 1, //3
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	saveButton: {
		height: 49, 
		backgroundColor: '#42e47e',
		marginLeft: 20,
		marginRight: 20,
		marginBottom: 0,
		justifyContent: 'center',
		alignSelf: 'stretch'
	},
	buttonText: {
		alignSelf: 'center',
		fontSize: 18,
		color: 'white'
	}
});

class AddTask extends Component {
	
	constructor(props) {
		super(props);
		this.state = {
			titleString: ''
		};
	}
	
			
	render() {
		return (
			<View style={styles.container}>
			<View style={styles.titleContainer}>
			<TextInput
			ref='textInput'
			returnKeyType={'done'}
			enablesReturnKeyAutomatically={true}
			style={styles.titleInput}
			value={this.state.titleString}
			onChange={this.onTitleTextChanged.bind(this)} 
			onKeyPress={this.onKeyPress}
			blurOnSubmit={true}
			placeholder='Please enter the title'
			autoGrow={true}
			multiline={true} />
			</View>
			
			<View style={styles.saveButtonContainer}>
			<TouchableHighlight underlayColor='#dddddd' style={styles.saveButton}
			onPress={this.onSaveButtonPressed.bind(this)}>
			<Text style={styles.buttonText}>Save</Text>
			</TouchableHighlight>
			</View>
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

	onTitleTextChanged(event) {
		console.log('onTitleTextChanged');
		console.log(event.nativeEvent.text);
		// if (event.nativeEvent.text === '\n') {
		// 	this.refs.textInput.blur();
		// 	return
		// }
		this.setState({ titleString: event.nativeEvent.text });
	}

	onKeyPress(event) {
		console.log("onKeyPress");
		console.log(event);
	}

	onSaveButtonPressed(event) {
		console.log('onSaveButtonPressed');

		TaskActions.create(this.state.titleString);

		this.props.navigator.pop();
	}

	
}

module.exports = AddTask;