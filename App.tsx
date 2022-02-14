/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React , {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import EntgraServiceManager from './entgraService';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [deviceAttributes, setDeviceAttributes] = useState({
    'isDeviceRooted': '',
    'isDevModeEnabled': '',
    'isADBEnabled' : '',
  });

  const [deviceId, setDeviceId] = useState("");

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const getDeviceAttributes = () => EntgraServiceManager.getDeviceAttributes(
    (res: any) => { setDeviceAttributes(res); },
    (err : String) => { console.log(err);}
  );

  const getDeviceID = () => EntgraServiceManager.getDeviceID(
    (res: string) => { setDeviceId(res); },
    (err: string) => { console.log(err);}
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Button
            title = "Get Device Attributes"
            onPress={getDeviceAttributes} />
          <Section title="Is Device Rooted">
            {deviceAttributes.isDeviceRooted.toString()}
          </Section>
          <Section title="Is Development Mode Enabled">
            {deviceAttributes.isDevModeEnabled.toString()}
          </Section>
          <Section title="Is ADB Enabled">
            {deviceAttributes.isADBEnabled.toString()}
          </Section>
          <Button
            title = "Get Device Id"
            onPress={getDeviceID} />
          <Section title="Device Id">
            {deviceId}
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
