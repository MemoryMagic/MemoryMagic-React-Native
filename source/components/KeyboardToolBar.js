import React, {
	View,
	StyleSheet,
	Component,
	TouchableHighlight,
	Image
} from 'react-native';

var styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'stretch',
		height: 40
	},
	itemButton: {
		alignSelf: 'center',
		flex: 1,
		tintColor: 'gray',
		margin: 10,
		height: 20,
		width: 20
	},
	itemButtonTouch: {
		flex: 1
	}

});

class KeyboardToolBar extends Component {
	
	propTypes: {
		hidden: React.propTypes.bool,
		onCloseButtonPress: React.propTypes.func,
		onLinkButtonPress: React.propTypes.func,
		onCameraButtonPress: React.propTypes.func,
		onImageButtonPress: React.propTypes.func,
	}

	constructor(props) {
		super(constructor);
	}

	render() {
		return (
			this.props.hidden ? null :
			<View>
				<View style={{height: 0.5, backgroundColor: 'lightgray'}} />
				<View style={ styles.container }>
					<View style={{ flex: 1 }}>
						<TouchableHighlight underlayColor='white' style={ styles.itemButtonTouch } onPress={ this._onCloseButtonPress.bind(this) }>
 								<Image source={require('image!ToolBarDismissKeyboard')} style={ styles.itemButton }/> 
 						</TouchableHighlight>
					</View>
					
					<View style={{ flex: 1 }}>
						<TouchableHighlight underlayColor='white' style={ styles.itemButtonTouch } onPress={ this._onLinkButtonPress.bind(this) }>
								<View />
						</TouchableHighlight>
					</View>
					
					<View style={{ flex: 1 }} ></View>

					<View style={{ flex: 1 }} >
					<TouchableHighlight underlayColor='white' style={ styles.itemButtonTouch } onPress={ this._onLinkButtonPress.bind(this)}>
								<Image source={require('image!ToolBarLink')} style={ styles.itemButton }/> 
						</TouchableHighlight>
					</View>

					<View style={{ flex: 1 }} >
						<TouchableHighlight underlayColor='white' style={ styles.itemButtonTouch } onPress={ this._onCameraButtonPress.bind(this)}>
								<Image source={require('image!ToolBarCamera1')} style={ styles.itemButton }/> 
						</TouchableHighlight>
					</View>
					
					<View style={{ flex: 1 }} >
						<TouchableHighlight underlayColor='white' style={ styles.itemButtonTouch } onPress={ this._onImageButtonPress.bind(this)}>
								<Image source={require('image!ToolBarImage2')} style={ styles.itemButton }/> 
						</TouchableHighlight>
					</View>
					
					
				</View>
			</View>
			);
	}

	_onCloseButtonPress(event) {
		console.log('KeyboardToolBar - _onCloseButtonPress');
		this.props.onCloseButtonPress && this.props.onCloseButtonPress(event);
	}

	_onLinkButtonPress(event) {

	}

	_onCameraButtonPress(event) {

	}

	_onImageButtonPress(event) {

	}
}

module.exports = KeyboardToolBar;