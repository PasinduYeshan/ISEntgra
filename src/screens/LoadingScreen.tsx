import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
} from 'react-native';
import {styles} from '../theme/styles';

import {getStoredString} from '../utils/Storage';
import {enrollDevice} from '../services/entgraService';

const LoadingScreen = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  useEffect(() => {
    async function checkDeviceEnrolledStat() {
      const enrolledState = await getStoredString('enrolledState');
      if (enrolledState == null || enrolledState === 'false') {
        props.navigation.navigate('ConsentScreen');
      } else {
        props.navigation.navigate('LoginScreen');
      }
    }
    checkDeviceEnrolledStat();
  }, []);

  return (
    <>
      <View style={{...styles.mainBody, backgroundColor: 'black'}}>
        <View
          style={{
            alignItems: 'center',
            height: '100%',
            justifyContent: 'center',
          }}>
          <Image
            source={require('../assets/images/wso2-inverted-logo.png')}
            style={styles.image}
          />
        </View>
      </View>
    </>
  );
};

export default LoadingScreen;
