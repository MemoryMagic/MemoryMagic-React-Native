'use strict';

var React = require('react-native');
var SQLite = require('react-native-sqlite');
var TaskList = require('./TaskList');
var AddTask = require('./AddTask');
//var HelloWrold = require('/HelloWrold');

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
      if (trace !== null) {
        console.log("value !== null value: ", trace);
      } else {
        console.log("value === null");
        await AsyncStorage.setItem(TRACE_KEY, "*");
        console.log("set item: yes");
        self.createTable();
      }
    } catch (error) {
      console.log("error: ", error);
    }
  }

  getInitialState() {

  }

 createTable() {
    console.log("create table");

    var database = SQLite.open("tasks.sqlite");
    database.executeSQL("CREATE TABLE IF NOT EXISTS Task (taskId INTEGER PRIMARY KEY AUTOINCREMENT ASC, taskTitle TEXT)", 
      [],
      (data) => {
        console.log("data: ", data);
      },
      (error) => {
        if (error !== null) {
          console.error("error: ", error);
        } else {
          console.log("create table success!");
        }
      });
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
            title: 'Property Finder',
            rightButtonTitle: 'new',
            component: TaskList,
            onRightButtonPress: () => {
              this.refs.nav.push({ 
                title: 'Add Task',
                component: AddTask,
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