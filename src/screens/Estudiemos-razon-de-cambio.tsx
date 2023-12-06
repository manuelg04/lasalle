/* eslint-disable prettier/prettier */
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


import { RootStackParamList } from '../navigation';

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
    <View style={styles.container}>
        
                <View style={styles.header}>
                    <Text style={styles.title}>Estudiemos</Text>
                    <Ionicons name="md-school-sharp" size={32} color="#4a90e2" />
                </View>

                <View style={styles.cardContainer}>
                    {/* Tarjetas interactivas */}
                    {/* Tarjeta 1 */}
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Situacion1RazonDeCambio')}>
                        <Ionicons name="md-rocket-sharp" size={32} color={situacion1Completada ? "green" : "grey"} />
                        <Text style={styles.cardText}>Situación 1. ¡Tiempo de empacar!</Text>
                    </TouchableOpacity>
                    {/* Tarjeta 2 */}
                    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Situacion2RazonDeCambio')}>
                        <Ionicons name="md-walk-sharp" size={32} color="green" />
                        <Text style={styles.cardText}>Situación 2 - Caminando a la U</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.reflection}>
                    ¡Completa las situaciones para acceder a la reflexión y continuar perfeccionando tus conocimientos!
                </Text>
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cardContainer: {
    width: '100%',
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
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginLeft: 10,
},
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  situation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
    paddingBottom: 16,
    marginBottom: 16,
  },
  situationText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  reflection: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
    marginTop: 10,
    paddingHorizontal: 20,
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
  button: {
  marginLeft: 10,
  },
});

export default EstudiemosRazonDeCambio;
