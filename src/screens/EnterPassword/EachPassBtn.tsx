import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text} from 'react-native';
import {AppContext} from '../../context/appContext';
import {RW} from '../../utils/responsiveScreen';
interface EachPassBtnProps {
  el: number | null | string;
  password: number[] | null[];
  setPassword: React.Dispatch<React.SetStateAction<null[] | number[]>>;
  countOfPressed: number;
  setCountOfPressed: React.Dispatch<React.SetStateAction<number>>;
}
const EachPassBtn = ({
  el,
  password,
  setPassword,
  countOfPressed,
  setCountOfPressed,
}: EachPassBtnProps) => {
  const [pressed, setPressed] = useState<boolean>(false);
  const [accesNavigate, setAccesNavigate] = useState<boolean>(false);
  const {setShow, storeData} = useContext(AppContext);
  const {height} = Dimensions.get('window');
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const handleClick = (isDelete: boolean) => {
    const MAX_COUNT = 6;
    const MIN_COUNT = 0;

    let updatedCount = isDelete
      ? Math.max(countOfPressed - 1, MIN_COUNT)
      : Math.min(countOfPressed + 1, MAX_COUNT);

    setCountOfPressed(updatedCount);

    const newPassword: any[] = Array(MAX_COUNT)
      .fill(0)
      .map((e, index) => {
        return index < updatedCount
          ? index === countOfPressed
            ? el
            : password[index]
          : null;
      });

    validationPassword(newPassword);
    setPassword(newPassword);
  };

  const validationPassword = (newPassword: number[]) => {
    if (newPassword.every(e => e !== null)) {
      setShow(true);
      storeData(newPassword);
      setAccesNavigate(true);
    }
  };

  useEffect(() => {
    if (accesNavigate) {
      navigation.navigate('Home');
    }
  }, [accesNavigate]);

  return (
    <Pressable
      key={`el${el}`}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      onPress={() => handleClick(el == 'Delete' ? true : false)}
      style={[
        height > 700 ? styles.eachBtn : styles.eachBtnSmall,
        {
          backgroundColor:
            el !== null && el !== 'Delete'
              ? '#fff'
              : el !== null
              ? 'red'
              : 'transparent',
        },
        pressed && {
          shadowColor: el !== 'Delete' ? 'rgba(0,0,0,0.5)' : 'red',
        },
      ]}>
      <Text
        style={[
          styles.eachBtnNum,
          {color: el !== 'Delete' ? (pressed ? '#a246ff' : '#306') : '#fff'},
        ]}>
        {el}
      </Text>
    </Pressable>
  );
};

export default EachPassBtn;

const styles = StyleSheet.create({
  eachBtn: {
    width: RW(100),
    height: RW(100),
    borderRadius: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems: 'center',
    // shadowColor: '#000',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  eachBtnSmall: {
    width: RW(90),
    height: RW(90),
    borderRadius: 45,
    backgroundColor: '#fff',
    justifyContent: 'center',
    // alignItems: 'center',
    // shadowColor: '#000',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  eachBtnNum: {
    fontSize: 20,
  },
});
