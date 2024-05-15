import React, {useRef, useState} from 'react';
import {Animated, Dimensions, StyleSheet, Text, View} from 'react-native';
import {_PhotosData} from '../../api/data';
import {EachData} from '../../types/types';
import {RH} from '../../utils/responsiveScreen';
import CarouselBackground from './CarouselBackground';
import ListItem from './ListItem';
const Carousel: React.FC = () => {
  const {width, height} = Dimensions.get('screen');
  const ScrollX: Animated.Value = useRef(new Animated.Value(0)).current;
  const [animatedHeight] = useState<Animated.Value>(new Animated.Value(50));
  const imageH = height / 1.9;
  const [itemAnimatedHeight] = useState<Animated.Value>(
    new Animated.Value(imageH),
  );

  const interpolatedHeight = animatedHeight.interpolate({
    inputRange: [0, height],
    outputRange: [0, height],
  });
  const interpolatedItemHeight = itemAnimatedHeight.interpolate({
    inputRange: [0, 0.2, 0.4, 0.8],
    outputRange: [0, 0.2, 0.4, 0.8],
  });

  return (
    <View style={styles.mainContainer}>
      <View
        style={{
          width,
        }}>
        <CarouselBackground scrollX={ScrollX} />
        <Text style={styles.carouselTitle}>Cars News</Text>
      </View>
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: ScrollX}}}],
          {useNativeDriver: false},
        )}
        style={{width: '100%'}}
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        data={_PhotosData}
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        keyExtractor={(_, index: any) => index}
        renderItem={({item}: {item: EachData}) => {
          return (
            <ListItem
              item={item}
              interpolatedHeight={interpolatedHeight}
              interpolatedItemHeight={interpolatedItemHeight}
            />
          );
        }}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
  },
  carouselTitle: {
    fontFamily: 'Exo-Regular',
    fontSize: RH(33),
    position: 'absolute',
    alignSelf: 'center',
    top: RH(20),
    color: '#fff',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 5,
    // shadowColor: 'rgba(255,255,255,0.6)',
  },
});
