/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const AnswerWrong = ({tip, url}) => {
    const openResource = () => {
        // Aquí puedes usar Linking de React Native o tu método preferido para abrir URLs
        Linking.openURL(url);
      };
  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>Tip!</Text>
      </View>
      <View style={styles.messageContainer}>
        <Text style={styles.message}>
        {tip}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={openResource}>
          <Text style={styles.buttonText}>Recurso</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    width: 350,
    padding: 16,
  },
  content: {
    flexDirection: 'column',
    padding: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a4a4a',
  },
  messageContainer: {
    borderWidth: 2,
    borderColor: 'red',
    padding: 16,
    borderRadius: 4,
    marginTop: 16,
  },
  message: {
    fontSize: 14,
    color: '#4a4a4a',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    padding: 24,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff', // Replace with your primary color
    borderRadius: 4,
    height: 40,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default AnswerWrong;
