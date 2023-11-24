import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

import { RootStackParamList } from '../../navigation';

type DetailsSreenRouteProp = RouteProp<RootStackParamList, 'LoginScreen'>;
type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'FirstScreen'>;

export default function LoginScreen() {
  const router = useRoute<DetailsSreenRouteProp>();
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí deberías poner tu lógica de verificación de las credenciales
    // Por ahora, solo mostraré una alerta
    Alert.alert('Login', 'Credenciales ingresadas. Implementar verificación.');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          {/* Icono de flecha hacia atrás, puedes usar una imagen o crear tu propio componente */}
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Ingresa a tu cuenta</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Usuario</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Usuario"
            autoCapitalize="none"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Contraseña"
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acceder</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    height: '100%',
    minWidth: 400,
    padding: 20,
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowColor: '#000',
    shadowOffset: { height: 0, width: 0 },
    width: '80%',
    maxWidth: 340,
    alignItems: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 24,
    color: '#4a4a4a',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginVertical: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4a4a4a',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    color: '#4a4a4a',
  },
  button: {
    backgroundColor: '#facc15',
    paddingVertical: 12,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
