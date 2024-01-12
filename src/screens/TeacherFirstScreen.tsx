/* eslint-disable prettier/prettier */
// TeacherFirstScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TeacherFirstScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido profesor</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ReportScreen')} // Asumiendo que tienes una pantalla 'ReportScreen' definida en tu navegador.
      >
        <Text style={styles.buttonText}>Ver reporte</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default TeacherFirstScreen;
