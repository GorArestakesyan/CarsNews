import AsyncStorage from '@react-native-async-storage/async-storage';
import {AsyncStorageFunctions, getDataTypes} from '../types/types';

export const useAsyncStorage = (): AsyncStorageFunctions => {
  const getData = async ({setShow}: getDataTypes) => {
    AsyncStorage.getItem('my-key')
      .then((res: string | null) => {
        const jsoning = res && JSON.parse(res);
        if (jsoning !== null) {
          setShow(true);
        } else {
          setShow(false);
        }
        return jsoning;
      })
      .catch((err: Error) => console.log(err));
  };
  const storeData = async (value: number[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      console.log(jsonValue);
      await AsyncStorage.setItem('my-key', jsonValue);
    } catch (err) {
      const typedError = err as Error;
      console.log('error storing data: ', typedError?.message);
    }
  };
  const removeData = async (key: string) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (err) {
      const typedError = err as Error;
      console.log('error removing data: ', typedError);
    }
  };
  return {getData, storeData, removeData};
};
