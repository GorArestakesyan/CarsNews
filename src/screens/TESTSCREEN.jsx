import React from 'react';
import {Button, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';

const HH = ({navigation}) => {
  return (
    <>
      <Button
        title="Go To Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Animated.Text sharedTransitionTag="sharedTag2" style={{fontSize: 16}}>
        HHH
      </Animated.Text>
      <Animated.Image
        source={{uri: 'https://picsum.photos/id/39/200'}}
        style={{width: 300, height: 200, marginTop: '0%'}}
        sharedTransitionTag="sharedTag"
      />
    </>
  );
};

export default HH;

const styles = StyleSheet.create({});
