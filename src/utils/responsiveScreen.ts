import {Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const RatioW = width / 428;
export const RatioH = height / 926;
export const RW = (value: number) => RatioW * value;
export const RH = (value: number) => RatioH * value;
