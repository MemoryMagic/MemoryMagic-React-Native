import React, {
	TextInput,
	Image,
	View,
	Text,
	StyleSheet,
	TouchableHighlight,
	Component
} from 'react-native';

import Dimensions from 'Dimensions';

var styles = StyleSheet.create({
	titleInput: {
		padding: 1,
		margin: 15,
		fontSize: 18,
		borderWidth: 1,
		borderColor: 'lightgray',
		borderRadius: 0,
		color: '#555555',
		alignSelf: 'stretch',
	},
	image: {
		resizeMode: 'stretch',
		marginLeft: 15,
		marginRight: 15,
		alignItems: 'flex-end'
	},
	removeButton: {
		opacity: 0.5,
		width: 30,
		height: 30,
		alignItems: 'flex-end',
	},
	removeText: {
		backgroundColor: 'red',
		color: 'white',
		textAlign: 'center',
		width: 20,
		height: 20,
		fontSize: 16
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

class CustomImage extends Component {
	propTypes: {
		customKey: React.propTypes.string,
		source: React.propTypes.any,
		onRemoveButtonPress: React.propTypes.func
	}

	render() {
		let width = Dimensions.get('window').width - 30;
		let height = width * this.props.source.height / this.props.source.width;
		return (
			<View>
				<Image ref='img' key={this.props.customKey} style={[styles.image, {width: width, height: height}]} source={this.props.source}>
				<TouchableHighlight onPress={this._onRemoveButtonPress.bind(this)}>
					<View style={ styles.removeButton }>
						<Text style={styles.removeText}>×</Text>
					</View>
				</TouchableHighlight>
				</Image>
			</View>
			);
	}
	_onRemoveButtonPress() {
		console.log('_onRemoveButtonPress');
		this.props.onRemoveButtonPress && this.props.onRemoveButtonPress(this.props.customKey);
	}
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
		console.log('RichContentInput - render()');
		var dic = this.props.dataDictionary;
		if (!dic || Object.keys(dic).length === 0) {
			dic = {
				'text-defaultkey': ''
			};
		}
		this.fixDic(dic);
		var bodyComponents = [];
		for (var key in dic) {
			if (key.indexOf('text') > -1) {
				var text = dic[key];
				let itemHeight = this.state.heights[key];
				if (itemHeight === undefined) {
					itemHeight = 0;
				}
				bodyComponents.push(<TextInput ref={key} key={key} value={text} autoFocus={true} multiline={true} onChange={this._onTextChange.bind(this, key)} placeholder='' style={[styles.titleInput, {height: Math.max(35, itemHeight)}]} />);
			} else if (key.indexOf('img') > -1) {
				var img = dic[key];
				bodyComponents.push(<CustomImage key={key} customKey={key} source={img} onRemoveButtonPress={this._onRemoveImageButtonPress.bind(this)} />);
			}
		}
		return(
			<View style={{flex: 1}}>
				{bodyComponents}
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

	_onRemoveImageButtonPress(key) {
		delete this.props.dataDictionary[key]; 
		this.forceUpdate();
	}
	fixDic(dic) {
		let keys = Object.keys(dic);
		for (i in keys) {
			let key = keys[i];
			let isLastItem = (i == (keys.length - 1));
			if (isLastItem && key.indexOf('img') > -1) {
				let newKey = 'text-' + guid();
				dic[newKey] = '';
				break;
			}
		}
	}
}

module.exports = RichContentInput;
