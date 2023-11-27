/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';

import { RootStackParamList } from '../navigation';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'FirstScreen'>;

const TermsAndConditions = () => {
    const navigation = useNavigation<OverviewScreenNavigationProps>();

    const handleAccept = () => {
        // Redirigir a 'Temas'
        navigation.navigate('Temas');
      };

      const handleDecline = () => {
        // Manejar el rechazo, posiblemente redirigir a 'Login'
        navigation.navigate('LoginScreen');
      };
    

  const openPrivacyPolicy = () => {
    // Linking to privacy policy page
    Linking.openURL('https://www.lasalle.edu.co/universidad-de-la-A-Z/normatividad/proteccion-de-datos-personales/');
  };

  return (
    <View style={styles.card}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Terminos y condiciones</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.paragraph}>
        ¿Autoriza usted a la Universidad de La Salle para que realice el tratamiento apropiado y ético de sus datos consignados en este proceso académico e investigativo, dentro del proyecto “Entorno virtual de aprendizaje inteligente para la enseñanza y aprendizaje de las matemáticas" de conformidad con lo dispuesto en el acuerdo 002 del 3 de mayo de 2018 y las demás normas que la modifiquen, reglamenten y/o adhieran?
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.yesButton} onPress={handleAccept}>
            <Text style={styles.buttonText}>SI</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.noButton} onPress={handleDecline}>
            <Text style={styles.buttonText}>NO</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={openPrivacyPolicy}>
          <Text style={styles.privacyPolicyText}>Mas Informacion click aqui</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 6,
    borderColor: '#e2e8f0',
    backgroundColor: '#f7fafc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    margin: 16,
    padding: 24,
  },
  contentContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paragraph: {
    fontSize: 12,
    color: '#4a5568',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  yesButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#68d391',
    padding: 15,
    alignItems: 'center',
    borderRadius: 4,
  },
  noButton: {
    flex: 1,
    marginLeft: 8,
    backgroundColor: '#e53e3e',
    padding: 15,
    alignItems: 'center',
    borderRadius: 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  privacyPolicyText: {
    textAlign: 'center',
    color: '#4299e1',
    textDecorationLine: 'underline',
    marginTop: 8,
    fontSize: 14,
  },
});

export default TermsAndConditions;
