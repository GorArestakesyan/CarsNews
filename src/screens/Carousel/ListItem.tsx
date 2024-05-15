import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Animated, Image, Pressable, StyleSheet, Text} from 'react-native';
import {EachData} from '../../types/types';
import {RW} from '../../utils/responsiveScreen';
interface ListItemProps {
  item: EachData;
  interpolatedHeight: any;
  interpolatedItemHeight: any;
}
const ListItem = ({
  item,
  interpolatedHeight,
  interpolatedItemHeight,
}: ListItemProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <Pressable
      style={styles.listItemContainer}
      onPress={() => {
        navigation.navigate('EachCarInfo', {
          backgroundColor: item.backColor,
          id: item.id,
        });
      }}>
      <Animated.View style={styles.cardContainer}>
        <Animated.View
          style={[
            styles.imageTitleBox,
            {
              height: interpolatedHeight,
              backgroundColor: item.backColor,
            },
          ]}>
          <Text
            onPress={() => navigation.navigate('password')}
            style={styles.imageTitle}>
            {item.name}
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.imageContainer,
            {
              height: interpolatedItemHeight,
            },
          ]}>
          <Image style={styles.image} source={item.path} />
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  listItemContainer: {
    marginHorizontal: RW(62),
    alignSelf: 'center',
  },
  imageTitle: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Exo-Medium',
    textAlign: 'center',
    shadowOffset: {width: 1, height: 1},
    shadowColor: '#000',
    shadowOpacity: 1,
    elevation: 5,
    shadowRadius: 3,
  },
  image: {
    height: '100%',
    width: RW(302),
    borderWidth: 3,
    alignSelf: 'center',
    borderColor: '#fff',
    backgroundColor: '#fff',
    resizeMode: 'cover',
    borderRadius: 16,
  },
  imageContainer: {
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
  },
  imageTitleBox: {
    position: 'absolute',
    zIndex: 222,
    width: '100%',
    top: '-16%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 11,
    borderRadius: 4,
  },
  cardContainer: {
    shadowColor: '#000',
    // backgroundColor: 'rgba(0,0,0,0)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 14,
    backgroundColor: '#fff',
  },
});
