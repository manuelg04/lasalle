/* eslint-disable prettier/prettier */
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';

const Experimentemos = () => {
    const [studentCareer, setStudentCareer] = useState('');
    const [favoriteSport, setFavoriteSport] = useState('');
    const [favoriteHobby, setFavoriteHobby] = useState('');
    const [generatedProblem, setGeneratedProblem] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchStudentCareer = async (userId:any) => {
        try {
          const response = await axios.get(`https://lasalleapp-dev-sjta.1.us-1.fl0.io/getStudents/student/${userId}`);
          const { career } = response.data;
          setStudentCareer(career);
        } catch (error) {
          console.error('Error al obtener la carrera:', error);
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
            const response = await axios.post('https://lasalleapp-dev-sjta.1.us-1.fl0.io/api/experiment/generate-custom-problem', {
                input1: studentCareer,
                input2: favoriteSport,
                input3: favoriteHobby,
            });

            if (response.status === 201) {
                // Acceder a la propiedad content del objeto problem
                const problemText = response.data.problem.content;
                setGeneratedProblem(problemText);
            }
        } catch (error) {
            console.error('Error al generar el problema:', error);
            // Manejar el error adecuadamente
        }
        setLoading(false);
    };
    
  return (
    <ScrollView style={styles.container}>
    <View style={styles.contentContainer}>
                <View style={styles.header}>
                    <Ionicons name="md-cube-outline" size={36} color="#4B5563" />
                    <Text style={styles.headerText}>Experimentemos</Text>
                </View>

                <View style={styles.promptContainer}>
                    <Text style={styles.promptText}>¡Cuéntame sobre tu hobby y deporte favoritos!</Text>
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
          <Text style={styles.label}>Deporte</Text>
          <TextInput
            placeholder="escribe un deporte favorito"
            style={styles.input}
            placeholderTextColor="#B45309"
            onChangeText={setFavoriteSport}
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

        <TouchableOpacity style={styles.button} onPress={handleGenerateProblem}>
                    <Text style={styles.buttonText}>Genera tu propia Misión</Text>
                </TouchableOpacity>

                {loading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
{generatedProblem ? (
  <View style={styles.problemContainer}>
    <Text style={styles.problemText}>{generatedProblem}</Text>
  </View>
) : null}
               
      </View>
    </ScrollView>
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
});

export default Experimentemos;
