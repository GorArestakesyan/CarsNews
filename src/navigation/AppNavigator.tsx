import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import EachCarInfo from '../screens/Carousel/EachCarInfo';
import {RW} from '../utils/responsiveScreen';
import TabNavigator from './CustomTabBar';
const AppNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName="Password"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'TabNavigator'} component={TabNavigator} />
      <Stack.Screen
        name={'EachCarInfo'}
        component={EachCarInfo}
        options={{
          headerTransparent: true,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          animation: 'fade_from_bottom',
          contentStyle: {
            flex: 1,
            borderTopLeftRadius: RW(15),
            borderTopRightRadius: RW(15),
          },
          presentation: 'containedTransparentModal',
          animationTypeForReplace: 'pop',
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
