/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { RootStackParamList } from '../navigation';
import NavBar from '../utils/NavBar';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'FirstScreen'>;

const Perfil = () => {
  // Asumiendo que estos datos vendrán de alguna parte (estado, props, contexto, etc.)
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const [usuario, setUsuario] = useState({
    nombre: '',
    facultad: '',
    carrera: '',
    fotoPerfil: '', // inicialmente null, será actualizado después
  });

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // Esto elimina el botón de regreso
      headerBackTitle: ' ', // Esto elimina el texto de regreso en iOS
      gestureEnabled: false, // Esto deshabilita el gesto de deslizar para volver en iOS
    });
  }, [navigation]);

  useEffect(() => {
    
    const obtenerDatosUsuario = async () => {
      const fullName = await AsyncStorage.getItem('fullName');
      const faculty = await AsyncStorage.getItem('faculty');
      const career = await AsyncStorage.getItem('career');
      const imageUrl = await AsyncStorage.getItem('userImageUrl');
      console.log("🚀 ~ imageUrl:", imageUrl)
      

      setUsuario({
        nombre: fullName,
        facultad: faculty,
        carrera: career,
        fotoPerfil: imageUrl,
      });
      console.log("🚀 ~ usuario:", usuario)
    };

    obtenerDatosUsuario();
  }, []);


  return (
    <><View style={styles.container}>
        <Text style={styles.titulo}>Ajustes de Perfil</Text>
        <Image source={{ uri: usuario.fotoPerfil || 'https://via.placeholder.com/150' }} style={styles.imagenPerfil} />
        <Text style={styles.texto}>Nombre: {usuario.nombre || 'Nombre no disponible'}</Text>
        <Text style={styles.texto}>Facultad: {usuario.facultad || 'Facultad no disponible'}</Text>
        <Text style={styles.texto}>Carrera: {usuario.carrera || 'Carrera no disponible'}</Text>
        <TouchableOpacity style={styles.boton}>
            <Text style={styles.textoBoton}>Cambiar Contraseña</Text>
        </TouchableOpacity>
    </View>
    <NavBar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingBottom : 120,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imagenPerfil: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  texto: {
    fontSize: 16,
    marginBottom: 10,
  },
  boton: {
    marginTop: 20,
    backgroundColor: '#facc15',
    padding: 10,
    borderRadius: 5,
  },
  textoBoton: {
    color: 'black',
    fontSize: 16,
  },
});

export default Perfil;
