import React, {
StyleSheet,
Component,
TouchableHighlight,
Image,
Text,
View
} from 'react-native';

import Dimensions from 'Dimensions';
import RemoveButton from './RemoveButton';

var styles = StyleSheet.create({
	image: {
		resizeMode: 'stretch',
		marginLeft: 15,
		marginRight: 15,
		marginTop: 15,
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
	},
});

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
				<RemoveButton onRemoveButtonPress={this._onRemoveButtonPress.bind(this)} />
				</Image>
			</View>
			);
	}
	_onRemoveButtonPress() {
		this.props.onRemoveButtonPress && this.props.onRemoveButtonPress(this.props.customKey);
	}
}

module.exports = CustomImage;