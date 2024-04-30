/* eslint-disable prettier/prettier */
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


import { RootStackParamList } from '../navigation';
import NavBar from '../utils/NavBar';
import { ScrollView } from 'react-native-gesture-handler';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'Situacion1RazonDeCambio', 'Situacion2RazonDeCambio'  >;

const EstudiemosRazonDeCambio = () => {
    const navigation = useNavigation<OverviewScreenNavigationProps>();
    const [situacion1Completada, setSituacion1Completada] = useState(false);
    const route = useRoute<RouteProp<RootStackParamList, 'EstudiemosRazonDeCambio'>>();

  const verificarSiEstaCompletada = async () => {
    try {
      const completada = await AsyncStorage.getItem('situacion_1_completada');
      if (completada === 'true') {
        setSituacion1Completada(true);
      }
      if (route.params?.situacionCompletada) {
        setSituacion1Completada(true);
      }
    } catch (error) {
      console.error('Error al leer el estado de finalización', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      verificarSiEstaCompletada();
      // No dependencias adicionales necesarias, el callback se ejecutará cada vez que el componente gane el foco
    }, [route])
  );

  return (
    <><View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Estudiemos razón de cambio</Text>
        <Ionicons name="md-school-sharp" size={32} color="green" />

        {/* <View style={styles.menu}>
      <Ionicons name="menu" size={24} />
      <Ionicons name="wifi" size={24} />
      <Text style={styles.menuText}>Menu</Text>
    </View> */}
        <Text style={styles.reflection}> Estas haciendo las situaciones 1 y 2 de la temática razón de cambio</Text>
      </View>

      <View style={styles.card}>
        <TouchableOpacity
          style={styles.situation}
          onPress={() => navigation.navigate('Situacion1RazonDeCambio')}
        >
          <Text style={styles.situationText}>Situación 1. ¡Tiempo de empacar!</Text>
          <Ionicons name="md-rocket-sharp" size={32} color="green" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.situation}
          onPress={() => navigation.navigate('Situacion2RazonDeCambio')}
        >
          <Text style={styles.situationText}>Situación 2. Caminando a la U</Text>
          <Ionicons name="md-walk-sharp" size={32} color="green" />
        </TouchableOpacity>
      </View>
     
  <Text style={styles.reflection}>
    ¡Completa las situaciones para acceder a la reflexión!
    Y continua perfeccionando tus conocimientos.
    Ten presente que las respuestas que selecciones no se pueden desmarcar, pero puedes 
    realizar las situaciones las veces que desees.
  </Text>


      {/* <View style={styles.footer}>
      <Ionicons name="home" size={24} />
      <Ionicons name="mail" size={24} />
      <Ionicons name="cube" size={24} />
      <Ionicons name="menu" size={24} />
    </View> */}
    </View><NavBar /></>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fafc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  menuText: {
    fontSize: 14,
    marginLeft: 8,
  },
  progressBarContainer: {
    width: '80%',
    height: 20,
    backgroundColor: '#d1d5db',
    borderRadius: 10,
    marginTop: 16,
  },
  progressBar: {
    width: '25%',
    height: '100%',
    backgroundColor: '#16a34a',
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
  },
  card: {
    backgroundColor: '#fff',
    height: '45%',
    marginTop: 20,
    width: '100%',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  situation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fab005',
    paddingBottom: 16,
    marginBottom: 16,
  },
  situationText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  reflection: {
    textAlign: 'center',
    fontSize: 14,
    paddingHorizontal: 10,
    marginBottom: 15,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingVertical: 16,
    width: '100%',
  },
});

export default EstudiemosRazonDeCambio;
