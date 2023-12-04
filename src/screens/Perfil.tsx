/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import NavBar from '../utils/NavBar';

const Perfil = () => {
  // Asumiendo que estos datos vendrán de alguna parte (estado, props, contexto, etc.)
  const usuario = {
    nombre: 'John Doe',
    facultad: 'Ciencias de la Computación',
    carrera: 'Ingeniería de Software',
    fotoPerfil: 'https://via.placeholder.com/150', // URL de la imagen de perfil (cambiar según sea necesario)
  };

  return (
    <><View style={styles.container}>
          <Text style={styles.titulo}>Ajustes de Perfil</Text>
          <Image source={{ uri: usuario.fotoPerfil }} style={styles.imagenPerfil} />
          <Text style={styles.texto}>Nombre: {usuario.nombre}</Text>
          <Text style={styles.texto}>Facultad: {usuario.facultad}</Text>
          <Text style={styles.texto}>Carrera: {usuario.carrera}</Text>
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
