import Geolocation from '@react-native-community/geolocation';
import {
  ParamListBase,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {
  Marker,
  PROVIDER_DEFAULT,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {
  default as GeolocationIcon,
  default as GoBackIcon,
} from 'react-native-vector-icons/MaterialIcons';
import {MapProps} from '../../types/types';
import {RH, RW} from '../../utils/responsiveScreen';

const Map = ({setHideBar}: MapProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const mapRef = useRef<any>(null);
  const [userPosition, setUserPosition] = useState({
    latitude: 55.751244,
    longitude: 37.618423,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [markers, setMarkers] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused) {
      setHideBar(false);
    } else {
      setHideBar(true);
    }
  }, [isFocused]);

  const handleGoBack = () => {
    navigation.navigate('Home');
  };

  const getPosition = () => {
    Geolocation.getCurrentPosition(position => {
      const currentLatitude = position.coords.latitude;
      const currentLongitude = position.coords.longitude;
      setUserPosition({
        latitude: currentLatitude,
        longitude: currentLongitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
      mapRef.current?.animateToRegion(userPosition, 1000),
        (error: Error) => alert(error.message),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
        };
    });
  };

  useLayoutEffect(() => {
    getPosition();
  }, []);

  return (
    <>
      <MapView
        ref={mapRef}
        style={styles.map}
        liteMode={true}
        initialRegion={userPosition}
        showsBuildings={true}
        provider={Platform.OS == 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
        showsUserLocation={false}
        onPress={(e: any) => {
          console.log('click');
        }}>
        <Marker
          coordinate={{
            latitude: userPosition.latitude,
            longitude: userPosition.longitude,
          }}
          title={'Ваше место'}
          pinColor={'#00b7ff'}
        />
        {markers?.map((marker: any) => {
          return (
            <Marker
              // tooltip={true}
              pinColor="random"
              // onPress={() => {
              //   setMarkers(markers.filter(mark => mark.latitude !== marker.latitude))
              // }}
              tracksViewChanges={false}
              key={Math.random().toString()}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude,
              }}
              title={marker.latitude.toString()}></Marker>
          );
        })}
      </MapView>
      <TouchableOpacity onPress={handleGoBack} style={styles.goBackBtn}>
        <GoBackIcon name="arrow-back-ios-new" size={28} color={'#fff'} />
      </TouchableOpacity>
      <TouchableOpacity onPress={getPosition} style={styles.geoBtn}>
        <GeolocationIcon name="my-location" size={33} color={'#fff'} />
      </TouchableOpacity>
    </>
  );
};
export default Map;

const styles = StyleSheet.create({
  map: {
    zIndex: 1,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },

  geoBtn: {
    height: RH(64),
    width: RW(64),
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    backgroundColor: '#128bb8',
    alignSelf: 'center',
    position: 'absolute',
    bottom: RH(60),
    right: RW(24),
    zIndex: 88,
  },
  goBackBtn: {
    height: RH(54),
    width: RW(54),
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 1,
    backgroundColor: '#128bb8',
    alignSelf: 'center',
    position: 'absolute',
    top: RH(10),
    left: RW(24),
    zIndex: 88,
  },
});
function alert(message: string) {
  throw new Error('Function not implemented.');
}
