import React, {
	Component,
	View,
	Text,
	TouchableHighlight,
	StyleSheet
} from 'react-native';

var styles = StyleSheet.create({
	button: {
		opacity: 1,
		width: 30,
		height: 30,
		alignItems: 'flex-end',
	},
	buttonText: {
		backgroundColor: 'rgba(241,133,128,1.0)',
		color: 'white',
		textAlign: 'center',
		width: 20,
		height: 20,
		fontSize: 16
	}
});

class RemoveButton extends Component {

	propTypes: {
		onRemoveButtonPress: React.PropTypes.func
	}
	_onRemoveButtonPress() {
		this.props.onRemoveButtonPress && this.props.onRemoveButtonPress();
	}

	render() {
		return (
			<View>
				<TouchableHighlight 
					onPress={this._onRemoveButtonPress.bind(this)} 
					underlayColor='transparent'>
					<View style={styles.button}>
						<Text style={styles.buttonText}>×</Text>
					</View>
				</TouchableHighlight>
			</View>
			);
	}
}

module.exports = RemoveButton;