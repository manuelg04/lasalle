/* eslint-disable prettier/prettier */
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function ResetPasswordScreen({ route, navigation }) {
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { email } = route.params;

  const handleResetPassword = async () => {
    if (!code || !newPassword) {
      Alert.alert('Error', 'Por favor, ingresa el código y la nueva contraseña.');
      return;
    }

    try {
      const response = await axios.post('https://lasalleapp.onrender.com/new-password/reset-password', {
        email,
        code,
        newPassword,
      });

      if (response.status === 200) {
        Alert.alert('Éxito', 'Contraseña restablecida correctamente.');
        navigation.navigate('LoginScreen');
      }
    } catch (error) {
      console.log('🚀 ~ error:', error.message);
      Alert.alert('Error', 'Ocurrió un error al restablecer la contraseña.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Restablecer Contraseña</Text>
      <Text style={styles.subtitle}>Ingresa el código que se envió a tu correo electrónico y tu nueva contraseña.</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCode}
        value={code}
        placeholder="Código de Verificación"
      />
      <TextInput
        style={styles.input}
        onChangeText={setNewPassword}
        value={newPassword}
        placeholder="Nueva Contraseña"
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Restablecer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#e0f7fa' // Color de fondo claro
  },
  title: { 
    fontSize: 28, // Aumento del tamaño de fuente
    color: '#333', 
    fontWeight: 'bold',
    marginBottom: 5 // Reducción del espacio debajo del título
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20 // Añade espacio horizontal para un mejor ajuste del texto
  },
  input: {
    width: '90%',
    padding: 15,
    borderWidth: 2,
    borderColor: '#007BFF', // Borde azul para destacar
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#FFF', // Fondo blanco para los inputs
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  button: {
    backgroundColor: '#facc15', // Color amarillo que has proporcionado
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    width: '90%', // Asegura que el botón sea del mismo ancho que los inputs
    alignItems: 'center',
  },
  buttonText: { 
    color: '#333', 
    fontSize: 18, 
    fontWeight: '500'
  },
});
