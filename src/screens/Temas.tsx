/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';

import { RootStackParamList } from '../navigation';


type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'FirstScreen'>;
const Temas = () => {
    const [token, setToken] = useState('');
    const navigation = useNavigation<OverviewScreenNavigationProps>();

    useEffect(() => {
        const checkToken = async () => {
          try {
            const storedToken = await AsyncStorage.getItem('userToken');
            if (!storedToken) {
              // Si no hay token, redirige al inicio de sesión o muestra un mensaje
              Alert.alert("Acceso denegado", "No tienes permiso para acceder a esta página.", [{ text: "OK", onPress: () => navigation.navigate('LoginScreen') }]);
            } else {
              setToken(storedToken);
            }
          } catch (error) {
            console.error('Error al recuperar el token', error);
          }
        };
    
        checkToken();
      }, [navigation]);
  // Aquí puedes agregar tu lógica para verificar el token JWT

  if (!token) {
    return null; // O un componente de carga
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Temas</Text>
          <Image
            style={styles.userIcon}
            source={{ uri: 'https://example.com/user-icon.png' }} // Reemplaza con la URL de tu imagen
          />
        </View>
        <Text style={styles.description}>Escoge un tema que deseas reforzar</Text>

        <View style={styles.topic}>
          <Text style={styles.topicTitle}>Razón de cambio</Text>
          <TouchableOpacity 
          style={[styles.button, styles.yellowButton]}
            onPress={() => navigation.navigate('Recordemos')}>
            <Text style={styles.buttonText}>Recordemos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.yellowButton]}>
            <Text style={styles.buttonText}>Estudiemos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.borderButton]}>
            <Text style={[styles.buttonText, styles.yellowText]}>Experimentemos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <View style={styles.topic}>
          <Text style={styles.topicTitle}>Optimización</Text>
          <TouchableOpacity style={[styles.button, styles.yellowButton]}>
            <Text style={styles.buttonText}>Recordemos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.yellowButton]}>
            <Text style={styles.buttonText}>Estudiemos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.borderButton]}>
            <Text style={[styles.buttonText, styles.yellowText]}>Experimentemos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 10,
  },
  card: {
    borderRadius: 10,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  userIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  description: {
    color: '#4B5563',
    marginBottom: 20,
  },
  topic: {
    marginBottom: 20,
  },
  topicTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#1F2937',
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  yellowButton: {
    backgroundColor: '#FBBF24',
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#1F2937',
  },
  yellowText: {
    color: '#FBBF24',
  },
  borderButton: {
    borderWidth: 2,
    borderColor: '#FBBF24',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginVertical: 20,
  },
});

export default Temas;
