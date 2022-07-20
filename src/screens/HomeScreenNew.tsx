import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  Linking,
  Text,
  View,
} from 'react-native';
import {styles} from '../theme/styles';

import { useLoginContext } from '../context/LoginContext';
import {useAuthContext} from '@asgardeo/auth-react-native';

const HomeScreenNew = (props: {
  navigation: {navigate: (args0: string) => void};
}) => {

  const {loginState, setLoginState, loading, setLoading} = useLoginContext();
  const {state, signOut, refreshAccessToken} = useAuthContext();

  const handleSubmitPress = async () => {
    
    setTimeout(() => props.navigation.navigate('LoginScreen'), 1000);
  };

  return (
    <>
      <View
        style={{
          ...styles.mainBody,
          flex: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../assets/images/wso2-logo.png')}
            style={styles.image}
          />
          {/* <Text style={styles.heading}>Hi {loginState.username} !</Text> */}
          <Text style={styles.heading}>Welcome to Guardio Finance</Text>
          {/* <Text style={styles.textpara}>
            We may send your device information to Entgra IoT Server to assess
            your device's security level and to provide you with the best
            services. All data sent to Entgra IoT Server is only accessible to
            the authorized users and can be permanently removed if needed.
          </Text> */}
        </View>
        <View
          style={{...styles.button, marginBottom: 10, alignItems: 'center'}}>
          <Button
            color="#282c34"
            onPress={handleSubmitPress}
            title="Back to Login"
          />
        </View>
        {loading ? (
          <View style={styles.loading} pointerEvents="none">
            <ActivityIndicator size="large" color="#FF8000" />
          </View>
        ) : null}
      </View>
    </>
  );
};

export default HomeScreenNew;
