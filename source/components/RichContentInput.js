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
	},
	image: {
		width: 20,
		height: 20
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
		if (!dic || Object.keys(dic).length === 0) {
			dic = {
				'text1': ''
			};
		}


		
		var bodyComponents = [];
		for (var key in dic) {
			console.log('key: ' + key);
			if (key.indexOf('text') > -1) {
				var text = dic[key];
				bodyComponents.push(<TextInput ref={key} key={key} value={text} autoFocus={true} multiline={true} onChange={this._onTextChange.bind(this, key)} placeholder='输入任务内容' style={styles.titleInput} />);
			} else if (key.indexOf('img') > -1) {
				var img = dic[key];
				console.log(img);
				bodyComponents.push(<Image key={'img'+key} style={styles.image} source={img} />);
			}
		}
		this.fix(bodyComponents);
		return(
			<View style={{flex: 1}}>
				{bodyComponents}
			</View>
			);
	}

	_onTextChange(key, event) {
		this.props.onTextChange && this.props.onTextChange(event, key);
	}

	fix(arr) {
		console.log('fix');
		var preItemIsImage = false;
		var changed = false;
		for (i in arr) {
			var item = arr[i];
			console.log('item.key: '+item.key);
			// continue;
			// pre item is image && current item is image
			if (preItemIsImage && item.key.indexOf('img') > -1) {
				arr.splice(i,0,<TextInput ref={'txt'+guid()} key={'txt'+guid()} autoFocus={true} multiline={true} onChange={this._onTextChange.bind(this, item.key)} style={styles.titleInput} />);
				this.fix(arr);
				break;
			} 
			
			console.log('i === arr.length-1 => ' + i + ' === ' + (arr.length-1) + (i==(arr.length-1)));
			// last item is image
			if (item.key.indexOf('img') > -1 && i == (arr.length-1)) {
				arr.push(<TextInput ref={'txt'+guid()} key={'txt'+guid()}  autoFocus={true} multiline={true} onChange={this._onTextChange.bind(this, item.key)} style={styles.titleInput} />);
				this.fix(arr);
				break;
			}

			if (
				item.key.indexOf('img') > -1) {
				preItemIsImage = true;
			} else {
				preItemIsImage = false;
			}
		}
	}
}

module.exports = RichContentInput;
