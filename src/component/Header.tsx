import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
    import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
    import { faBell } from '@fortawesome/free-solid-svg-icons/faBell';
import { useNavigation } from '@react-navigation/native';

import {styles} from '../theme/styles';

export default function Header({screen}: {screen: string}) {
  const navigation : any = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <FontAwesomeIcon icon={faBars} size={ 20} color='white'/>
      </TouchableOpacity>
      <View style={{justifyContent:'center', alignSelf:'center'}}>
        <FontAwesomeIcon
                icon={faBell}
                size={20}
                color="white"
                style={{flex: 1}}
                secondaryColor="black"
              />
      </View>
    </View>
  );
}


