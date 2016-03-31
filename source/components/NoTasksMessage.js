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
	floatLabel: {
		color: 'gray',
		fontSize: 22
	}
});

class NoTasksMessage extends Component {
	propTypes: {
		visible: Rect.propTypes.bool
	}

	render() {
		if (!this.props.visible) {
			return null;
		}
		return(
			<View style={ styles.container } >
				<Text style={ styles.floatLabel }>未添加任务</Text>
			</View>
			);
	}
}

module.exports = NoTasksMessage;