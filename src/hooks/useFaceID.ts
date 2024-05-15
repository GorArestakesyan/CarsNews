import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Alert} from 'react-native';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import {useAsyncStorage} from './useAsyncStorage';
interface useFaceIdProps {
  setPassword: React.Dispatch<React.SetStateAction<null[] | number[]>>;
  navigation: NativeStackNavigationProp<ParamListBase>;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
export const checkFaceOrTouchID = ({
  setPassword,
  navigation,
  setShow,
}: useFaceIdProps) => {
  const rnBiometrics = new ReactNativeBiometrics();
  const {storeData} = useAsyncStorage();

  const checkPassword = async () => {
    const {biometryType} = await rnBiometrics.isSensorAvailable();
    console.log('biometryType', biometryType);
    rnBiometrics
      .simplePrompt({promptMessage: 'Confirm fingerprint'})
      .then(({success}) => {
        let newPassword = Array(6).fill(success == true ? 0 : null);
        setPassword(newPassword);
        setShow(success == true ? true : false);
        storeData(Array(6).fill(success ? 0 : null));
        success == true ? navigation.navigate('Home') : null;
        return success;
      })
      .catch(err => {
        setPassword(Array(6).fill(null));
        setShow(false);
        console.log('err', err);
        return err;
      });
  };
  rnBiometrics.isSensorAvailable().then(resultObject => {
    const {available, biometryType} = resultObject;
    const result = checkPassword();
    if (available && biometryType === BiometryTypes.FaceID) {
      return result;
    } else if (available && biometryType === BiometryTypes.TouchID) {
      return result;
    } else if (biometryType === BiometryTypes.Biometrics) {
      return result;
    } else {
      const createTwoButtonAlert = () => {
        Alert.alert('Biometrics not supported', '', [
          {text: 'OK', onPress: () => setShow(false)},
        ]);
      };
      createTwoButtonAlert();
    }
  });
};
