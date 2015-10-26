//
//  AppDispatcher.h
//  MemoryMagicProject
//
//  Created by Carl.Yang on 10/26/15.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"

@interface AppDispatcher : NSObject <RCTBridgeModule>

@property (nonatomic, retain) NSMutableDictionary* actions;

@end
