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
		onTakePhotoButtonPress: React.propTypes.func,
		onChooseImageButtonPress: React.propTypes.func,
	}

	constructor(props) {
		super(constructor);
	}

// <Image source={require('image!ToolBarLink')} style={ styles.itemButton }/> 
// <Image source={require('image!ToolBarCamera1')} style={ styles.itemButton }/> 
// <Image source={require('image!ToolBarImage2')} style={ styles.itemButton }/>  
	render() {
		return (
			this.props.hidden ? null :
			<View style={{backgroundColor: 'white'}}>
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
						<TouchableHighlight underlayColor='white' style={ styles.itemButtonTouch } onPress={ this._onTakePhotoButtonPress.bind(this)}>
								<Image source={require('image!ToolBarCamera1')} style={ styles.itemButton }/> 
						</TouchableHighlight>
					</View>
					
					<View style={{ flex: 1 }} >
						<TouchableHighlight underlayColor='white' style={ styles.itemButtonTouch } onPress={ this._onChooseImageButtonPress.bind(this)}>
								<Image source={require('image!ToolBarImage2')} style={ styles.itemButton }/> 
						</TouchableHighlight>
					</View>
					
					
				</View>
			</View>
			);
	}

	_onCloseButtonPress(event) {
		this.props.onCloseButtonPress && this.props.onCloseButtonPress(event);
	}

	_onLinkButtonPress(event) {
	}

	_onTakePhotoButtonPress(event) {
		this.props.onTakePhotoButtonPress && this.props.onTakePhotoButtonPress(event);
	}

	_onChooseImageButtonPress(event) {
		this.props.onChooseImageButtonPress && this.props.onChooseImageButtonPress(event);

	}
}

module.exports = KeyboardToolBar;