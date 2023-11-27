/* eslint-disable prettier/prettier */
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';

import { RootStackParamList } from '../../navigation';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'FirstScreen'>;

const SignUpGeneralScreen = () => {
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Crear una cuenta</Text>
        <Text style={styles.subtitle}>Elige un tipo de cuenta</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUpStudent')}>
          <Text style={styles.buttonText}> Estudiante </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SignUpTeacher')}>
          <Text style={styles.buttonText}> Profesor</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Cargando la inspiración para tu futuro académico. ¡Gracias por tu espera!
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  contentContainer: {
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    color: '#4A4A4A',
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: '#FFB020',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '500',
  },
  footerText: {
    color: '#6e6e6e',
    textAlign: 'center',
    marginTop: 12,
    fontSize: 14,
  },
});

export default SignUpGeneralScreen;
