/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

import { RootStackParamList } from '../../navigation';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'ResetPasswordScreen'>;

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  const handleSendCode = async () => {
    if (!email) {
      Alert.alert('Error', 'Por favor, ingresa tu correo electrónico.');
      return;
    }

    try {
      const response = await axios.post('https://lasalleapp.onrender.com/request-code/forgot-password', {
        email,
      });

      if (response.status === 200) {
        Alert.alert('Éxito', 'Código de restablecimiento enviado a tu correo electrónico.');
        navigation.navigate('ResetPasswordScreen', { email });
      }
    } catch (error) {
      console.log('🚀 ~ error:', error.message);
      Alert.alert('Error', 'Ocurrió un error al enviar el código de restablecimiento.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Contraseña</Text>
      <Text style={styles.subtitle}>Ingresa tu correo electrónico y te enviaremos un código para restablecer tu contraseña.</Text>
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Correo Institucional"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSendCode}>
        <Text style={styles.buttonText}>Enviar Código</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#e0f7fa', // Fondo claro
    padding: 20, // Espaciado alrededor
  },
  title: { 
    fontSize: 28, // Tamaño de letra aumentado
    color: '#333', // Color de letra oscuro
    fontWeight: 'bold', // Letra en negrita
    marginBottom: 10, // Margen inferior
  },
  subtitle: {
    fontSize: 16,
    color: '#666', // Color gris para subtítulo
    marginBottom: 20, // Margen inferior
    textAlign: 'center',
  },
  input: {
    width: '90%',
    padding: 15, // Padding aumentado para más espacio
    marginBottom: 20,
    borderWidth: 1, // Borde más sutil
    borderColor: '#ddd', // Color de borde claro
    borderRadius: 5, // Bordes más sutilmente redondeados
    backgroundColor: '#FFF', // Fondo blanco para el input
    shadowColor: '#000', // Sombra para profundidad
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  button: {
    backgroundColor: '#facc15', // Color amarillo para el botón
    padding: 15, // Padding más grande
    borderRadius: 5, // Bordes redondeados
    shadowColor: '#000', // Sombra para el botón
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: '90%', // Ancho del botón
    alignItems: 'center', // Centrar el texto
  },
  buttonText: { 
    color: '#333', // Color de texto oscuro para contraste
    fontSize: 18, // Tamaño de letra aumentado
    fontWeight: '500' // Peso de la letra
  },
});