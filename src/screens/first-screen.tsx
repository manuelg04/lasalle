import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';

import { RootStackParamList } from '../navigation';
const { width, height } = Dimensions.get('window');
type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'FirstScreen'>;

export default function FirstScreen() {
  const navigation = useNavigation<OverviewScreenNavigationProps>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: width - 1, // Márgenes horizontales de 20
    maxWidth: 500,
    height: height * 0.5,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
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
});
