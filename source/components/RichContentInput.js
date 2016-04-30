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
		if (!dic || Object.keys(dic).length === 0) {
			dic = {
				'text1': ''
			};
		}
		//console.log('dic:');
		//console.log(dic);
		this.fixDic(dic);
		//console.log(dic);
		var bodyComponents = [];
		for (var key in dic) {
			//console.log('key: ' + key);
			if (key.indexOf('text') > -1) {
				var text = dic[key];
				let itemHeight = this.state.heights[key];
				//console.log(itemHeight);
				if (itemHeight === undefined) {
					itemHeight = 0;
				}
				bodyComponents.push(<TextInput ref={key} key={key} value={text} autoFocus={true} multiline={true} onChange={this._onTextChange.bind(this, key)} placeholder='输入任务内容' style={[styles.titleInput, {height: Math.max(35, itemHeight)}]} />);
			} else if (key.indexOf('img') > -1) {
				var img = dic[key];
				//console.log(img);
				bodyComponents.push(<Image key={'img'+key} style={styles.image} source={img} />);
			}
		}
		//this.fix(bodyComponents);
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

	fixDic(dic) {
		let keys = Object.keys(dic);
		// console.log(keys);
		for (i in keys) {
			let key = keys[i];
			console.log(key);
			let isLastItem = (i == (keys.length - 1));
			console.log('i: ' + i);
			console.log(isLastItem);
			console.log(key.indexOf('img') > -1);
			if (isLastItem && key.indexOf('img') > -1) {
				// keys.push('txt' + guid());
				let newKey = 'text' + guid();
				dic[newKey] = '';
				//console.log('set newKey');
				//this.fixDic(keys);
				break;
			}
		}
	}
}

module.exports = RichContentInput;
