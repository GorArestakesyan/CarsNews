import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  BackdropBlur,
  Canvas,
  Image,
  rect,
  rrect,
  useImage,
} from '@shopify/react-native-skia';
import React, {useRef} from 'react';
import {Dimensions, FlatList, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {users} from '../../api/data';
import {RH, RW} from '../../utils/responsiveScreen';
import UserItem from './UserItem';

const HomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const roundedSideBar = rrect(rect(RW(20), RW(60), RW(100), RH(680)), 50, 50);
  const roundedCenterContainer = rrect(
    rect(RW(30), RW(60), RW(370), RH(680)),
    30,
    30,
  );
  const {width, height} = Dimensions.get('window');
  const image = useImage(require('../../assets/patternpad.png'));
  const scrollViewRef = useRef(null);

  return (
    <View>
      <Canvas style={{width, height, pointerEvents: 'none'}}>
        <Image
          image={image}
          x={0}
          y={0}
          width={width}
          height={height}
          fit="fitHeight"
        />
        {/* <BackdropBlur blur={5} clip={roundedSideBar} /> */}
        <BackdropBlur blur={9} clip={roundedCenterContainer} />
      </Canvas>

      <LinearGradient
        colors={['#08C8F6', '#4D5DFB']}
        collapsable={true}
        start={{x: 0.2, y: 0.5}}
        end={{x: 0.6, y: 1}}
        style={[
          styles.gradientBox,
          {
            width: '60%',
            // left: RW(25),
          },
        ]}>
        <Text style={styles.usersTitle}>Your Friend News</Text>
      </LinearGradient>

      <View style={styles.centerContainer}>
        <FlatList
          ref={scrollViewRef}
          style={{overflow: 'hidden', flex: 1, borderRadius: 30}}
          indicatorStyle="white"
          data={users}
          contentContainerStyle={{
            overflow: 'hidden',
            borderRadius: 30,
          }}
          keyExtractor={item => `item${item}`}
          renderItem={({item, index}) => (
            <View key={Math.random().toString()}>
              <UserItem index={index} scrollViewRef={scrollViewRef} />
            </View>
          )}></FlatList>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  usersTitle: {
    fontFamily: 'Exo-Medium',
    fontSize: RH(20),
    color: 'black',
    padding: RH(4),
    textAlign: 'center',
  },

  sideBarContainer: {
    width: RW(100),
    left: RW(20),
    top: RW(60),
    height: RH(680),
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: RW(45),
  },
  newsText: {
    fontFamily: 'Exo-Medium',
    fontSize: RH(24),
    padding: RH(10),
    color: '#5b5b5b',
    textAlign: 'center',
  },
  centerContainer: {
    // left: RW(140),
    top: RW(60),
    alignSelf: 'center',
    width: RW(370),
    height: RH(680),
    borderWidth: 2,
    position: 'absolute',
    borderColor: '#fff',
    overflow: 'hidden',
    borderRadius: 30,
  },
  eachCircleBox: {
    paddingVertical: RH(15),
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
  eachUserTitleContainer: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eachUserTitleBox: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: RH(10),
  },
  eachUserContainer: {
    width: '100%',
    paddingVertical: RH(15),
    borderBottomWidth: 0.5,
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
  circle: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    opacity: 0.9,
  },
  userCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    opacity: 0.9,
  },
  borderWrapper: {
    width: 68,
    height: 68,
    borderRadius: 34,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userBorderWrapper: {
    width: 43,
    height: 43,
    borderRadius: 21.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eachCircleName: {
    fontFamily: 'Exo-Bold',
    fontSize: RH(18),
    color: '#fff',
  },
  gradientBox: {
    position: 'absolute',
    top: RH(10),
    borderRadius: RH(12),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
