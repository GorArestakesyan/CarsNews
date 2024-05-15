import {ParamListBase} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';

export type EachData = {
  id: number;
  path: string;
  name: string;
  backColor: string;
};
export type FunctionsTypes = {
  show: Boolean;
  setShow?: React.Dispatch<React.SetStateAction<boolean>>;
  hideBar: Boolean;
  setHideBar: React.Dispatch<React.SetStateAction<boolean>>;
  removeData: (value: string) => Promise<void>;
  storeData: (value: number[]) => Promise<void>;
  getData: (props: getDataTypes) => Promise<any>;
};
export type NavigationType = {
  navigation: NativeStackNavigationProp<ParamListBase>;
};
export interface getDataTypes {
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MapProps {
  setHideBar: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface AsyncStorageFunctions {
  getData: ({setShow}: getDataTypes) => Promise<void>;
  storeData: (value: number[]) => Promise<void>;
  removeData: (key: string) => Promise<void>;
}
