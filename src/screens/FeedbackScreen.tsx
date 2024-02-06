/* eslint-disable prettier/prettier */
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import { RootStackParamList } from '../navigation';
import db from '../utils/firebase'; // Asegúrate de importar db correctamente

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'FeedbackScreen'>;

const FeedbackScreen = ({ route }) => {
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const [feedbackData, setFeedbackData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { idCuestionarioNormalizado, idEstudiante } = route.params;
  console.log(
    `idCuestionarioNormalizado: ${idCuestionarioNormalizado}, idEstudiante: ${idEstudiante}`
  );

  useEffect(() => {
    const fetchLatestAttempt = async () => {
      const q = query(
        collection(db, 'respuestas_estudiantes'),
        where('idCuestionarioNormalizado', '==', idCuestionarioNormalizado),
        where('idEstudiante', '==', idEstudiante),
        orderBy('fechaIntento', 'desc'),
        limit(1)
      );

      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const latestAttemptData = querySnapshot.docs[0].data();
          setFeedbackData(latestAttemptData); // Aquí estableces la data de Firestore en el estado
          setIsLoading(false); // Data ha sido cargada
        } else {
          console.log(
            `No se encontraron intentos para el cuestionario: ${idCuestionarioNormalizado} y estudiante: ${idEstudiante}`
          );
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error completo:', error);
        if (error) {
          console.error('Detalles del error de Firestore:', error.code, error.message);
        }
        setIsLoading(false);
      }
    };

    fetchLatestAttempt();
  }, [idCuestionarioNormalizado, idEstudiante]);

  // Verificar si está cargando y mostrar el indicador de carga
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  const fasesOrdenadas = [
    '¿Qué comprendes de la situación?',
    '¿Qué plan diseñarías?',
    '¿Cómo llevarías a cabo el plan?',
    '¿Qué resultados obtienes?',
  ];
  const renderFeedbackInfo = (feedback) => {
    if (!feedback || !feedback.respuestasPorFase) {
      return null;
    }

    // Usamos el arreglo fasesOrdenadas para asegurarnos de que las fases se muestren en el orden correcto
    return fasesOrdenadas.map((faseOrdenada, index) => {
      const preguntas = feedback.respuestasPorFase[faseOrdenada];
      if (!preguntas) return null; // Si no hay preguntas para la fase, no renderizar nada

      // Mapeamos sobre las fases y renderizamos la información de cada una
      return (
        <View key={index} style={styles.feedbackParagraph}>
          <Text style={styles.questionText}>{faseOrdenada}</Text>
          {preguntas.map((pregunta, preguntaIdx) => (
            <View key={`pregunta_${preguntaIdx}`} style={styles.preguntaContainer}>
              <Text style={styles.feedbackText}>{pregunta.enunciado}</Text>
              <Text style={styles.feedbackText}>Respuestas Posibles:</Text>
              {pregunta.respuestasPosibles.map((respuesta, respuestaIdx) => (
                <Text key={`respuesta_${respuestaIdx}`} style={styles.answerText}>
                  {respuestaIdx + 1}: {respuesta}
                </Text>
              ))}
              <View style={styles.selectedAnswerContainer}>
                <Text style={styles.selectedAnswerText}>
                  Respuesta Seleccionada:{' '}
                  {pregunta.respuestasPosibles[pregunta.respuestaSeleccionada]}
                </Text>
              </View>
              <View
                style={[
                  styles.correctIncorrectText,
                  pregunta.esCorrecta ? styles.correctFeedback : styles.incorrectFeedback,
                ]}>
                <Text>
                  La respuesta que seleccionaste es{' '}
                  {pregunta.esCorrecta ? 'correcta' : 'incorrecta'}.
                </Text>
              </View>
            </View>
          ))}
        </View>
      );
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.feedbackContainer}>
        <Text style={styles.headerText}>Retroalimentación</Text>
        <Text style={styles.headerText}>Has finalizado de responder exitosamente</Text>
        {renderFeedbackInfo(feedbackData)}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('EstudiemosRazonDeCambio')}>
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
    color: '#333',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECEFF1', // Fondo gris claro
  },
  selectedAnswerContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0', // Un borde sutil
    backgroundColor: '#FAFAFA', // Un fondo ligeramente gris para destacar la respuesta
    padding: 8,
    borderRadius: 4,
    marginVertical: 4, // Añade espacio verticalmente
  },
  correctIncorrectText: {
    fontWeight: 'bold',
    padding: 8,
    borderRadius: 4,
  },
});

export default FeedbackScreen;
