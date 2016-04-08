import React, {
	TextInput,
	Image,
	View,
	StyleSheet,
	TouchableHighlight,
	Component
} from 'react-native';

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
		flex: 1,
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
	}

	propTypes: {
		dataString: React.propTypes.string,
		dataDictionary: React.propTypes.any,
		onTextChange: React.propTypes.func
	}


	render() {
		var dic = this.props.DataDictionary;
		// var dic = {
		// 	'text1': 'Hello world',
		// 	'text2': '你好，世界'
		// };
		
		// console.log(dic);
		if (!dic || dic.length === 0) {
			//return <TextInput style={ styles.titleInput } multiline={true} onChange={this._onTextChange.bind(this, 'key')} placeholder='输入任务内容' />
			dic = {
				'text1': '',
				'text2': ''
			};
		}
		var bodyComponents = [];
		for (var key in dic) {
			if (key.indexOf('text') > -1) {
				var text = dic[key];
				bodyComponents.push(<TextInput key={key} multiline={true} onChange={this._onTextChange.bind(this, key)} placeholder='输入任务内容' style={styles.titleInput} />);
			} else if (key.indexOf('img') > -1) {
				var img = dic[key];
				bodyComponents.push(<Image  />);
			}
		}
		// return (<tbody>{rows}</tbody>);
		return(
			<View style={{flex: 1}}>
				{bodyComponents}
			</View>
			);
	}

	_onTextChange(key, event) {
		this.props.onTextChange && this.props.onTextChange(event, key);
	}
}

module.exports = RichContentInput;
