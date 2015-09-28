'use strict';

var React = require('react-native');

var {
	StyleSheet,
	Image,
	View,
	TouchableHighlight,
	Text,
	Component
} = React;

var styles = StyleSheet.create({

});

class Detail extends Component {
	render() {
		var property = this.props.property;

		return (
			<View>
				<Text>{property}</Text>
			</View>
		);
	}
}

module.exports = Detail;