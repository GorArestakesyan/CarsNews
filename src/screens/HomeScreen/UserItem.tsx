import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {MutableRefObject, useState} from 'react';
import {
  Dimensions,
  Easing,
  Animated as RNanimated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import DownIcon from 'react-native-vector-icons/AntDesign';
import {generateCharacter} from '../../utils/randomCharGenerator';
import {randomColor} from '../../utils/randomColorGenerator';
import {RH} from '../../utils/responsiveScreen';

type stateType = {
  userName: string;
  userColor: string;
};
interface ItemInterface {
  index: number;
  scrollViewRef: MutableRefObject<null>;
}
const UserItem = ({index, scrollViewRef}: ItemInterface) => {
  const {height} = Dimensions.get('window');
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [textHeight, setTextHeight] = useState<number>(10);
  const [animatedHeight] = useState(new RNanimated.Value(RH(80)));
  const [rotateAnim] = useState(new RNanimated.Value(0));
  const [userInfo] = useState<stateType>({
    userName: generateCharacter(),
    userColor: randomColor(),
  });

  const animationHeight = RH(textHeight + (height > 700 ? RH(60) : RH(130)));
  function openOrCloseView() {
    setIsOpen(!isOpen);

    RNanimated.timing(animatedHeight, {
      toValue: isOpen ? RH(80) : animationHeight,
      duration: 100,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      // Start - i callback i meja vor bacveluc heto chapy poxvac lini vor karana chisht scrollTo
      //@ts-ignore
      scrollViewRef?.current?.scrollTo({
        x: 0,
        y: !isOpen && RH(80) * index + 1,
        animated: true,
      });
    });
    RNanimated.timing(rotateAnim, {
      toValue: isOpen ? 0 : 1,
      duration: 150,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <RNanimated.View
      key={index}
      style={[styles.eachUserContainer, {height: animatedHeight}]}>
      <View style={styles.eachUserTitleContainer}>
        <View style={styles.eachUserTitleBox} key={index}>
          {/* <LinearGradient
            colors={['#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888']}
            collapsable={true}
            start={{x: 0.2, y: 0.5}}
            end={{x: 0.6, y: 1}}
            style={styles.userBorderWrapper}> */}
          <Animated.View
            // entering={SlideInLeft}
            style={[styles.userCircle, {backgroundColor: userInfo.userColor}]}
            sharedTransitionTag={`tags${index}`}
          />
          {/* </LinearGradient> */}

          <Text style={styles.eachCircleName}>{userInfo.userName}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log('index', index);
            navigation.navigate('Details', {
              item: 'Go to',
              index: index,
              color: userInfo.userColor,
            });
          }}>
          {/* <SharedElement id={`item${index}`} > */}
          <Animated.Text sharedTransitionTag={`tag${index}`}>
            Go to
          </Animated.Text>
          {/* </SharedElement> */}
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={openOrCloseView}
          style={{transform: [{rotate: rotateInterpolate}]}}>
          <DownIcon name={'downcircle'} size={24} color={'#6052ff'} />
        </TouchableOpacity>
      </View>
      <Text
        onLayout={e => {
          const {height} = e.nativeEvent.layout;
          setTextHeight(height);
          setTextHeight(Math.round(height + 50));
        }}
        style={[
          styles.hiddenText,
          {
            top: RH(80),
            width: '100%',
            position: 'absolute',
            zIndex: 33,
            paddingVertical: RH(10),
            backgroundColor: 'rgba(255,255,255,0.3)',
          },
        ]}>
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
      </Text>
    </RNanimated.View>
  );
};

export default UserItem;

const styles = StyleSheet.create({
  eachUserTitleContainer: {
    width: '80%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eachUserTitleBox: {
    width: '30%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: RH(10),
  },
  eachUserContainer: {
    width: '100%',
    paddingVertical: RH(15),
    borderBottomWidth: 0.5,
    flexDirection: 'column',
    overflow: 'hidden',
    // justifyContent: 'center',
    alignItems: 'center',
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
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 5,
    shadowColor: 'rgba(0,0,0,0.7)',
  },
  hiddenText: {
    fontFamily: 'Exo-Medium',
    fontSize: RH(13),
    color: '#000',
    paddingHorizontal: RH(10),
    textAlign: 'left',
  },
});
