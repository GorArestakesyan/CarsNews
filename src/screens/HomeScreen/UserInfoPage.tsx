import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button, StyleSheet, View} from 'react-native';
import Animated from 'react-native-reanimated';

function DetailsScreen({route}: {navigation?: any; route?: any}) {
  const {item, index, color} = route.params;
  console.log('in details', index);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View style={styles.container}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
      <Animated.View
        style={[styles.userCircle, {backgroundColor: color}]}
        sharedTransitionTag={`tags${index}`}></Animated.View>
      <Animated.Text
        sharedTransitionTag={`tag${index}`}
        style={{fontSize: 33, color: 'blue'}}>
        {item}
      </Animated.Text>
      <View style={{backgroundColor: 'red', width: 200, height: 200}}></View>
    </View>
  );
}
export default DetailsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  userCircle: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    opacity: 1,
  },
});
