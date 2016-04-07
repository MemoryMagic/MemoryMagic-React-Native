'use strict';

var React = require('react-native');
var UIImagePickerManager = require('NativeModules').UIImagePickerManager;
var AppDispatcher = require('NativeModules').AppDispatcher;
var SQLite = require('react-native-sqlite');
var database = SQLite.open("tasks.sqlite");
var TaskList = require('./TaskList');
var TaskActions = require('../actions/TaskActions');
var ButtonStore = require('../stores/ButtonStore');
var KeyboardSpacer = require('react-native-keyboard-spacer');
import KeyboardToolBar from './KeyboardToolBar';

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
		marginTop: 60,
		flexDirection: 'column', 
		flex: 1

	},
	titleContainer: {
		flex: 1, //5
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	titleInput: {
		padding: 1,
		margin: 15,
		fontSize: 18,
		borderWidth: 0,
		borderColor: 'lightgray',
		borderRadius: 0,
		color: '#555555',
		alignSelf: 'stretch',
		flex: 1,
	},
	addImageButton: {
		flex: 1
	},
	imageContainer: {
		flex: 9,
		alignSelf: 'stretch',
		marginLeft: 20,
		marginRight: 20,
	},
	addImageButton: {
		width: 146,
	}
});
	var i = 0

class AddTask extends Component {
	
	constructor(props) {
		super(props);
		ButtonStore.addChangeListener('save', this._onSaveButtonPressed.bind(this));

		this.state = {
			titleString: '',
			isKeyboardOpened: false
		};
	}

	componentWillUnmount() {
		ButtonStore.removeChangeListener('save', this._onSaveButtonPressed);
	}

	componentDidMount() {
		// this.refs.textInput.focus(); => autoFocus={true}
	}
  				// <KeyboardToolBar style={{ height: this.state.isKeyboardOpened ? 50 : 0 }} />
	
	render() {
		return (
			<View style={ styles.container } >
				<View style={styles.titleContainer}>
					<TextInput
					ref='textInput'
					returnKeyType={'default'}
					enablesReturnKeyAutomatically={false}
					style={styles.titleInput}
					value={this.state.titleString}
					onChange={this.onTitleTextChanged.bind(this)} 
					onKeyPress={this.onKeyPress}
					blurOnSubmit={false}
					placeholder='输入任务内容'
					autoGrow={true}
					autoFocus={true}
					multiline={true} />
				</View>
  				<KeyboardToolBar hidden = { !this.state.isKeyboardOpened } onCloseButtonPress= { this.onCloseKeyboardButtonPress.bind(this)} />
				<KeyboardSpacer onToggle={this.keyboardOnToggle.bind(this)} />
			</View>
			);
	}

	keyboardOnToggle(isKeyboardShown, keyboardSpace) {
		this.setState({
    		isKeyboardOpened: isKeyboardShown
    	});
	}

	onCloseKeyboardButtonPress(event) {
		console.log('AddTask - onCloseKeyboardButtonPress');
		this.refs.textInput.blur();
	}

	onToolBarPress(event) {
	}

	onAddImagePressed(event) {
		// Specify any or all of these keys
		var options = {
			title: '添加照片',
			cancelButtonTitle: '取消',
			takePhotoButtonTitle: '选择.',
			takePhotoButtonHidden: false,
			chooseFromLibraryButtonTitle: '从相册选择',
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

	_onSaveButtonPressed(event) {
		console.log('onSaveButtonPressed ' + i);
		i += 1;
		TaskActions.create(this.state.titleString);
		this.props.navigator.pop();
	}

	
}

module.exports = AddTask;