/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

import { RootStackParamList } from '../../navigation';

const facultadesConProgramas: any = {
  'Facultad de Economía Empresa y Desarrollo Sostenible FEEDS': [
    'Administración de Empresas',
    'Contaduría Pública',
    'Finanzas y Comercio Internacional',
    'Economía',
    'Negocios y Relaciones Internacionales',
  ],
  'Escuela de Ciencias Básicas y Aplicadas': ['Biologia'],
  'Facultad de Ciencias de la Salud': ['Optometria'],
  'Facultad de Ciencias Sociales y Humanas': [
    'Archivistica e inteligencia de negocios',
    'Bibliotecologia y estudios de la informacion',
    'Trabajo social',
    'Filosofia y letras',
  ],
  'Facultad de Ingenieria': [
    'Ingenieria de Software',
    'Ingenieria civil',
    'Ingenieria de alimentos',
    'Ingenieria Electrica',
    'Ingenieria ambiental y sanitaria',
    'Ingenieria en Automatizacion',
    'Ingenieria industrial',
    'Ingenieria de quimica',
  ],
  'Facultad de Ciencias Agropecuarias': [
    'Administracion de agronecios',
    'Ingenieria agronomica',
    'Medicina y veterinario',
    'Zootecnia',
  ],
  'Facultad de Ciencias de la Educacion': [
    'Licenciatura en espanol y lenguajes extranjeras',
    'Licenciatura en educacion religiosa',
    'Licenciatura en educacion basica primaria',
    'Licenciatura en ciencias naturales y educacion ambiental',
    'Licenciatura en literatura y lengua castellana',
  ],
  'Facultad de arquitectura diseno y urbanismo': [
    'Arquitectura',
    'Urbanismo',
    'Diseno visual',
    'Diseno industrial',
  ],
};

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'FirstScreen'>;
const SignUpStudent = () => {
    const navigation = useNavigation<OverviewScreenNavigationProps>();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [facultad, setFacultad] = useState('');
  const [programa, setPrograma] = useState('');
  const programas = facultad ? facultadesConProgramas[facultad] : [];

  const handleRegister = async () => {
    if (!email || !fullName || !password || !facultad || !programa) {
      alert('Todos los campos son requeridos');
      return;
    }

    try {
      const response = await axios.post(
        'https://lasalleapp-dev-sjta.1.us-1.fl0.io/student/register',
        {
          email,
          fullName,
          password,
          career: programa,
          faculty: facultad,
        }
      );

      if (response.status === 201) {
        // Manejar la respuesta exitosa aquí, como guardar el token JWT
        const token = response.data.token;
        await AsyncStorage.setItem('userToken', token);
        alert('Registro completado');
        navigation.navigate('Temas');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('Todos los campos son requeridos');
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
        <Text style={styles.subtitle}>Estudiante</Text>
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
            editable
            onChangeText={setEmail}
            value={email}
            placeholder="E-mail Institucional"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Facultad</Text>
          <Picker
            selectedValue={facultad}
            onValueChange={(itemValue, itemIndex) => {
              setFacultad(itemValue);
              setPrograma(''); // Resetea el programa cuando cambia la facultad
            }}>
            <Picker.Item label="Seleccione una facultad" value="" />
            {Object.keys(facultadesConProgramas).map((key) => (
              <Picker.Item key={key} label={key} value={key} />
            ))}
          </Picker>
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Programa</Text>
          <Picker
            selectedValue={programa}
            enabled={programas.length > 0}
            onValueChange={(itemValue, itemIndex) => setPrograma(itemValue)}>
            <Picker.Item label="Seleccione un programa" value="" />
            {programas.map((prog, index) => (
              <Picker.Item key={index} label={prog} value={prog} />
            ))}
          </Picker>
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

export default SignUpStudent;
