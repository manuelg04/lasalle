import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';

import { RootStackParamList } from '../navigation';
const { width, height } = Dimensions.get('window');

// Ajustes para diferentes tamaños de pantalla
const baseWidth = 375; // Ancho base, por ejemplo el del iPhone SE
const scale = width / baseWidth; // Escala basada en el ancho de la pantalla

const scaledSize = (size) => Math.ceil(size * scale);

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'FirstScreen'>;

export default function FirstScreen() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <View>
          <Image
            source={require('../../assets/lasallelogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>¿Ya tienes una cuenta?</Text>
          <Text style={styles.subtitle}>Si es así, haz click en acceder</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.buttonText}>Acceder</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { marginTop: height * 0.05 }]}>
          <Text style={styles.title}>¿Eres nuevo aquí?</Text>
          <Text style={styles.subtitle}>Empieza aprendiendo hoy</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUpGeneralScreen')}>
            <Text style={styles.buttonText}>Crear una cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const logoWidth = scaledSize(250); // Tamaño base para el logo
const logoHeight = logoWidth * (200 / 300); // Mantener la relación de aspecto del logo
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: scaledSize(20),
  },
  card: {
    width: '100%', // Utiliza el 100% del ancho del contenedor
    maxWidth: scaledSize(500), // Usa el máximo de 500 o menos según la escala
    minHeight: height * 0.5, // Usa minHeight para asegurar contenido visible
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.1,
    shadowRadius: scaledSize(10),
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    padding: scaledSize(20),
    borderRadius: scaledSize(10),
  },
  section: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '500',
    color: '#4a4a4a',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#6e6e6e',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#facc15',
    paddingVertical: 12,
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  logo: {
    width: logoWidth,
    height: logoHeight,
    backgroundColor: 'white',
    resizeMode: 'contain', // Asegura que el logo se escale dentro de las dimensiones definidas
  },
});
