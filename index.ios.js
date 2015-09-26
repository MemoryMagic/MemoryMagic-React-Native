'use strict';

var React = require('react-native');
var TaskList = require('./TaskList');
//var HelloWrold = require('/HelloWrold');

var {
  StyleSheet,
  View,
  Text,
  Component
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    marginTop: 65
  }
});

class HelloWrold extends Component {
  render() {
    return (<View style={styles.text}>
            <Text>!@#$%Y^%$#@!SDFDSADSDFDSS</Text>
          </View>);
  }
}
class MemoryMagicProjectApp extends Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: TaskList,
        }}/>
    );
  }
}

React.AppRegistry.registerComponent('MemoryMagicProject', function() {
  return MemoryMagicProjectApp
});