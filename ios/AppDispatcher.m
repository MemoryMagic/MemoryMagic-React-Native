//
//  AppDispatcher.m
//  MemoryMagicProject
//
//  Created by Carl.Yang on 10/26/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "AppDispatcher.h"
#import "RCTConvert.h"

@implementation AppDispatcher

RCT_EXPORT_MODULE();

@synthesize actions;

RCT_EXPORT_METHOD(register:(NSString *)eventName callback:(RCTResponseSenderBlock)action) {

  if (!self.actions) {
    self.actions = [NSMutableDictionary new];
  }
  [self.actions setObject:action forKey:eventName];
}

RCT_EXPORT_METHOD(dispatch:(NSString *)eventName withData:(NSDictionary*)data) {
  if (self.actions && [self.actions objectForKey:eventName]) {
    RCTResponseSenderBlock callback = [self.actions objectForKey:eventName];
    callback(@[@"data", data == NULL ? [NSNull null] : data]);
  }
}

@end
