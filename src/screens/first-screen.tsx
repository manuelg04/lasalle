import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React = require('react');
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
type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'FirstScreen'>;

export default function FirstScreen() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require('../../assets/lasallelogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View style={styles.section}>
          <Text style={styles.title}>¿Ya tienes una cuenta?</Text>
          <Text style={styles.subtitle}>Si es así, haz click en acceder</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('LoginScreen')}>
            <Ionicons name="log-in-outline" size={24} color="black" />
            <Text style={styles.buttonText}>Acceder</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.section, { marginTop: height * 0.05 }]}>
          <Text style={styles.title}>¿Eres nuevo aquí?</Text>
          <Text style={styles.subtitle}>Empieza aprendiendo hoy</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('SignUpGeneralScreen')}>
            <Ionicons name="person-add-outline" size={24} color="black" />
            <Text style={styles.buttonText}>Crear una cuenta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef2f3',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: width - 20, // Márgenes horizontales ajustados
    maxWidth: 500,
    height: height * 0.8, // Altura ajustada
    backgroundColor: 'white',
    justifyContent: 'space-around',
    padding: 20,
    borderRadius: 20,
    shadowOpacity: 0.2,
    shadowRadius: 15,
    shadowColor: '#000',
    shadowOffset: { height: 10, width: 0 },
    elevation: 5,
  },
  section: {
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#facc15',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 3,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  logo: {
    width: 300,
    height: 200,
    backgroundColor: 'white',
  },
});
