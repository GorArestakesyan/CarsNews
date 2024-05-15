import {
  ParamListBase,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {ReactNode, useEffect, useState} from 'react';
import {Animated, StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  children: ReactNode;
  navigateTo?: string;
  onPressFunc?: () => void;
  activeRoute: string;
  setActiveRoute: React.Dispatch<React.SetStateAction<string>>;
}

function AnimatedBarIconBox({
  children,
  navigateTo,
  onPressFunc,
  setActiveRoute,
}: Props) {
  const focused = useIsFocused();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [animatedPaddingBottom] = useState<Animated.Value>(
    new Animated.Value(0),
  );

  useEffect(() => {
    Animated.timing(animatedPaddingBottom, {
      toValue: focused ? 0 : 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [focused]);

  const pressHandler = () => {
    navigateTo && navigation.navigate(navigateTo, {routeName: navigateTo});
    onPressFunc && onPressFunc();
    setActiveRoute(navigateTo ? navigateTo : '');
  };

  return (
    <Animated.View
      style={{
        paddingBottom: animatedPaddingBottom,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <TouchableOpacity onPress={pressHandler} style={[styles.barIconBox]}>
        {children}
      </TouchableOpacity>
    </Animated.View>
  );
}

export default AnimatedBarIconBox;
const styles = StyleSheet.create({
  barIconBox: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 533,
  },
});
