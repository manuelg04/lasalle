/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import Modal from 'react-native-modal';

import { RootStackParamList } from '../navigation';
import NavBar from '../utils/NavBar';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'FirstScreen'>;

const Perfil = () => {
  // Asumiendo que estos datos vendrán de alguna parte (estado, props, contexto, etc.)
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const [isModalVisible, setModalVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
      const email = await AsyncStorage.getItem('email');
      console.log("🚀 ~ email:", email)
      console.log("🚀 ~ imageUrl:", imageUrl)
      

      setUsuario({
        nombre: fullName,
        facultad: faculty,
        carrera: career,
        fotoPerfil: imageUrl,
      });
    };

    obtenerDatosUsuario();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlePasswordChange = () => {
    if (email && newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        // Aquí iría la lógica para enviar la solicitud al backend
        console.log('Solicitar cambio de contraseña');
        setModalVisible(false);
      } else {
        Alert.alert(
          "!Atención!", // Título personalizado
          "Las contraseñas no coinciden", // Mensaje
          [{ text: "OK" }] // Array de botones
        );
      }
    } else {
      Alert.alert(
        "!Atención!", // Título personalizado
        "Por favor, complete todos los campos", // Mensaje
        [{ text: "OK" }] // Botón de acción única para cerrar el alert
      );
    }
  };


  return (
    <><View style={styles.container}>
        <Text style={styles.titulo}>Ajustes de Perfil</Text>
        <Image source={{ uri: usuario.fotoPerfil || 'https://via.placeholder.com/150' }} style={styles.imagenPerfil} />
        <Text style={styles.texto}>Nombre: {usuario.nombre || 'Nombre no disponible'}</Text>
        <Text style={styles.texto}>Facultad: {usuario.facultad || 'Facultad no disponible'}</Text>
        <Text style={styles.texto}>Carrera: {usuario.carrera || 'Carrera no disponible'}</Text>
        <TouchableOpacity style={styles.boton} onPress={toggleModal}>
          <Text style={styles.textoBoton}>Cambiar Contraseña</Text>
        </TouchableOpacity>
        <Modal isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        >
          <View style={styles.modalContent}>
            <TextInput
              placeholder='Ingrese su correo electrónico'
              placeholderTextColor='gray'
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize='none'
            />
            <TextInput
              placeholder='Ingrese nueva contraseña'
              placeholderTextColor='gray'
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
            <TextInput
              placeholder='Confirme nueva contraseña'
              placeholderTextColor='gray'
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handlePasswordChange}>
              <Text style={styles.buttonText}>Solicitar cambio de contraseña</Text>
            </TouchableOpacity>
          </View>
        </Modal>
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
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  input: {
    height: 40,
    marginVertical: 10,
    borderWidth: 1,
    padding: 10,
    width: 250,
  },
  button: {
    backgroundColor: '#F59E0B',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
  }
});

export default Perfil;
