//  Created by Joao Caixinha on 02/04/15.
//  Copyright (c) 2015 Realtime. All rights reserved.
//

/**
 * @providesModule RCTRealtimeMessagingIOS
 * @flow
 */

'use strict';

var React = require('react-native');
var NativeModules = React.NativeModules;
var RCTDeviceEventEmitter = require('RCTDeviceEventEmitter');
var ortcClient = NativeModules.RealtimeMessaging;
var RTEvents = {};
var instances = 0;

class RCTRealtimeMessagingIOS extends React.Component {
	id: String;
	
	constructor(props) {
    super(props);
		this.id = ""+instances++;
	}

	RTConnect(config){
		ortcClient.connect(config, this.id);
	}
	

	RTDisconnect(){
		ortcClient.disconnect(this.id);
	}

	RTSubscribe(channel, subscribeOnReconnect: boolean){
		ortcClient.subscribe(channel, subscribeOnReconnect, this.id);
	}

	RTSubscribeWithNotifications(channel, subscribeOnReconnect: boolean){
		ortcClient.subscribeWithNotifications(channel, subscribeOnReconnect, this.id);
	}

	RTUnsubscribe(channel){
		ortcClient.unsubscribe(channel, this.id);
	}

	RTSendMessage(message, channel){
		ortcClient.sendMessage(message, channel, this.id);
	}

	RTEnablePresence(aUrl, aIsCluster:boolean, aApplicationKey, aPrivateKey, channel, aMetadata){
		ortcClient.enablePresence(aUrl, aIsCluster, aApplicationKey, aPrivateKey, channel, aMetadata, this.id);
	}

	RTDisablePresence(aUrl, aIsCluster:boolean, aApplicationKey, aPrivateKey, channel, aMetadata){
		ortcClient.disablePresence(aUrl, aIsCluster, aApplicationKey, aPrivateKey, channel, this.id);
	}

	RTPresence(aUrl, aIsCluster:boolean, aApplicationKey, aAuthenticationToken, channel){
		ortcClient.presence(aUrl, aIsCluster, aApplicationKey, aAuthenticationToken, channel, this.id);
	}

	RTIsSubscribed(channel, callBack: Function){
		ortcClient.isSubscribed(channel, this.id, callBack);
	}

	RTSaveAuthentication(url, isCluster, authenticationToken, authenticationTokenIsPrivate, applicationKey, timeToLive, privateKey, permissions, callBack: Function){
		ortcClient.saveAuthentication(url, isCluster, authenticationToken, authenticationTokenIsPrivate, applicationKey, timeToLive, privateKey, permissions, this.id, callBack);
	}

	RTGetHeartbeatTime(callBack: Function){
		ortcClient.getHeartbeatTime(this.id, callBack);
	}

	RTSetHeartbeatTime(newHeartbeatTime){
		ortcClient.setHeartbeatTime(newHeartbeatTime, this.id);
	}

	RTGetHeartbeatFails(callBack: Function){
		ortcClient.getHeartbeatFails(this.id, callBack);
	}

	RTSetHeartbeatFails(newHeartbeatFails){
		ortcClient.setHeartbeatFails(newHeartbeatFails, this.id);
	}

	RTIsHeartbeatActive(callBack: Function){
		ortcClient.isHeartbeatActive(this.id, callBack);
	}

	RTEnableHeartbeat(){
		ortcClient.enableHeartbeat(this.id);
	}

	RTDisableHeartbeat(){
		ortcClient.disableHeartbeat(this.id);
	}

	/*
		Events list
		- onConnected
		- onDisconnect
		- onReconnect
		- onReconnecting
		- onSubscribed
		- onUnSubscribed
		- onExcption
		- onMessage
		- onPresence
		- onDisablePresence
		- onEnablePresence
	*/

	RTPushNotificationListener(callBack: Function){
		require('RCTDeviceEventEmitter').addListener(
			  'onPushNotification',
			  callBack
			);
		ortcClient.checkForNotifications();
	};


	RTEventListener(notification, callBack: Function){
		var modNotification = String(this.id) + '-' + notification;
		var channelExists = RTEvents[modNotification];
		if (channelExists){
			this.RTRemoveEventListener(notification);
		}

		RTEvents[modNotification] = (
			require('RCTDeviceEventEmitter').addListener(
			  modNotification,
			  callBack
			)
		);
	};

	RTRemoveEventListener(notification)
	{
		var modNotification = String(this.id) + '-' + notification;
		RTEvents[modNotification].remove(),
		delete RTEvents[modNotification];
	};
}

module.exports = RCTRealtimeMessagingIOS;
