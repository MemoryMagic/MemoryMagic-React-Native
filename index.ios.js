'use strict';

var React = require('react-native');
var SQLite = require('react-native-sqlite');
var TaskList = require('./source/components/TaskList');
var AddTask  = require('./source/components/AddTask');
var TodayTodo  = require('./source/components/TodayTodo');
//var HelloWrold = require('/HelloWrold');
var TaskStore = require('./source/stores/TaskStore');
var ButtonActions = require('./source/actions/ButtonActions');
var TaskActions = require('./source/actions/TaskActions');

var {
  StyleSheet,
  View,
  Navigator,
  NavigatorIOS,
  Component,
  AsyncStorage,
  DeviceEventEmitter
} = React;

var TRACE_KEY = '@AsncStorageFristLaunch:key';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray'
  }
});

class MemoryMagicProjectApp extends Component {


  handleAction(action) {
  	if (action && action.type === 'com.yangcun.memorymagic.addtask') {
      setTimeout(() => {
        this.refs.nav.push({ 
          title: '添加任务',
          component: AddTask,
          rightButtonTitle: '保存',
          onRightButtonPress: () => {
            ButtonActions.click('save');
          }
        });
      }, 10);
    } else if (action && action.type === 'com.yangcun.memorymagic.todaytodo') {
      setTimeout(() => {
        this.refs.nav.push({
            title: '今日复习任务',
            component: TodayTodo
          });
      }, 10);
    }
  }

  componentDidMount() {
  	this._loadInitialState().done();

    // cold-launch
  	var QuickActions = require('react-native-quick-actions');
  	var action = QuickActions.popInitialAction();
  	this.handleAction(action);

    // launch 
  	DeviceEventEmitter.addListener('quickActionShortcut', action => {
      // pop to root 
      this.refs.nav.popToTop();
   		setTimeout(() => this.handleAction(action), 700);
   	});
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
      <View style= {{ flex: 1}}>
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
            }});
        },

        leftButtonTitle: '今日复习',
        onLeftButtonPress: () => {
          this.refs.nav.push({
            title: '今日复习任务',
            component: TodayTodo
          });
        }


      }} />
      <View></View>
      </View>
      );
  }
}

React.AppRegistry.registerComponent('MemoryMagicProject', function() {
 
  return MemoryMagicProjectApp
});