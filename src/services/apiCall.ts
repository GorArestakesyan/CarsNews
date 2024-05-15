import React, {SetStateAction} from 'react';
import axiosInstance from '../api/axiosInstance';
export type VehicleResponseType = {
  id: number;
  photos: string[];
  vehicle: string;
  year: string;
};
export const requestVehicleInfo = (
  id: string,
  setter: React.Dispatch<SetStateAction<VehicleResponseType | string>>,
) => {
  axiosInstance
    .get(`vehiclesInfo/${id}`)
    .then(res => {
      res.data && setter(res?.data);
      return res.data;
    })
    .catch((err: Error) => {
      console.log('error: ', err.message), setter(err.message);
    });
};
