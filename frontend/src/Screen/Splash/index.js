import {View, Text, SafeAreaView, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS} from '../../Assets';
import {GetItem} from '../../Utils/Storage';
import {jwtDecode} from 'jwt-decode';
import {useDispatch} from 'react-redux';
import {RemoveToken} from '../../Features/authSlice';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const AmbilData = async () => {
    const response = await GetItem('profile');
    setTimeout(() => {
      if (!response) {
        navigation.replace('Login');
      } else {
        const decode = jwtDecode(response?.token);
        const currentDate = new Date();
        if (decode.exp * 1000 < currentDate.getTime()) {
          dispatch(RemoveToken({id: response?.data?.userId}));
          navigation.replace('Login');
        } else {
          navigation.replace('Main');
        }
      }
    }, 1500);
  };
  useEffect(() => {
    AmbilData();
  }, []);
  return (
    <SafeAreaView style={styles.STContainer}>
      <View style={styles.STContent}>
        <Text style={styles.STTextBold}>GO DONOR</Text>
        <Text style={styles.STTextNormal}>
          Looking for a pathway for smooth assistance
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
const styles = StyleSheet.create({
  STContainer: {
    flex: 1,
  },
  STContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 25,
  },
  STTextBold: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 30,
  },
  STTextNormal: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 16,
  },
});
