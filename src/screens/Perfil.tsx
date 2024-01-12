/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import NavBar from '../utils/NavBar';

const Perfil = () => {
  // Asumiendo que estos datos vendrán de alguna parte (estado, props, contexto, etc.)
  const [usuario, setUsuario] = useState({
    nombre: null,
    facultad: null,
    carrera: null,
    fotoPerfil: null, // inicialmente null, será actualizado después
  });

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      const fullName = await AsyncStorage.getItem('fullName');
      const faculty = await AsyncStorage.getItem('faculty');
      const career = await AsyncStorage.getItem('career');
      const imageUrl = await AsyncStorage.getItem('userImageUrl');

      setUsuario({
        nombre: fullName,
        facultad: faculty,
        carrera: career,
        fotoPerfil: imageUrl,
      });
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
