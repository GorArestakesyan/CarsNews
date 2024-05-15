import {
  ParamListBase,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {AppContext} from '../../context/appContext';
import {checkFaceOrTouchID} from '../../hooks/useFaceID';
import {RW} from '../../utils/responsiveScreen';
import EachPassBtn from './EachPassBtn';
const EnterPassword: React.FC = () => {
  const [password, setPassword] = useState<null[] | number[]>(
    Array(6).fill(null),
  );
  const countOfBtns = [1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0, 'Delete'];
  const [countOfPressed, setCountOfPressed] = useState<number>(0);
  const {show, setShow} = useContext(AppContext);
  const isFocused = useIsFocused();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  // const response = useFaceID();
  useEffect(() => {
    if (isFocused) {
      checkFaceOrTouchID({
        setPassword,
        navigation,
        setShow: setShow ? setShow : () => {},
      });
      if (show == false) {
        setPassword(Array(6).fill(null));
        setCountOfPressed(0);
      }
    }
  }, [isFocused]);
  return (
    <LinearGradient
      colors={['#4a9bff', '#d6c7ff']}
      style={styles.mainContainer}>
      <View style={{height: RW(60)}} />
      <View style={styles.midBox}>
        <View style={styles.passwordCirclesBox}>
          {password.map(el => (
            <View
              key={Math.random().toString()}
              style={[
                styles.eachPasswordCircle,
                {backgroundColor: el !== null ? '#fff' : ''},
              ]}
            />
          ))}
        </View>
        <View style={styles.btnsContainer}>
          {countOfBtns.map((el: number | string | null) => (
            <EachPassBtn
              key={`btns-${el}`}
              el={el}
              password={password}
              setPassword={setPassword}
              countOfPressed={countOfPressed}
              setCountOfPressed={setCountOfPressed}
            />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};

export default EnterPassword;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'orange',
    flex: 1,
  },
  passwordCirclesBox: {
    width: '70%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-around',
  },
  midBox: {
    flex: 0.8,
    justifyContent: 'space-around',
  },
  eachPasswordCircle: {
    width: RW(15),
    height: RW(15),
    borderWidth: 2,
    borderRadius: RW(7.5),
    borderColor: '#fff',
  },
  btnsContainer: {
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
