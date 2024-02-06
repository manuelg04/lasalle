/* eslint-disable prettier/prettier */
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AnswerCorrectly = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="star" size={30} color="#4CAF50" />
        <Ionicons name="star" size={30} color="#4CAF50" />
        <Ionicons name="star" size={30} color="#4CAF50" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>Muy Bien</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FEDD7C',
    borderRadius: 8,
    padding: 15,
    maxWidth: 300,
    alignSelf: 'center',
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtitleText: {
    fontSize: 18,
  },
});

export default AnswerCorrectly;
