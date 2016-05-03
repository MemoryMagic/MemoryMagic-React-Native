import React, {
	TextInput,
	Image,
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	Component,
	ScrollView,
} from 'react-native';

import OpenURLButton from './OpenURLButton';
import CustomImage from './CustomImage';

var styles = StyleSheet.create({
	titleInput: {
		padding: 1,
		marginLeft: 15,
		marginRight: 15,
		marginTop: 15,
		fontSize: 18,
		borderWidth: 1,
		borderColor: 'lightgray',
		borderRadius: 0,
		color: '#555555',
		alignSelf: 'stretch',
	}
});

function guid() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
		.toString(16)
		.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
	s4() + '-' + s4() + s4() + s4();
}




class RichContentInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			heights: {}
		}
	}

	propTypes: {
		dataString: React.propTypes.string,
		dataDictionary: React.propTypes.any,
		onTextChange: React.propTypes.func,
	}

	blur() {
		console.log(this.refs);
		for (var refKey in this.refs) {
			var refObj = this.refs[refKey];		
			refObj.blur && refObj.blur();
		}
	}

	render() {
		var dic = this.props.dataDictionary;
		//this.fixDictionary(dic);
		var bodyComponents = [];
		for (var key in dic) {
			if (key.indexOf('text') > -1) {
				var text = dic[key];
				let itemHeight = this.state.heights[key];
				if (itemHeight === undefined) {
					itemHeight = 0;
				}
				bodyComponents.push(<TextInput ref={key} key={key} value={text} autoFocus={true} multiline={true} onChange={this._onTextChange.bind(this, key)} onFocus={this._onTextInputFocus.bind(this)} placeholder='请输入任务内容' style={[styles.titleInput, {height: Math.max(35, itemHeight)}]} />);
			} else if (key.indexOf('img') > -1) {
				var img = dic[key];
				bodyComponents.push(<CustomImage key={key} customKey={key} source={img} onRemoveButtonPress={this._onRemoveImageButtonPress.bind(this)} />);
			} else if (key.indexOf('link') > -1) {
				var link = dic[key];
				bodyComponents.push(<OpenURLButton key={key} customKey={key} url={link} onRemoveButtonPress={this._onRemoveLinkButtonPress.bind(this)} />);
			}
		}
		return(
			<View style={{flex: 1}}>
				<ScrollView ref='scrollView' automaticallyAdjustContentInsets={false}>
					{bodyComponents}
				</ScrollView>
			</View>
			);
	}

	_onTextChange(key, event) {
		this.props.onTextChange && this.props.onTextChange(event, key);
		var tempHeights = Object.assign({}, this.state.heights);
		tempHeights[key] = event.nativeEvent.contentSize.height;
		this.setState({
			heights: tempHeights
		});
	}

	_onTextInputFocus(event) {
		console.log(event);

		this.refs.scrollView.scrollTo({
			y: 0,
			animated: true
		});
	}

	_onRemoveImageButtonPress(key) {
		console.log('remove');
		delete this.props.dataDictionary[key]; 
		this.forceUpdate();
	}

	_onRemoveLinkButtonPress(key) {
		delete this.props.dataDictionary[key]; 
		this.forceUpdate();
	}

	fixDictionary(dic) {
		let keys = Object.keys(dic);
		for (i in keys) {
			let key = keys[i];
			let isLastItem = (i == (keys.length - 1));
			let isImage =  key.indexOf('img') > -1;
			if (isLastItem && isImage) {
				let newKey = 'text-' + guid();
				let newValue = '';
				this.addNewItemToDictionary(dic, newKey, newValue);
				break;
			}
		}
	}
	
	addNewItemToDictionary(dic, key, value) {
		dic[key] = value;
	}
}

module.exports = RichContentInput;
