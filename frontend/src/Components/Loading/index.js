import {View, ActivityIndicator, StyleSheet, Text} from 'react-native';
import React from 'react';
import {COLORS} from '../../Assets';

const LoadingComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.STCardLoading}>
        <ActivityIndicator size={'large'} color={'#0000ff'} />
        <Text style={styles.STTextLoading}>Loading....</Text>
      </View>
    </View>
  );
};

export default LoadingComponent;
const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  STCardLoading: {
    borderWidth: 1,
    borderColor: COLORS.grey,
    height: 200,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    opacity: 0.5,
    borderRadius: 10,
    shadowOffset: {width: 0, height: 2},
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 0.5,
  },
  STTextLoading: {
    marginTop: 10,
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: '700',
  },
});
