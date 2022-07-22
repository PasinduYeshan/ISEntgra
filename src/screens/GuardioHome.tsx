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

const GuardioHome = (props: {
  navigation: {navigate: (args0: string) => void};
}) => {
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
            source={require('../assets/images/guardio-primary.png')}
            style={styles.image}
          />
          <View style={{width: '90%', marginTop: 10}}>
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              style={styles.topicText1}>
              <Text style={styles.topicText1}>Guardio </Text>
              <Text style={styles.topicText2}>Finance</Text>
            </Text>
          </View>
          <View></View>
        </View>
      </View>
    </>
  );
};

export default GuardioHome;
