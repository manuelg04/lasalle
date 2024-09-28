/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { RootStackParamList } from '../../navigation';


type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'FirstScreen'>;
const SignUpTeacher = () => {
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const handleRegister = async () => {
    if (!email || !fullName || !password) {
      alert('Todos los campos son requeridos');
      return;
    }

    if(!email.endsWith('@unisalle.edu.co')){
      alert('El correo debe ser del dominio @unisalle.edu.co');
      return;
    }

    try {
      const response = await axios.post(
        'https://lasalleapp-mmgp.onrender.com/teacher/register',
        {
          email,
          fullName,
          password,
        }
      );

      if (response.status === 201) {
        // Manejar la respuesta exitosa aquí, como guardar el token JWT
        const token = response.data.token;
        await AsyncStorage.setItem('userToken', token);
        alert('Registro completado');
        // Navegar a la pantalla específica del profesor
        navigation.navigate('TeacherFirstScreen');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Todos los campos son requeridoss');
      } else {
        alert('Algo salió mal');
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Registro</Text>
            <View />
          </View>
          <Text style={styles.subtitle}>Profesor</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nombre completo</Text>
            <TextInput
              style={styles.input}
              editable
              onChangeText={setFullName}
              value={fullName}
              placeholder="Nombre Completo"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              editable
              secureTextEntry
              onChangeText={setPassword}
              value={password}
              placeholder="Contraseña"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>E-mail Institucional</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="E-mail Institucional"
              editable
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Registrarme</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'flex-start', // Cambiar de 'center' a 'flex-start' para alinear el contenido al principio.
    paddingTop: 10, // Reducir el padding top para disminuir el espacio superior.
    paddingHorizontal: 20, // Mantener algún padding horizontal para que no esté pegado a los bordes laterales.
  },
  card: {
    backgroundColor: 'white',
    padding: 32, // Añadiendo más espacio interno para un diseño más limpio
    borderRadius: 20, // Bordes más redondeados para un look moderno
    shadowColor: '#0000001A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    width: '100%',
    maxWidth: 450, // Aumento del tamaño máximo del contenedor
    marginTop: 20, // Espacio adicional en la parte superior
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Alinear al centro el título
    marginBottom: 24, // Más espacio después del título
  },
  title: {
    fontWeight: '600',
    fontSize: 28, // Haciendo el título más destacado
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#374151', // Color suave para el subtítulo
    fontSize: 16, // Aumentando el tamaño de fuente para el subtítulo
    marginBottom: 24, // Aumentando el espacio después del subtítulo
  },
  iconWrapper: {
    height: 90,
    width: 90,
    borderRadius: 45,
    alignSelf: 'center',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 24, // Más espacio entre campos de entrada
  },
  label: {
    fontSize: 16, // Tamaño de fuente incrementado
    fontWeight: '600', // Peso de fuente fuerte para mejorar la legibilidad
    color: '#4B5563',
    marginBottom: 8, // Espacio después de la etiqueta
  },
  input: {
    borderWidth: 1.5,
    borderColor: '#D1D5DB', // Usando el color proporcionado
    padding: 12,
    fontSize: 16,
    borderRadius: 10, // Bordes de los campos de entrada redondeados
    backgroundColor: '#FFFFFF', // Fondo claro dentro de los input
  },
  button: {
    backgroundColor: '#F59E0B', // Color de acento para el botón
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18, // Tamaño de la fuente incrementada para los botones
  },
});

export default SignUpTeacher;
