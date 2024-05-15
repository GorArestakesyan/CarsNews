import React from 'react';
import {Animated, Dimensions, StyleSheet} from 'react-native';
import {_PhotosData} from '../../api/data';
import {EachData} from '../../types/types';
interface BackgroundProps {
  scrollX: Animated.Value;
}
const CarouselBackground: React.FC<BackgroundProps> = ({scrollX}: any) => {
  const {width, height} = Dimensions.get('screen');
  return _PhotosData.map((image: EachData, index) => {
    const inputRange = [(index - 1) * width, index * width];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0, 1],
    });

    return (
      <Animated.View key={index}>
        <Animated.Image
          source={image.path}
          key={image.path}
          style={[
            {
              opacity,
              resizeMode: 'cover',
              zIndex: 333,
              width,
              height,
              position: 'absolute',
            },
          ]}
          blurRadius={6}
        />
      </Animated.View>
    );
  });
};

export default CarouselBackground;

const styles = StyleSheet.create({
  imageTitleBox: {
    margin: 27,
    padding: 9,
    borderRadius: 4,
  },
  imageTitle: {
    color: '#fff',
    fontSize: 25,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#000',
    shadowOpacity: 1,
    shadowRadius: 3,
  },
});
