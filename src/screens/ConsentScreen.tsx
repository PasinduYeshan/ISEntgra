import React from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  Linking,
  Text,
  View,
} from 'react-native';
import {styles} from '../theme/styles';

const ConsentScreen = () => {
  return (
    <>
      <View style={styles.mainBody}>
        <View>
          <View style={styles.container}>
            <View>
              <Text style={styles.text}>Disclaimer</Text>
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
              <Button
                color="#282c34"
                onPress={() => {}}
                title="Login"
              />
            </View>
            {/* {loading ? (
              <View style={styles.loading} pointerEvents="none">
                <ActivityIndicator size="large" color="#FF8000" />
              </View>
            ) : null} */}
          </View>

          <View style={styles.footer}>
            <Image
              source={require('../assets/images/footer.png')}
              style={styles.footerAlign}
            />
          </View>
        </View>
      </View>
    </>
  );
};

export default ConsentScreen;
