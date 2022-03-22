import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  Linking,
  Text,
  View,
} from 'react-native';
// TODO: Check usage
import "text-encoding-polyfill";
import {useAuthContext} from '@asgardeo/auth-react-native';
import {styles} from '../theme/styles';
import {initialState, useLoginContext} from '../context/LoginContext';

// Create a config object containing the necessary configurations.
const config = {
  clientID: '2hEVOCMPrCEXyqMIzmBtSTuYhJMa',
  serverOrigin: 'https://10.0.2.2:9443',
  // signInRedirectURL: "wso2sample://oauth2"
  signInRedirectURL: 'http://10.0.2.2:8081',
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
  } = useAuthContext();

  /**
   * This hook will initialize the auth provider with the config object.
   */
  useEffect(() => {
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
          // eslint-disable-next-line no-console
          console.log(error);
        }
      };

      getData();
    } else if (loginState.hasLogoutInitiated) {
      setLoginState(initialState);
      props.navigation.navigate('LoginScreen');
    }
  }, []);

  /**
   * This function will be triggered upon login button click.
   */
  const handleSubmitPress = async () => {
    setLoading(true);
    signIn().catch((error: any) => {
      setLoading(false);
      // eslint-disable-next-line no-console
      console.log(error);
    });
    console.log('after sign in', state);
  };

  return (
    <View style={styles.mainBody}>
      <View>
        <View style={styles.container}>
          <View>
            <Text style={styles.topicText}>IS Entgra React Native Sample</Text>
          </View>
          <View style={styles.imageAlign}>
            <Image
              source={require('../assets/images/login.jpg')}
              style={styles.image}
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
          {loading ? (
            <View style={styles.loading} pointerEvents="none">
              <ActivityIndicator size="large" color="#FF8000" />
              
            </View>
          ) : null}
        </View>

        <View style={styles.footer}>
          <Image
            source={require('../assets/images/footer.png')}
            style={styles.footerAlign}
          />
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
