import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useContext, useEffect, useState} from 'react';
import {Animated, StyleSheet} from 'react-native';
import AnimatedBarIconBox from '../components/AnimatedBarIconBox';
import {AppContext} from '../context/appContext';
import Carousel from '../screens/Carousel/Carousel';
import EnterPassword from '../screens/EnterPassword/EnterPassword';
import Map from '../screens/Map/Navigator';
import {RH, RW} from '../utils/responsiveScreen';
import NastedBottomNavigation from './NestedTabBarNavigator';
import NavigationRoutes, {LogIn} from './navigationRoutes';

const TabNavigator = () => {
  const Tab = createBottomTabNavigator();
  const {setHideBar, show, setShow, hideBar, getData} = useContext(AppContext);
  const [activeRoute, setActiveRoute] = useState<string>('Home');
  const [animatedPaddingBottom] = useState<Animated.Value>(
    new Animated.Value(RH(24)),
  );

  useEffect(() => {
    //@ts-ignore
    getData(setShow);
  }, []);

  useEffect(() => {
    Animated.timing(animatedPaddingBottom, {
      toValue: hideBar ? -300 : RH(24),
      duration: 200,
      useNativeDriver: false,
    }).start();
    setActiveRoute('Home');
  }, [hideBar]);

  return (
    <Tab.Navigator
      initialRouteName={'Password'}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
      tabBar={() => (
        <Animated.View
          style={[
            {
              bottom: animatedPaddingBottom,
            },
            styles.animatedBox,
          ]}>
          {show ? (
            NavigationRoutes.map(route => (
              <AnimatedBarIconBox
                key={route.id}
                navigateTo={route.name}
                setActiveRoute={setActiveRoute}
                activeRoute={activeRoute}>
                {route.component({activeRoute, setActiveRoute})}
              </AnimatedBarIconBox>
            ))
          ) : (
            <AnimatedBarIconBox
              setActiveRoute={setActiveRoute}
              activeRoute={activeRoute}>
              <LogIn />
            </AnimatedBarIconBox>
          )}
        </Animated.View>
      )}>
      {show && <Tab.Screen name={'Carousel'} component={Carousel} />}
      {show && (
        <Tab.Screen
          name={'CarNavigator'}
          children={() => <Map setHideBar={setHideBar} />}
        />
      )}

      <Tab.Screen name={'Home'} component={NastedBottomNavigation} />

      {/* <Tab.Screen name={'Details'} component={DetailsScreen} /> */}
      {show && <Tab.Screen name={'CarNavigator1'} children={() => <></>} />}

      <Tab.Screen name={'Password'} component={EnterPassword} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  barIconBox: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 533,
  },
  homeIconBox: {
    backgroundColor: 'rgba(255,255,255,0.8)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 5,
    zIndex: 990,
    shadowColor: 'rgba(0,0,0,0.2)',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedBox: {
    position: 'absolute',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    height: RH(85),
    left: RW(13),
    right: RW(13),
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#128bb8',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 2,
    zIndex: 5,
    shadowColor: 'rgba(255,255,255,0.5)',
  },
});

export default TabNavigator;
