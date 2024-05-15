import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {memo, useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import {VehicleResponseType, requestVehicleInfo} from '../../services/apiCall';
import {RH, RW} from '../../utils/responsiveScreen';

const EachCarInfo = ({route}: any) => {
  const {backgroundColor, id} = route.params;
  const [info, setInfo] = useState<VehicleResponseType | string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const {width} = Dimensions.get('window');
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useLayoutEffect(() => {
    requestVehicleInfo(id, setInfo);
  }, []);
  return (
    <LinearGradient
      colors={[backgroundColor, 'transparent']}
      collapsable={true}
      start={{x: -0.8, y: 0.5}}
      end={{x: 0.8, y: 1.9}}
      style={{flex: 1}}>
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={styles.closeBtn}
          onPress={() => navigation.goBack()}>
          <CloseIcon name="close" size={30} color={'#fff'} />
        </TouchableOpacity>
        <Text style={styles.vehicleName}>Make : {info?.vehicle}</Text>
        <Text style={styles.vehicleYear}>Year : {info?.year}</Text>
        <FlatList
          data={info?.photos}
          keyExtractor={item => item}
          pagingEnabled
          horizontal
          bounces
          maxToRenderPerBatch={1}
          style={{
            width: '100%',
            height: '45%',
            paddingTop: RH(20),
            marginTop: RH(40),
          }}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
          renderItem={({item}) => {
            // console.log(item);
            return (
              <View style={[styles.eachPhotoBox, {width}]}>
                <LinearGradient
                  colors={[backgroundColor, '#fff']}
                  collapsable={true}
                  start={{x: -0.5, y: 1}}
                  end={{x: 1.4, y: 2}}
                  style={{
                    height: '100%',
                    borderRadius: RW(20),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    onLoadEnd={() => setLoading(false)}
                    source={{uri: item}}
                    resizeMode="cover"
                    style={styles.eachPhoto}
                  />
                  {loading ? (
                    <View style={styles.loaderBox}>
                      <ActivityIndicator size="large" color={backgroundColor} />
                    </View>
                  ) : null}
                </LinearGradient>
              </View>
            );
          }}
        />
        {/* {info?.error ? <Text>{info?.error}</Text> : null} */}
      </View>
    </LinearGradient>
  );
};

export default memo(EachCarInfo);
const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: RH(60),
    alignItems: 'center',
  },
  eachPhotoBox: {
    paddingHorizontal: RW(20),
    height: '84%',
    // backgroundColor: 'red',
  },
  eachPhoto: {
    height: '95%',
    width: '97%',
    alignSelf: 'center',
    borderRadius: RW(10),
  },
  vehicleName: {
    fontSize: RH(28),
    color: '#fff',
  },
  vehicleYear: {
    color: '#fff',
    fontSize: RH(24),
  },
  closeBtn: {
    position: 'absolute',
    top: RH(-45),
    right: RW(20),
  },
  loaderBox: {
    height: '100%',
  },
});
