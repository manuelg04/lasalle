/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { RootStackParamList } from '../../navigation';
import { Ionicons } from '@expo/vector-icons';


type DetailsSreenRouteProp = RouteProp<RootStackParamList, 'LoginScreen'>;
type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'FirstScreen'>;

export default function LoginScreen() {
  const router = useRoute<DetailsSreenRouteProp>();
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('student'); // O 'professor', dependiendo del contexto

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // Esto elimina el botón de regreso
      headerBackTitle: ' ', // Esto elimina el texto de regreso en iOS
      gestureEnabled: false, // Esto deshabilita el gesto de deslizar para volver en iOS
    });
  }, [navigation]);

  const handleLogin = async () => {
    // Asegúrate de validar las entradas según sea necesario
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, ingresa tu correo electrónico y contraseña.');
      return;
    }
   
    try {
      const response = await axios.post('https://lasalleapp.onrender.com/login/login', {
        email,
        password,
        userType, // Asegúrate de que este valor esté siendo recogido o manejado correctamente
      });

      if (response.status === 200) {
        const { token, userId, fullName, userType, career, faculty, imageUrl} = response.data;
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userId', userId);
        if (career !== undefined && faculty !== undefined && imageUrl !== undefined) {
          await AsyncStorage.setItem('career', career);
          await AsyncStorage.setItem('faculty', faculty);
          await AsyncStorage.setItem('userImageUrl', imageUrl);
        }        
        await AsyncStorage.setItem('fullName', fullName);
        await AsyncStorage.setItem('userType', userType);
         // Guarda la imageUrl en AsyncStorage
        
       // Verificar si el usuario es un estudiante o un profesor y navegar a la pantalla correspondiente
       if (userType === 'student') {
        navigation.navigate('Temas');
      } else if (userType === 'professor') {
        navigation.navigate('TeacherFirstScreen'); // Asegúrate de que esta pantalla esté definida en tu Stack Navigator
      } else {
        // Manejar otros casos o erroresj
        console.error('Tipo de usuario no reconocido:', userType);
      }
    }
        

    } catch (error) {
    console.log("🚀 ~ error:", error.message)
      alert(error);
 
    }
  };

  return (
    <View style={styles.container}>
    
      <View style={styles.card}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          {/* Icono de flecha hacia atrás, puedes usar una imagen o crear tu propio componente */}
          <Text style={styles.backButtonText}
          onPress={() => navigation.navigate('FirstScreen')}
          >←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Ingresa a tu cuenta</Text>
        <Ionicons name="person-circle-outline" size={40} color="#4a4a4a" style={styles.loginIcon} />
        <View style={styles.selectorContainer}>
          <TouchableOpacity
            style={[styles.selectorButton, userType === 'student' && styles.selected]}
            onPress={() => setUserType('student')}>
            <Text style={[styles.selectorText, userType === 'student' && styles.selectedText]}>Estudiante</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.selectorButton, userType === 'professor' && styles.selected]}
            onPress={() => setUserType('professor')}>
            <Text style={[styles.selectorText, userType === 'professor' && styles.selectedText]}>Profesor</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
    
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Correo Institucional"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Contraseña"
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acceder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    height: '100%',
    minWidth: 400,
    padding: 20,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    width: '80%',
    maxWidth: 340,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 24,
    color: '#4a4a4a',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#4a4a4a',
  },
  button: {
    backgroundColor: '#facc15',
    paddingVertical: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logo: {
    height: 100, // Ajusta estos valores según sea necesario
    width: 100, // Ajusta estos valores según sea necesario
    marginBottom: 20,
  },
  loginIcon: {
    marginVertical: 10,
  },
  userTypeContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  selectedButton: {
    backgroundColor: '#facc15',
    paddingVertical: 12,
    borderRadius: 5,
    width: '50%',
    alignItems: 'center',
    marginTop: 10,
  },
  selectorButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'grey',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selected: {
    backgroundColor: '#facc15', // o cualquier otro color para destacar la selección
  },
  selectedText: {
    color: 'white', // El color del texto cuando el botón está seleccionado
    fontWeight: 'bold',
  },
  selectorText: {
    color: 'black', // El color por defecto del texto
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
