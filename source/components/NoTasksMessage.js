import React, {
	StyleSheet,
	View,
	Text,
	Component
} from 'react-native';

var styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
		flex: 1,
	},
	message: {
		color: 'gray',
		fontSize: 22
	}
});

class NoTasksMessage extends Component {
	propTypes: {
		visible: Rect.propTypes.bool,
		message: Rect.propTypes.string
	}

	render() {
		if (!this.props.visible) {
			return null;
		}
		return(
			<View style={ styles.container } >
				<Text style={ styles.message }>{this.props.message}</Text>
			</View>
			);
	}
}

module.exports = NoTasksMessage;