import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  default as CarouselIcon,
  default as HomeIcon,
  default as NavIcon,
} from 'react-native-vector-icons/MaterialCommunityIcons';
import LogOutIcon from 'react-native-vector-icons/MaterialIcons';
import FaceIdIcon from '../assets/svgIcons/FaceIdIcon';
import {AppContext} from '../context/appContext';
import {checkFaceOrTouchID} from '../hooks/useFaceID';
import {RH, RW} from '../utils/responsiveScreen';

type ComponentProps = (props: any) => JSX.Element;

type NavigationRoutesType = {
  id: number;
  name: string;
  style: any;
  component: ComponentProps;
};

type NavigationRoutesArray = NavigationRoutesType[];

const {height} = Dimensions.get('window');

export const LogIn = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {setShow} = useContext(AppContext);

  const handleLogin = () => {
    navigation.navigate('Password');
    checkFaceOrTouchID({
      setPassword: () => {},
      navigation,
      setShow: setShow ? setShow : () => {},
    });
  };

  return (
    <TouchableOpacity style={styles.barIconBox} onPress={handleLogin}>
      <FaceIdIcon size={height > 700 ? 44 : 45} />
    </TouchableOpacity>
  );
};

const Logout = ({
  setActiveRoute,
}: {
  setActiveRoute: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {setShow, removeData} = useContext(AppContext);
  const handleLogout = () => {
    removeData('my-key');
    setActiveRoute('Home');
    setShow && setShow(false);
    navigation.navigate('Password');
  };

  return (
    <TouchableOpacity onPress={handleLogout} style={styles.logOutBtn}>
      <LogOutIcon name="logout" size={33} color={'#e33431'} />
    </TouchableOpacity>
  );
};
const Home = ({iconColor}: {iconColor: string}) => {
  return (
    <View
      style={[
        styles.homeIconBox,
        {
          bottom: height > 700 ? RH(40) : RH(33),
          borderRadius: height > 700 ? 38 : 33,
          height: height > 700 ? 72 : 66,
          width: height > 700 ? 72 : 66,
        },
      ]}>
      <View
        style={{
          borderRadius: RW(37),
          backgroundColor: '#11185c',
        }}>
        <HomeIcon
          name="home-circle-outline"
          size={height > 700 ? 64 : 58}
          color={iconColor}
        />
      </View>
    </View>
  );
};

const NavigationRoutes: NavigationRoutesArray = [
  {
    id: 1,
    name: 'Carousel',
    style: () => styles.homeStyle,
    component: props => (
      <CarouselIcon
        name="view-carousel"
        size={33}
        color={props.activeRoute == 'Carousel' ? '#f67f06' : '#fff'}
      />
    ),
  },
  {
    id: 2,
    name: 'CarNavigator',
    style: {},
    component: () => (
      <NavIcon name="navigation-variant" size={33} color={'#fff'} />
    ),
  },
  {
    id: 3,
    name: 'Home',
    style: {},
    component: props => (
      <Home iconColor={props.activeRoute == 'Home' ? '#f67f06' : '#fff'} />
    ),
  },

  {
    id: 4,
    name: 'CarNavigator1',
    style: {},
    component: props => (
      <NavIcon
        name="navigation-variant"
        size={33}
        color={props.activeRoute == 'CarNavigator1' ? '#f67f06' : '#fff'}
      />
    ),
  },
  {
    id: 5,
    name: 'Password',
    style: {},
    component: props => <Logout setActiveRoute={props.setActiveRoute} />,
  },
];

const styles = StyleSheet.create({
  homeStyle: {
    position: 'absolute',
    borderBottomLeftRadius: 33,
    borderBottomRightRadius: 33,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    height: RH(85),
    left: RW(13),
    right: RW(13),
    // bottom: animatedPaddingBottom,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: 'rgba(255,255,255,0.6)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 5,
    zIndex: 5,
    shadowColor: 'rgba(0,0,0,0.3)',
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
  barIconBox: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 533,
  },
  logOutBtn: {
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    zIndex: 5,
    shadowColor: '#fff',
  },
});

export default NavigationRoutes;
