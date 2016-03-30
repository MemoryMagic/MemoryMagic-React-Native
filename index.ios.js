'use strict';

var React = require('react-native');
var SQLite = require('react-native-sqlite');
var TaskList = require('./source/components/TaskList');
var AddTask  = require('./source/components/AddTask');
//var HelloWrold = require('/HelloWrold');
var TaskStore = require('./source/stores/TaskStore');
var ButtonActions = require('./source/actions/ButtonActions');
var TaskActions = require('./source/actions/TaskActions');
var {
  StyleSheet,
  View,
  Text,
  Navigator,
  NavigatorIOS,
  Component,
  AsyncStorage,
} = React;

var TRACE_KEY = '@AsncStorageFristLaunch:key';

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

  componentDidMount() {
    this._loadInitialState().done();
  }

  async _loadInitialState() {
    try {
      var trace = await AsyncStorage.getItem(TRACE_KEY);
      if (trace === null) {
        console.log("value === null");
        this.createTable();
        await AsyncStorage.setItem(TRACE_KEY, "*");
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  createTable() {
    TaskStore.createTable();
  }

  addedTaskSuccess() {
    console.log("success");
    console.log("reload");
  }

  render() {
    return (
      <NavigatorIOS
      ref='nav'
      style={styles.container}
      initialRoute={{
        title: '任务列表',
        rightButtonIcon: require('image!NavBarButtonPlus'),
        component: TaskList,
        onRightButtonPress: () => {
          this.refs.nav.push({ 
            title: '添加任务',
            component: AddTask,
            rightButtonTitle: '保存',
            onRightButtonPress: () => {
              ButtonActions.click('save');
              // TaskActions.create(this.state.titleString);
            },
            passProps: {
              onChanged: this._onChange,
            } });
        }
      }} />
      );
  }
}

React.AppRegistry.registerComponent('MemoryMagicProject', function() {
  return MemoryMagicProjectApp
});