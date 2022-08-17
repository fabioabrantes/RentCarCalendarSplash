import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails} from '../screens/SchedulingDetails';
import { ScheduleSuccess} from '../screens/ScheduleSuccess';
import { Splash} from '../screens/Splash';

const {Navigator, Screen} = createNativeStackNavigator();

export function StackRoutes(){

  return (
    <Navigator 
      screenOptions={{ headerShown: false }} 
      initialRouteName="Splash"
    >
      <Screen 
        name="Splash" 
        component={Splash}
      />
      <Screen 
        name="CarDetails" 
        component={CarDetails}
      />
      <Screen 
        name="Scheduling" 
        component={Scheduling}
      />
      <Screen 
        name="SchedulingDetails" 
        component={SchedulingDetails}
      />
      <Screen 
        name="ScheduleSuccess" 
        component={ScheduleSuccess}
      />
    </Navigator>
  )
}