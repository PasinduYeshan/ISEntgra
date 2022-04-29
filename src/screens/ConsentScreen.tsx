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

import {enrollDevice} from '../services/entgraService';

const ConsentScreen = (props: {
  navigation: {navigate: (args0: string) => void};
}) => {
  const [loading, setLoading] = useState(false);

  const handleSubmitPress = async () => {
    setLoading(true);
    enrollDevice().catch(e => {
      console.log(e);
      setLoading(false);
    });
    // props.navigation.navigate('LoginScreen');
    setLoading(false);
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
          <Text style={styles.heading}>Disclaimer</Text>
          <Text style={styles.textpara}>
            We may send your device information to Entgra IoT Server to assess
            your device's security level and to provide you with the best
            services. All data sent to Entgra IoT Server is only accessible to
            the authorized users and can be permanently removed if needed.
          </Text>
        </View>
        <View
          style={{...styles.button, marginBottom: 10, alignItems: 'center'}}>
          <Button
            color="#282c34"
            onPress={handleSubmitPress}
            title="Continue"
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

export default ConsentScreen;
