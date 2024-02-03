/* eslint-disable prettier/prettier */
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView, Alert, Modal } from 'react-native';
import { RootStackParamList } from '../navigation';
import NavBar from '../utils/NavBar';


type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'FirstScreen'>;
const Temas = () => {
    const [token, setToken] = useState('');
    const navigation = useNavigation<OverviewScreenNavigationProps>();
    const [isRazonDeCambioExpanded, setRazonDeCambioExpanded] = useState(false);
    const [isOptimizacionExpanded, setOptimizacionExpanded] = useState(false);
    const [fullName, setFullName] = useState('');
    const [selectedTheme, setSelectedTheme] = useState('');


    useEffect(() => {
      navigation.setOptions({
        headerLeft: () => null, // Esto elimina el botón de regreso
        headerBackTitle: ' ', // Esto elimina el texto de regreso en iOS
        gestureEnabled: false, // Esto deshabilita el gesto de deslizar para volver en iOS
      });
    }, [navigation]);

    const showAlert = () => {
        Alert.alert("Vaya!", "No puedes continuar si no has completado las fases anteriores.");
      };
      useEffect(() => {
        const checkToken = async () => {
          try {
            const storedToken = await AsyncStorage.getItem('userToken');
            if (!storedToken) {
              // Si no hay token, redirige al inicio de sesión o muestra un mensaje
              Alert.alert("Acceso denegado", "No tienes permiso para acceder a esta página.", [{ text: "OK", onPress: () => navigation.navigate('LoginScreen') }]);
            } else {
              setToken(storedToken);
            }
          } catch (error) {
            console.error('Error al recuperar el token', error);
          }
        };
    
        const loadFullName = async () => {
          try {
            const storedName = await AsyncStorage.getItem('fullName');
            if (storedName) {
                setFullName(storedName);
            }
          } catch (error) {
            console.error('Error al recuperar el nombre del usuario', error);
          }
        };
    
        checkToken();
        loadFullName();  // Llamada a loadFullName fuera de checkToken
    }, [navigation]);
    
  // Aquí puedes agregar tu lógica para verificar el token JWT

  if (!token) {
    return null; // O un componente de carga
  }

  const handleLogout = async () => {
    try {
      // Enumera todas las claves que quieres eliminar
      const keys = ['userToken', 'userId', 'career', 'faculty', 'fullName', 'userType', 'userImageUrl'];
      // Elimina todas las claves
      await AsyncStorage.multiRemove(keys);
      // Navega a la pantalla de inicio de sesión
      navigation.replace('LoginScreen');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  };
  

  const toggleRazonDeCambio = () => {
    setRazonDeCambioExpanded(!isRazonDeCambioExpanded);
  };
  
  const toggleOptimizacion = () => {
    setOptimizacionExpanded(!isOptimizacionExpanded);
  };

  
  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Temas</Text>
            <Ionicons name="book-outline" size={24} color="black" style={styles.bookIcon} />

            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Ionicons name="log-out-outline" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.SubtitleText}>
            <Text style={styles.SubtitleText}>¡Nos alegra tenerte de vuelta! {fullName}</Text>
          </View>
          <View style={styles.SubtitleText}>
            <Text style={styles.description}>¿Qué tema te gustaría reforzar?</Text>
          </View>

          {/* Tema: Razón de Cambio */}
          <TouchableOpacity onPress={toggleRazonDeCambio} style={styles.topicHeader}>
            <Text style={styles.topicTitle}>Razón de cambio</Text>
            <Ionicons
              name={isRazonDeCambioExpanded ? 'chevron-up-outline' : 'chevron-down-outline'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
          {isRazonDeCambioExpanded && (
            <>
              <TouchableOpacity
                style={[styles.button, styles.yellowButton]}
                onPress={() => navigation.navigate('Recordemos')}>
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>Recordemos</Text>
                  <Ionicons name="trophy" size={24} color="black" style={styles.iconStyle} />
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.yellowButton]}
                onPress={() => navigation.navigate('EstudiemosRazonDeCambio')}>
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>Estudiemos</Text>
                  <Ionicons name="school-sharp" size={24} color="black" style={styles.iconStyle} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.borderButton]}
                onPress={() => {
                  setSelectedTheme('Razón de Cambio');
                  navigation.navigate('Experimentemos', { theme: 'Razón de Cambio' });
                }}>
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>Experimentemos</Text>
                  <Ionicons name="cube-sharp" size={24} color="black" style={styles.iconStyle}  />
                </View>
              </TouchableOpacity>
            </>
          )}

          <View style={styles.divider} />

          {/* Tema: Optimización */}
          <TouchableOpacity onPress={toggleOptimizacion} style={styles.topicHeader}>
            <Text style={styles.topicTitle}>Optimización</Text>
            <Ionicons
              name={isOptimizacionExpanded ? 'chevron-up-outline' : 'chevron-down-outline'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
          {isOptimizacionExpanded && (
            <>
            <TouchableOpacity
                style={[styles.button, styles.yellowButton]}
                onPress={() => navigation.navigate('Recordemos')}>
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>Recordemos</Text>
                  <Ionicons name="trophy" size={24} color="black" style={styles.iconStyle} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.yellowButton]}
                onPress={() => navigation.navigate('EstudiemosOptimizacion')}>
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>Estudiemos</Text>
                  <Ionicons name="school-sharp" size={24} color="black" style={styles.iconStyle} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.borderButton]}
                onPress={() => {
                  setSelectedTheme('Optimización');
                  navigation.navigate('Experimentemos', { theme: 'Optimización' });
                }}>
                <View style={styles.buttonContent}>
                  <Text style={styles.buttonText}>Experimentemos</Text>
                  <Ionicons name="cube-sharp" size={24} color="black" style={styles.iconStyle}  />
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
      <NavBar />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1', // Fondo gris claro
    width: '100%',
},
  card: {
    borderRadius: 15, // Bordes más redondeados
    backgroundColor: '#ffffff', // Fondo blanco para la tarjeta
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20, // Asegúrese de que esto no sea demasiado grande para pantallas pequeñas
    paddingTop: 20, // Ajuste según sea necesario
    paddingBottom: 20, // Ajuste según sea necesario
  },
  headerText: {
    fontSize: 24, // Tamaño de letra más grande
    fontWeight: 'bold',
    color: '#333', // Texto más oscuro para mejor contraste
    textAlign: 'center',

  },
  SubtitleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    paddingRight: 10,
    paddingTop: 15,
    alignItems: 'center',
  },
  reflection: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 10,
  },
  userIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  description: {
    color: '#4B5563',
    marginBottom: 70,

  },
  topic: {
    marginBottom: 20,
  },
  topicTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2c3e50', // Un color más oscuro para los títulos
    marginBottom: 10,
  },
  button: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#4b7bec', // Color principal para los botones
  },
  yellowButton: {
    backgroundColor: '#FBBF24',
  },
  buttonText: {
    color: 'white', // Texto blanco para mejor contraste
    fontWeight: 'bold',
    marginLeft: 8, // Espacio entre el icono y el texto
    flexDirection: 'row', // Asegura que el texto y el ícono estén en la misma fila
  alignItems: 'center', // Alinea verticalmente el ícono con el texto
  justifyContent: 'center', // Centra horizontalmente el contenido
  fontweight: 'bold',
  },
  yellowText: {
    color: '#FBBF24',
  },
  borderButton: {
    borderWidth: 2,
    borderColor: '#FBBF24',
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    marginVertical: 20,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: 'orange', // Un color de fondo para que sea visible, cámbialo como prefieras
    borderRadius: 20, // Circular si el icono es redondo

  },
  gifContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  gif: {
    width: 300, // Ajusta según el tamaño deseado
    height: 200, // Ajusta según el tamaño deseado
  },
  topicHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semi-transparente
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: '#2196F3', // Color azul para el botón
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
    width: 100, // Ancho fijo para el botón
    justifyContent: 'center', // Centrar el texto en el botón
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bookIcon: {
    marginRight: 10, // Ajusta el valor según necesites para separar el icono del título
  },
  buttonContent: {
    flexDirection: 'row', // Esto alinea los elementos hijo en una fila
    alignItems: 'center', // Esto centra los elementos hijo verticalmente
    justifyContent: 'center', // Esto centra los elementos hijo horizontalmente
  },
  iconStyle: {
    marginLeft: 8, // Espacio entre el texto y el ícono
  },

});

export default Temas;
