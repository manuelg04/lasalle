/* eslint-disable prettier/prettier */
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';

import { RootStackParamList } from '../navigation';
import db from '../utils/firebase'; // Asegúrate de importar db correctamente

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'ExpCustomMission'>;
const Experimentemos = ({ route }) => {
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const [studentCareer, setStudentCareer] = useState('');
  const [favoriteSport, setFavoriteSport] = useState('');
  const [favoriteHobby, setFavoriteHobby] = useState('');
  const [generatedProblem, setGeneratedProblem] = useState('');
  const [loading, setLoading] = useState(false);
  const { theme } = route.params;
  console.log('🚀 ~ theme:', theme);

  const fetchStudentCareer = async (userId: any) => {
    try {
      const response = await axios.get(
        `https://lasalleapp.onrender.com/getStudents/student/${userId}`
      );
      const { career } = response.data;
      setStudentCareer(career);
    } catch (error) {
      console.error('Error al obtener la carrera:', error.response.data);
      // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario
    }
  };

  useEffect(() => {
    const getUserIdAndFetchCareer = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        fetchStudentCareer(storedUserId);
      }
    };

    getUserIdAndFetchCareer();
  }, []);

  const handleGenerateProblem = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        'https://lasalleapp.onrender.com/api/experiment/generate-custom-problem',
        {
          input1: studentCareer,
          input2: favoriteSport,
          input3: favoriteHobby,
          theme,
        }
      );
  
      if (response.status === 201) {
        let problemText = response.data.problem.content;
  
        // Extraer las respuestas correctas del texto del problema
        const correctAnswersMatch = problemText.match(/Respuestas correctas:\s*([\s\S]*)/);
        const correctAnswers = correctAnswersMatch ? correctAnswersMatch[1].trim() : '';
  
        // Eliminar las respuestas correctas del texto del problema
        problemText = problemText.replace(/Respuestas correctas:[^]*$/, '').trim();
  
        setGeneratedProblem(problemText);
  
        // Extrae el nombre de la misión del problemText
        const missionNameMatch = problemText.match(/Nombre de la misión: "(.+)"/);
        if (missionNameMatch) {
          const missionName = missionNameMatch[1];
          // Guarda el nombre de la misión actual como la misión anterior
          await AsyncStorage.setItem('currentMissionName', missionName);
        }
  
        navigation.navigate('ExpCustomMission', { problemText, correctAnswers });
      }
    } catch (error) {
      console.error('Error al generar el problema:', error);
      // Manejar el error adecuadamente
    }
    setLoading(false);
  };

  const handleViewPreviousFeedback = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        const q = query(
          collection(db, 'respuestas_experimentemos'),
          where('studentId', '==', storedUserId),
          orderBy('sentDate', 'desc'),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const previousMissionData = querySnapshot.docs[0].data();
          navigation.navigate('FeedbackExperimentemos', {
            studentId: storedUserId,
            missionName: previousMissionData.missionName,
            missionStatement: previousMissionData.context,
            feedbackData: previousMissionData,
          });
        } else {
          console.log('No se encontró feedback de una misión anterior');
          Alert.alert('No hay misión anterior', 'No se encontró feedback de una misión anterior.');
        }
      }
    } catch (error) {
      console.error('Error al obtener el feedback de la misión anterior:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Ajusta este valor según sea necesario
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.container}>
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <Ionicons name="md-cube-outline" size={36} color="#4B5563" />
              <Text style={styles.headerText}>Experimentemos</Text>
            </View>

            <View style={styles.promptContainer}>
              <Text style={styles.promptText}>
                Voy a crear una misión especial para ti, para esto cuéntame ¿cuál es tu hobby y
                deporte favoritos?
              </Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Programa</Text>
              <TextInput
                value={studentCareer}
                placeholder="Programas"
                style={styles.input}
                placeholderTextColor="#B45309"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Hobby</Text>
              <TextInput
                placeholder="escribe un hobby favorito"
                style={styles.input}
                placeholderTextColor="#B45309"
                onChangeText={setFavoriteHobby}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Deporte</Text>
              <TextInput
                placeholder="escribe un deporte favorito"
                style={styles.input}
                placeholderTextColor="#B45309"
                onChangeText={setFavoriteSport}
              />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleGenerateProblem}>
              <Text style={styles.buttonText}>Genera tu propia Misión</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.feedbackButton} onPress={handleViewPreviousFeedback}>
              <Text style={styles.feedbackButtonText}>Ver feedback de la misión anterior</Text>
            </TouchableOpacity>

            {loading ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text style={styles.loadingText}>
                  Estamos creando tu misión matemática, este proceso puede tardar unos segundos.
                </Text>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E7EB', // Gris claro
  },
  contentContainer: {
    padding: 16, // Adjust as needed
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  headerText: {
    color: '#111827', // Gris oscuro
    fontSize: 24,
    fontWeight: 'bold',
  },
  promptContainer: {
    backgroundColor: '#FDE047', // Tailwind yellow-200
    borderRadius: 30,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  promptText: {
    color: '#1E3A8A', // Azul oscuro
    fontSize: 18,
    fontWeight: '600',
    justifyContent: 'center',
  },
  inputGroup: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    backgroundColor: '#FEF3C7', // Tailwind yellow-100
    borderRadius: 30,
    paddingVertical: 6,
    paddingHorizontal: 24,
    marginBottom: 6,
    fontWeight: '600',
    color: '#B45309',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  input: {
    backgroundColor: '#FFFBEB', // Tailwind yellow-50
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderColor: '#FCD34D', // Tailwind yellow-300
    borderWidth: 1,
    width: '100%',
    color: '#B45309',
  },
  button: {
    backgroundColor: '#FDE047', // Tailwind yellow-200
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#B45309', // Tailwind yellow-800
    fontWeight: '600',
  },
  problemContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#F0F4F8',
    borderRadius: 10,
  },
  problemText: {
    fontSize: 16,
    color: '#333',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  loadingText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#4B5563',
  },
  feedbackButton: {
    backgroundColor: '#6B7280',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  feedbackButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Experimentemos;
