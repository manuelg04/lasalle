import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';

const AnswerWrong = ({ tip, url }) => {
  const openResource = () => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>¡Un Consejo!</Text>
        <Text style={styles.message}>{tip}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={openResource}>
        <Text style={styles.buttonText}>Ver Recurso</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
    width: '100%',
    padding: 20,
    marginVertical: 10,
  },
  content: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e1e1',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    paddingBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    borderRadius: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default AnswerWrong;
