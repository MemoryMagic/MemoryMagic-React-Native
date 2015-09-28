'use strict';

var React = require('react-native');
var TaskList = require('./TaskList');
var AddTask = require('./AddTask');
//var HelloWrold = require('/HelloWrold');

var {
  StyleSheet,
  View,
  Text,
  Navigator,
  NavigatorIOS,
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
        <NavigatorIOS
          ref='nav'
          style={styles.container}
          initialRoute={{
            title: 'Property Finder',
            rightButtonTitle: 'new',
            component: TaskList,
            onRightButtonPress: () => {
              this.refs.nav.push({ title: 'Add Task', component: AddTask });
            }
          }} />
    );
  }
}

React.AppRegistry.registerComponent('MemoryMagicProject', function() {
  return MemoryMagicProjectApp
});