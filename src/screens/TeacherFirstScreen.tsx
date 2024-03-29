/* eslint-disable prettier/prettier */
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { encode as btoa } from 'base-64';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Share } from 'react-native';

import db from '../utils/firebase'; // Asegúrate de importar db correctamente

const TeacherFirstScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    const fetchFullName = async () => {
      const storedFullName = await AsyncStorage.getItem('fullName');
      if (storedFullName) {
        setFullName(storedFullName);
      }
    };
  
    fetchFullName();
    // ...resto de tu código de useEffect
  }, []); // Asegúrate de que el array de dependencias esté vacío para que se ejecute solo en el montaje del componente
  
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // Esto elimina el botón de regreso
      headerBackTitle: ' ', // Esto elimina el texto de regreso en iOS
      gestureEnabled: false, // Esto deshabilita el gesto de deslizar para volver en iOS
    });
  }, [navigation]);


  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, 'student-users'));
      const studentsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentsList);
    };

    fetchStudents();
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    const binary = new Uint8Array(buffer).reduce(
      (acc, byte) => acc + String.fromCharCode(byte),
      ""
    );
    return btoa(binary);
  };

  const downloadReport = async (studentId) => {
    try {
      const url = `https://lasalleapp-dev-sjta.1.us-1.fl0.io/excel/generate-report?studentId=${studentId}`;
      
      // Descargar el archivo con axios
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'arraybuffer', // Importante para manejar la respuesta como un archivo binario
      });
  
      // Convertir los datos a un formato de cadena base64
      const base64 = arrayBufferToBase64(response.data);
  
      // Definir la ruta del archivo local donde se guardará
      const localUri = `${FileSystem.documentDirectory}reporte_${studentId}.xlsx`;
  
      // Escribir el archivo en el sistema de archivos
      await FileSystem.writeAsStringAsync(localUri, base64, { encoding: FileSystem.EncodingType.Base64 });
  
      // Compartir el archivo local
      await Sharing.shareAsync(localUri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: 'Compartir reporte',
        UTI: 'com.microsoft.excel.xlsx',
      });
    } catch (error) {
      console.error('Error al descargar el reporte para', studentId, ':', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      navigation.replace('LoginScreen');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido, Profe {fullName || 'profesor'}</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="black" />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Listado de Estudiantes:</Text>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.studentItem}>
            <Text style={styles.studentName}>{item.fullName}</Text>
            <TouchableOpacity style={styles.button} onPress={() => downloadReport(item.id)}>
              <Text style={styles.buttonText}>Descargar Reporte</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5', // Un fondo más neutro
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white', // Fondo blanco para cada ítem
    borderRadius: 10, // Bordes redondeados
    paddingVertical: 15,
    paddingHorizontal: 20, // Espaciado interno para cada ítem
    marginVertical: 8, // Espacio entre ítems
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  studentName: {
    fontSize: 18,
    fontWeight: '400', // No tan bold
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff', // Mantiene tu color de botón
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500', // Un poco más bold para el texto del botón
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    padding: 20,
    textAlign: 'center',
    marginTop: 40, // Añade espacio en la parte superior
  },
  logoutButton: {
    position: 'absolute',
    top: 48, // Ajusta para que no esté demasiado cerca del borde
    right: 16, // Ajusta para mantener la consistencia
    flexDirection: 'row', // Icono y texto en fila
    alignItems: 'center',
    paddingRight: 10,
    backgroundColor: 'transparent',
  },
  logoutText: {
    fontSize: 18,
    color: '#007bff', // Usa el mismo color que el botón de descarga
    marginLeft: 8, // Añade espacio entre el icono y el texto
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16, // Añade un poco más de espacio antes de la lista
  },
});

export default TeacherFirstScreen;
