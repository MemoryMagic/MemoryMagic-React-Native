'use strict';

var React = require('react-native');
var ImagePickerManager = require('NativeModules').ImagePickerManager;
var AppDispatcher = require('NativeModules').AppDispatcher;
var SQLite = require('react-native-sqlite');
var database = SQLite.open("tasks.sqlite");
var TaskList = require('./TaskList');
var TaskActions = require('../actions/TaskActions');
var ButtonStore = require('../stores/ButtonStore');
var KeyboardSpacer = require('react-native-keyboard-spacer');
import KeyboardToolBar from './KeyboardToolBar';
import RichContentInput from './RichContentInput';

function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	s4() + '-' + s4() + s4() + s4();
}

var {
	StyleSheet,
	View,
	Text,
	TextInput,
	Image,
	TouchableHighlight,
	Component,
	AlertIOS
	// Object
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
			isKeyboardOpened: false,
			dataDictionary: {}
		};
	}

	componentWillUnmount() {
		ButtonStore.removeChangeListener('save', this._onSaveButtonPressed);
	}

	componentDidMount() {
		// this.refs.textInput.focus(); => autoFocus={true}
	}
  				// <KeyboardToolBar style={{ height: this.state.isKeyboardOpened ? 50 : 0 }} />
	
	// <TextInput
	// 				ref='textInput'
	// 				returnKeyType={'default'}
	// 				enablesReturnKeyAutomatically={false}
	// 				style={styles.titleInput}
	// 				value={this.state.titleString}
	// 				onChange={this.onTitleTextChanged.bind(this)} 
	// 				onKeyPress={this.onKeyPress}
	// 				blurOnSubmit={false}
	// 				placeholder='输入任务内容'
	// 				autoGrow={true}
	// 				autoFocus={true}
	// 				multiline={true} />
	render() {
		return (
			<View style={ styles.container } >
				<View style={styles.titleContainer}>
					<RichContentInput ref='richContentInput' dataDictionary={this.state.dataDictionary} onTextChange={this._onRichContentTextChange.bind(this)} />
				</View>
  				<KeyboardToolBar hidden = { !this.state.isKeyboardOpened }  
  					onCloseButtonPress= { this.onCloseKeyboardButtonPress.bind(this)} 
  					onChooseImageButtonPress = { this.onChooseImageButtonPress.bind(this) } />
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
		this.refs.richContentInput.blur();
	}

	_onRichContentTextChange(event, key) {
		this.setState({
			titleString: event.nativeEvent.text
		});
		
		// console.log('key:');
		//console.log(key);
		// console.log('event.nativeEvent:');
		// console.log(event.nativeEvent);
		// return;
		var tempDataDictionary = Object.assign({}, this.state.dataDictionary);
		//console.log(tempDataDictionary);
		tempDataDictionary[key] = event.nativeEvent.text;
		this.setState({
			dataDictionary: tempDataDictionary
		});
		// console.log(this.state.dataDictionary);
	}

	onToolBarPress(event) {

	}

	onTakePhotoButtonPress(event) {
		this.addImage(true);
	}
	onChooseImageButtonPress(event) {
		this.addImage(false);
	}
	addImage(isCamera) {
		// Specify any or all of these keys
		var options = {
			title: '添加照片',
			cancelButtonTitle: '取消',
			takePhotoButtonTitle: '拍照',
			takePhotoButtonHidden: false,
			chooseFromLibraryButtonTitle: '从相册选择',
			chooseFromLibraryButtonHidden: false,
			returnBase64Image: true,
			returnIsVertical: false,
			quality: 0.01,
			allowsEditing: false, 
		};
		var imagePicker;
		if (isCamera) {
			imagePicker = ImagePickerManager.launchCamera;
		} else {
			imagePicker = ImagePickerManager.launchImageLibrary;
		}


		imagePicker(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
				return;
			} else if (response.error) {
				console.log('ImagePickerManager Error: ' + response.error);
				return;
			}
			console.log(response);
			var source = {uri: response.uri.replace('file://', ''), isStatic: true, width: response.width, height: response.height};
			// var source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
			var tempDataDictionary = Object.assign({}, this.state.dataDictionary);
			let key = 'img-' + guid();
			tempDataDictionary[key] = source;
			this.setState({
				dataDictionary: tempDataDictionary
			});
    		
    	});
	}

	onKeyPress(event) {
		console.log("onKeyPress");
		console.log(event);
	}

	_onSaveButtonPressed(event) {
		console.log('onSaveButtonPressed ' + i);
		i += 1;
		if (!this.state.titleString && this.state.titleString === '') {
			this.setState({
				titleString: '默认任务'
			});
		}
		TaskActions.create(this.state.titleString);
		this.props.navigator.pop();
	}

	
}

module.exports = AddTask;