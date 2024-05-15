import {createContext, useState} from 'react';
import {useAsyncStorage} from '../hooks/useAsyncStorage';
import {FunctionsTypes} from '../types/types';
type ChildrenProps = {
  children: string | JSX.Element | JSX.Element[];
};
const {getData, storeData, removeData} = useAsyncStorage();
export const AppContext = createContext<FunctionsTypes>(null!);
export const AppProvider = ({children}: ChildrenProps): React.ReactNode => {
  const [show, setShow] = useState<boolean>(false);
  const [hideBar, setHideBar] = useState<boolean>(false);
  const functions = {
    show,
    setShow,
    hideBar,
    setHideBar,
    removeData,
    storeData,
    getData,
  };

  return (
    <AppContext.Provider value={functions}>{children}</AppContext.Provider>
  );
};
