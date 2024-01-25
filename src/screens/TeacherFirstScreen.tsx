/* eslint-disable prettier/prettier */
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

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido profesor</Text>
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
    backgroundColor: '#fff',
  },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  studentName: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default TeacherFirstScreen;
