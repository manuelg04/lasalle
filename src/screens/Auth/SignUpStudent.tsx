/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Platform, Alert, ScrollView, ActivityIndicator } from 'react-native';

import { RootStackParamList } from '../../navigation';
import TermsAndConditions from '../TermsAndConditions';

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
  const [image, setImage] = useState<string | null>(null);
  const [cameraPermission, requestCameraPermission] = ImagePicker.useCameraPermissions();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);


  const programas = facultad ? facultadesConProgramas[facultad] : [];

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  const handleTakePhoto = async () => {
    // Verifica si ya tienes permiso
    if (!cameraPermission?.granted) {
      // Solicita permiso para acceder a la cámara
      const permissionResult = await requestCameraPermission();
      if (!permissionResult.granted) {
        alert("Necesitas dar permiso para acceder a la cámara");
        return;
      }
    }
  
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };
  
  const showImagePickerOptions = () => {
    Alert.alert(
      "Seleccionar Imagen",
      "Elige cómo quieres seleccionar tu imagen",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Tomar Foto",
          onPress: handleTakePhoto
        },
        {
          text: "Elegir de la Galería",
          onPress: pickImage
        }
      ]
    );
  };
  

  const handleRegister = async () => {
    if (!email || !fullName || !password || !facultad || !programa) {
      alert('Todos los campos son requeridos');
      return;
    }
    
    if (!email.endsWith('@unisalle.edu.co')) {
      alert('El correo debe ser del dominio @unisalle.edu.co');
      return;
    }
    
    let timer = null;
    
    try {
      setIsRegistering(true);
      setIsUploading(true);
      setUploadProgress(0);
      
      let uploadResponse = { data: { url: '' } };
      
      if (image) {
        const formData = new FormData();
        formData.append('file', { uri: image, name: 'profile.jpg' });
      
        timer = setInterval(() => {
          setUploadProgress((prevProgress) => {
            if (prevProgress >= 100) {
              clearInterval(timer);
              return 100;
            }
            return prevProgress + 10;
          });
        }, 500);
      
        setIsUploading(true);
        setUploadProgress(0);
      
        uploadResponse = await axios({
          method: 'post',
          url: 'https://lasalleapp.onrender.com/profileImage/upload',
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      
        clearInterval(timer);
        setUploadProgress(100);
        setIsUploading(false);
      
        if (uploadResponse.status === 200) {
          console.log('Upload success');
        }
      }
      
      const response = await axios.post(
        'https://lasalleapp.onrender.com/student/register',
        {
          email,
          fullName,
          password,
          career: programa,
          faculty: facultad,
          imageUrl: uploadResponse.data.url,
        }
      );
      
      if (response.status === 201) {
        const token = response.data.token;
        const imageUrl = response.data.imageUrl;
        const fullName = response.data.fullName;
        const career = response.data.career;
        const faculty = response.data.faculty;
        
        await AsyncStorage.setItem('career', career);
        await AsyncStorage.setItem('faculty', faculty);
        await AsyncStorage.setItem('fullName', fullName);
        await AsyncStorage.setItem('userToken', token);
        await AsyncStorage.setItem('userImageUrl', imageUrl);
        setIsRegistering(false);
        alert('Registro completado');
        navigation.navigate('TermsAndConditions');
      }
    } catch (error) {
      if (timer !== null) {
        clearInterval(timer);
      }
      setIsRegistering(false);
      if (isUploading) {
        setIsUploading(false);
      }
      
      if (error.response && error.response.status === 400) {
        console.log(error.response.data);
        alert('Error en el registro: ' + error.response.data.message);
      } else {
        console.log(error);
        alert('Algo salió mal');
      }
    }
  };


  return (
    <ScrollView style={styles.scrollView}>
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>Registro</Text>
          <Text style={styles.title}>Estudiante</Text>
        </View>
        <TouchableOpacity onPress={showImagePickerOptions} style={styles.photoIcon}>
        {image ? (
          <Image source={{ uri: image }} style={styles.photo} />
        ) : (
          <Text style={styles.text}>Sube tu foto</Text>
        )}
      </TouchableOpacity>

      {image && isUploading && (
  <View style={styles.progressContainer}>
    <Text style={styles.progressText}>Cargando imagen... {uploadProgress}%</Text>
    <View style={styles.progressBar}>
      <View style={[styles.progressFill, { width: `${uploadProgress}%` }]} />
    </View>
  </View>
)}
      
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
        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isRegistering}>
  {isRegistering ? (
    <ActivityIndicator size="small" color="#fff" />
  ) : (
    <Text style={styles.buttonText}>Registrarme</Text>
  )}
</TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#FFF',
  },
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
  photoIcon: {
    backgroundColor: '#FBBF24',
    height: 85,
    width: 85,
    padding: 8,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  photo: {
    height: '100%',
    width: '100%',
    borderRadius: 50,
  },
  text: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    padding: 8,
    
  },
  progressContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    marginBottom: 5,
  },
  progressBar: {
    width: '80%',
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 5,
  },
});

export default SignUpStudent;
