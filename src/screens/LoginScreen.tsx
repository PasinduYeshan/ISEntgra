import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  Platform,
  Text,
  View,
} from 'react-native';
import 'text-encoding-polyfill';
import {useAuthContext} from '@asgardeo/auth-react-native';
import {GetAuthURLConfig} from '@asgardeo/auth-js';
import {styles} from '../theme/styles';
import Config from 'react-native-config';

import {initialState, useLoginContext} from '../context/LoginContext';
import {
  getDeviceID,
  disenrollDevice,
  syncDevice,
} from '../services/entgraService';
import {wipeAll} from '../utils/Storage';

// Create a config object containing the necessary configurations.
const config = {
  serverOrigin: Config.IS_BASE_URL,
  baseUrl: Config.IS_BASE_URL,
  clientID: Config.CLIENT_ID,
  signInRedirectURL: Config.SIGN_IN_REDIRECT_URL,
  validateIDToken: false,
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const LoginScreen = (props: {
  navigation: {navigate: (arg0: string) => void};
}) => {
  const {loginState, setLoginState, loading, setLoading} = useLoginContext();
  const {
    state,
    initialize,
    signIn,
    getBasicUserInfo,
    getIDToken,
    getDecodedIDToken,
    getAuthorizationURL,
  } = useAuthContext();

  /**
   * This hook will initialize the auth provider with the config object.
   */
  useEffect(() => {
    // wipeAll();
    initialize(config);
  }, []);

  /**
   * This hook will listen for auth state updates and proceed.
   */
  useEffect(() => {
    console.log(state);
    if (state?.isAuthenticated) {
      const getData = async () => {
        try {
          const basicUserInfo = await getBasicUserInfo();
          const idToken = await getIDToken();
          const decodedIDToken = await getDecodedIDToken();

          setLoginState({
            ...loginState,
            ...state,
            ...basicUserInfo,
            idToken: idToken,
            ...decodedIDToken,
            hasLogin: true,
          });
          setLoading(false);
          props.navigation.navigate('HomeScreen');
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };

      getData();
    } else if (loginState.hasLogoutInitiated) {
      setLoginState(initialState);
      props.navigation.navigate('LoginScreen');
    }
  }, [state.isAuthenticated]);

  /**
   * This function will be triggered upon login button click.
   */
  const handleSubmitPress = async () => {
    setLoading(true);
    try {
      // Sync device information to Entgra Server
      await syncDevice();

      let authURLConfig: GetAuthURLConfig = {};
      // Fetch device id from Entgra SDK and set it in the config object.
      const deviceID = await getDeviceID();
      authURLConfig = {
        device_id: deviceID,
        platformOS: Platform.OS,
        forceInit: true,
      };
      // Sign in
      signIn(authURLConfig).catch((error: any) => {
        setLoading(false);
        console.log(error);
      });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
      return;
    }
  };

  /**
   * This function will be triggered upon disenroll button click.
   */
  const handleDisenrollPressed = async () => {
    try {
      setLoading(true);
      await disenrollDevice();
      setLoading(false);
      props.navigation.navigate('ConsentScreen');
    } catch (err) {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.log(err);
      return;
    }
  };

  return (
    <View style={{...styles.mainBody, justifyContent: 'space-between'}}>
      <View style={{...styles.container, justifyContent: 'space-between'}}>
        <View style={{width: '90%'}}>
          <Text numberOfLines={1} adjustsFontSizeToFit style={styles.topicText}>
            IS Entgra React Native Sample
          </Text>
        </View>
        <View style={{...styles.imageAlign, marginVertical: 10}}>
          <Image
            source={require('../assets/images/login.jpg')}
            style={styles.loginScreenImage}
          />
          {/* <Text style={styles.textpara}>
              Sample demo to showcase authentication for a React Native via the
              OpenID Connect Authorization Code flow, which is integrated using
              the{' '}
              <Text
                style={styles.textStyle}
                onPress={() =>
                  Linking.openURL(
                    'https://github.com/asgardeo/asgardeo-react-native-oidc-sdk',
                  )
                }>
                Asgardeo Auth React Native SDK
              </Text>
              .
            </Text> */}
        </View>
        <View style={styles.button}>
          <Button color="#282c34" onPress={handleSubmitPress} title="Login" />
        </View>
        <View style={{...styles.button, marginVertical: 10}}>
          <Button
            color="#282c34"
            onPress={handleDisenrollPressed}
            title="Disenroll"
          />
        </View>
        {loading ? (
          <View style={styles.loading} pointerEvents="none">
            <ActivityIndicator size="large" color="#FF8000" />
          </View>
        ) : null}
      </View>

      <View style={{...styles.footer}}>
        <Image
          source={require('../assets/images/footer.png')}
          style={styles.footerAlign}
        />
      </View>
    </View>
  );
};

export default LoginScreen;
