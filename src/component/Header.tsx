import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
    import { faBars } from '@fortawesome/free-solid-svg-icons/faBars';
import { useNavigation } from '@react-navigation/native';

import {styles} from '../theme/styles';

export default function Header({screen}: {screen: string}) {
  const navigation : any = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <FontAwesomeIcon icon={faBars} size={ 20} />
      </TouchableOpacity>
      <View style={{justifyContent:'center', alignSelf:'center'}}>
        <Text style={styles.headerPageNameText}>{screen}</Text>
      </View>
    </View>
  );
}


