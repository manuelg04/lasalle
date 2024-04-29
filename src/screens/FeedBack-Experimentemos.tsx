/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import db from '../utils/firebase'; // Asegúrate de importar db correctamente

const FeedbackExperimentemos = ({ route }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const { studentId, missionName, missionStatement, feedbackData} = route.params; // Asumiendo que estos datos se pasan a través del route

  useEffect(() => {
    const fetchFeedbackData = async () => {
      const q = query(
        collection(db, 'respuestas_experimentemos'),
        where('studentId', '==', studentId),
        where('missionName', '==', missionName)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        console.log('Feedback data:', data);
        setIsLoading(false);
      });
    };

    fetchFeedbackData();

  
  }, [studentId, missionName]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  const renderFeedbackInfo = (feedback) => {
    if (!feedback || !feedback.questions) {
      return null;
    }

    return feedback.questions.map((question, index) => (
      <View key={index} style={styles.feedbackParagraph}>
        <Text style={styles.questionText}>{question.text}</Text>
        {question.options.map((option, optionIdx) => (
          <Text key={`option_${optionIdx}`} style={styles.feedbackText}>
            {optionIdx + 1}: {option}
          </Text>
        ))}
        {question.isCorrect ? (
        <><Text style={styles.correctText}>
            La respuesta seleccionada es correcta.
          </Text><Text style={styles.selectedOptionText}>
              La respuesta seleccionada fue: {question.options[question.selectedOption]}
            </Text></>
      ) : (
        <>
          <Text style={styles.incorrectText}>
            La respuesta seleccionada es incorrecta.
          </Text>
          <Text style={styles.incorrectText}>
            La respuesta seleccionada fue: {question.options[question.selectedOption]}
          </Text>
          <Text style={styles.correctText}>
            La respuesta correcta era: {question.options[question.correctOption]}
          </Text>
        </>
      )}
      </View>
    ));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.feedbackContainer}>
        <Text style={styles.headerText}>Retroalimentación de la Misión</Text>
        <Text style={styles.missionStatementText}>{feedbackData.context}</Text>
        {renderFeedbackInfo(feedbackData)}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Temas')}>
          <Text style={styles.buttonText}>Continuar Estudiando</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECEFF1', // Fondo gris claro
    width: '100%',
  },
  feedbackContainer: {
    backgroundColor: '#FFFFFF', // Fondo blanco para el contenedor de retroalimentación
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    paddingRight: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#263238', // Azul oscuro/gris para el texto del encabezado
    textAlign: 'center',
  },
  feedbackText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginRight: 10,
    textAlign: 'justify', // Justifica el texto para una lectura más natural
  },
  correctText: {
    color: '#4CAF50', // Verde para respuestas correctas
    fontWeight: 'bold',
  },
  incorrectText: {
    color: '#F44336', // Rojo para respuestas incorrectas
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#FF9800', // Naranja para el botón
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // Texto blanco para el botón
    fontSize: 18,
    fontWeight: 'bold',
  },
  questionText: {
    fontWeight: '600', // Más bold que las respuestas, pero no tan bold como un título
    fontSize: 18,
    marginBottom: 5, // Espacio entre la pregunta y la respuesta
    color: '#173753',
  },
  correctFeedback: {
    fontSize: 16,
    color: '#388E3C', // Un verde oscuro para mejor legibilidad
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: '#d4edda', // Fondo verde claro para respuestas correctas
    padding: 5, // Espaciado interno
    borderRadius: 5, // Bordes redondeados
  },
  incorrectFeedback: {
    fontSize: 16,
    color: '#D32F2F', // Un rojo oscuro para mejor legibilidad
    marginLeft: 10,
    marginBottom: 10,
    backgroundColor: '#f8d7da', // Fondo rojo claro para respuestas incorrectas
    padding: 5, // Espaciado interno
    borderRadius: 5, // Bordes redondeados
  },
  feedbackLine: {
    flexDirection: 'row',
    alignItems: 'flex-start', // Alinea los ítems al inicio si es un texto largo.
    flexWrap: 'wrap', // Permite que los elementos se ajusten al siguiente línea si no hay espacio.
    paddingRight: 30,
  },
  icon: {
    marginRight: 20,
  },
  feedbackParagraph: {
    marginBottom: 20, // Añade espacio entre cada párrafo de retroalimentación
    borderBottomWidth: 1, // Añade una línea divisoria sutil
    borderBottomColor: '#DDDDDD', // Color gris claro para la línea divisoria
    paddingBottom: 10, // Espacio debajo del texto antes de la línea divisoria
    padding: 10, // Añadir espaciado interno para cada sección de retroalimentación
    backgroundColor: '#fff', // Fondo blanco para resaltar el bloque
    borderRadius: 5, // Bordes redondeados
    shadowColor: '#000', // Sombras para dar profundidad
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  preguntaContainer: {
    backgroundColor: '#f8f9fa', // Un fondo ligeramente diferente para cada pregunta
    borderRadius: 5, // Bordes redondeados
    padding: 10, // Espaciado interno
    marginBottom: 15, // Espaciado entre pregunta
  },
  answerText: {
    fontSize: 14,
    color: '#333', // Color oscuro para texto normal
    marginVertical: 2, // Espaciado vertical para las respuestas
  },
  selectedAnswerText: {
    fontWeight: 'bold', // Hacer la respuesta seleccionada más prominente
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEFF1', // Fondo gris claro
  },
  missionStatementText: {
    fontSize: 14,
    marginBottom: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'justify', // Justifica el texto para una lectura más natural
  },
  selectedOptionText:{
    fontSize: 14,
    color: 'blue',
    fontWeight: 'bold',
  }
});

export default FeedbackExperimentemos;
