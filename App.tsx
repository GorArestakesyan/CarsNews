import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Dimensions, SafeAreaView, StatusBar} from 'react-native';
import {AppProvider} from './src/context/appContext';
import AppNavigator from './src/navigation/AppNavigator';
import {RH} from './src/utils/responsiveScreen';

function App() {
  const {height} = Dimensions.get('window');

  return (
    <>
      <SafeAreaView
        style={{
          maxHeight: height > 700 ? RH(80) : RH(30),
          backgroundColor: '#128bb8',
        }}></SafeAreaView>
      <StatusBar barStyle="dark-content" backgroundColor={'#fff'} />
      <NavigationContainer>
        <AppProvider>
          <AppNavigator />
        </AppProvider>
      </NavigationContainer>
    </>
  );
}

export default App;
