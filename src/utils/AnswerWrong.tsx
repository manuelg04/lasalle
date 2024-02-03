/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking, Platform } from 'react-native';

const AnswerWrong = ({ tip, url }) => {
  const openResource = () => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.card}>
      <View style={styles.content}>
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
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
    width: '100%',
    padding: 20,
    marginVertical: 12,
  },
  content: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e2e2',
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#495057',
    paddingBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 15,
    color: '#6c757d',
    lineHeight: 22,
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007bff',
    borderRadius: 25,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#007bff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '500',
  },
});

export default AnswerWrong;
