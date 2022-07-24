import {height, width} from '@fortawesome/free-solid-svg-icons/faBars';
import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  Linking,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {styles} from '../theme/styles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faDollar} from '@fortawesome/free-solid-svg-icons/faDollar';

const GuardioHome = (props: {
  navigation: {navigate: (args0: string) => void};
}) => {
  function renderHeader() {
    return (
      <View style={{width: '100%', height: 300}}>
        <ImageBackground
          source={require('../assets/images/solid-color-image.png')}
          resizeMode="cover"
          style={{flex: 1, alignItems: 'center'}}>
          {/* Balance Section */}
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 50,
            }}>
            <Image
            source={require('../assets/images/guardio-light.png')}
            style={styles.image}
          />
            <Text style={{color: 'white', fontSize: 18}}>
              {' '}
              Available Balance
            </Text>
            <Text
              style={{
                color: 'white',
                marginTop: 10,
                fontSize: 20,
                fontWeight: 'bold',
              }}>
              LKR 468,000.00
            </Text>
          </View>
        </ImageBackground>
      </View>
    );
  }

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 2,
          backgroundColor: 'white',
          height: 70,
        }}
        onPress={() => {}}>
        <FontAwesomeIcon
          icon={faDollar}
          size={30}
          color="black"
          style={{flex: 1}}
        />
        <View
          style={{
            flex: 1,
            marginLeft: 3,
          }}>
          <Text style={{color: 'black'}}>{item.description}</Text>
          <Text style={{color: 'black'}}>{item.date}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            height: '100%',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black'}}>{item.amount}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  function renderTransactionHistory() {
    return (
      <View
        style={{
          marginTop: 20,
          marginHorizontal: 10,
          paddingHorizontal: 20,
          borderRadius: 10,
          backgroundColor: 'white',
        }}>
        <Text style={{...styles.topicText3}}>Recent Transaction History </Text>
        <FlatList
          contentContainerStyle={{marginTop: 10}}
          scrollEnabled={false}
          data={transactionHistory}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => (
            <View
              style={{height: 1, width: '100%', backgroundColor: 'black'}}
            />
          )}
        />
      </View>
    );
  }

  return (
    <>
      <View style={{flex:1, flexDirection: 'column', backgroundColor: 'white',justifyContent: 'flex-start'}}>
        <View style={{flex: 1, justifyContent: 'flex-start'}}>{renderHeader()}</View>

        <View style={{flex:2, alignContent: 'center', justifyContent: 'flex-start'}}>{renderTransactionHistory()}</View>
      </View>
    </>
  );
};

export default GuardioHome;

{
  /* <View
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
      </View> */
}

const transactionHistory = [
  {
    id: 1,
    description: 'Fund transfer via CEFT',
    date: '12/12/2020',
    amount: 'LKR 20,000.00',
  },
  {
    id: 2,
    description: 'Fund transfer via CEFT',
    date: '12/12/2020',
    amount: 'LKR 50,000.00',
  },
  {
    id: 3,
    description: 'Fund transfer via CEFT',
    date: '12/12/2020',
    amount: 'LKR 35,000.00',
  },
  {
    id: 4,
    description: 'Fund transfer via CEFT',
    date: '12/12/2020',
    amount: 'LKR 12,000.00',
  },
  {
    id: 5,
    description: 'Fund transfer via CEFT',
    date: '12/12/2020',
    amount: 'LKR 86,000.00',
  },
  {
    id: 6,
    description: 'Fund transfer via CEFT',
    date: '12/12/2020',
    amount: 'LKR 102,000.00',
  },
  // {
  //   id: 7,
  //   description: 'Fund transfer via CEFT',
  //   date: '12/12/2020',
  //   amount: 'LKR 96,000.00',
  // },
];
