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
import { ActivityIndicator } from 'react-native-paper';

const TeacherFirstScreen = ({ navigation }) => {
  const [students, setStudents] = useState([]);
  const [fullName, setFullName] = useState('');
  const [isDownloading, setIsDownloading] = useState(false); // Estado para controlar el spinner


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
        fullName: doc.data().fullName,
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
      const url = `https://lasalleapp-mmgp.onrender.com/excel/generate-report?studentId=${studentId}`;
      
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

  const downloadConsolidatedReport = async () => {
    setIsDownloading(true); // Mostrar el spinner de carga
    try {
      const url = `https://lasalleapp-mmgp.onrender.com/excel/generate-consolidated-report`;
      
      // Descargar el archivo con axios
      const response = await axios({
        url,
        method: 'GET',
        responseType: 'arraybuffer', // Importante para manejar la respuesta como un archivo binario
      });

      // Convertir los datos a un formato de cadena base64
      const base64 = arrayBufferToBase64(response.data);

      // Definir la ruta del archivo local donde se guardará
      const localUri = `${FileSystem.documentDirectory}reporte_consolidado.xlsx`;

      // Escribir el archivo en el sistema de archivos
      await FileSystem.writeAsStringAsync(localUri, base64, { encoding: FileSystem.EncodingType.Base64 });

      // Compartir el archivo local
      await Sharing.shareAsync(localUri, {
        mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        dialogTitle: 'Compartir reporte consolidado',
        UTI: 'com.microsoft.excel.xlsx',
      });
    } catch (error) {
      console.error('Error al descargar el reporte consolidado:', error.message);
    } finally {
      setIsDownloading(false); // Ocultar el spinner de carga
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
      <TouchableOpacity style={styles.downloadButton} onPress={downloadConsolidatedReport}>
        <Text style={styles.buttonText}>Descargar Reporte Consolidado</Text>
      </TouchableOpacity>
      {isDownloading && <ActivityIndicator size="large" color="#0000ff" />}
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
    backgroundColor: '#F3F4F6', // Fondo más neutral
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  studentName: {
    fontSize: 18,
    color: '#333',
  },
  button: {
    backgroundColor: '#F59E0B', // Usar el color vibrante para botones
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white', // Texto blanco para contraste
    fontSize: 16,
    fontWeight: '500',
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    padding: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    backgroundColor: 'transparent',
  },
  logoutText: {
    fontSize: 18,
    color: '#F59E0B', // Mantener el color de acento
    marginLeft: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  downloadButton: {
    marginBottom: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#28a745',
    borderRadius: 5,
  },
});

export default TeacherFirstScreen;
