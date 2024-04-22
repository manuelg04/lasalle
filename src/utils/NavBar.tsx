/* eslint-disable prettier/prettier */
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

import { RootStackParamList } from '../navigation';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Temas', 'Perfil' >;

const NavBar = () => {
    const navigation = useNavigation<OverviewScreenNavigationProps>();
  return (
    <View style={styles.navbar}>
      <TouchableOpacity 
      style={styles.button}
        onPress={() => navigation.navigate('Temas')}
      >
        <Ionicons name="md-bulb-outline" size={32} color="gray" />
        <Text style={styles.iconText}>Temas</Text>
      </TouchableOpacity>
      <TouchableOpacity 
      onPress={() => navigation.navigate('Perfil')}
      style={styles.button}
      >
      <Ionicons name="md-settings-outline" size={32} color="gray" />
        <Text style={styles.iconText}>Ajustes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  iconText: {
    color: 'gray',
    fontSize: 10,
  },
});

export default NavBar;

// <View style={styles.container}>
// <View style={styles.imageContainer}>
//   <Text style={styles.text}>
//     Usa el coeficiente <Image source={require('../../assets/testing.png')} style={styles.image} /> para dividir
//   </Text>
// </View>
// </View>