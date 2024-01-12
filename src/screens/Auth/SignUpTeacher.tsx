/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

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

    try {
      const response = await axios.post(
        'https://lasalleapp-dev-sjta.1.us-1.fl0.io/teacher/register',
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
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Registro</Text>
          <View />
        </View>
        <Text style={styles.subtitle}>Profesor</Text>
        <View style={styles.iconWrapper} />
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    minWidth: 300,
    height: '100%',
    padding: 24,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: '100%',
    maxWidth: 400,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: '#6B7280',
    marginBottom: 16,
  },
  iconWrapper: {
    backgroundColor: '#FBBF24',
    padding: 8,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#4B5563',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
    padding: 8,
    fontSize: 14,
  },
  button: {
    backgroundColor: '#F59E0B',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default SignUpTeacher;
