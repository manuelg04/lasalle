/* eslint-disable prettier/prettier */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  Image,
  Modal,
  ActivityIndicator,
  Button,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { RootStackParamList } from '../navigation';
import { recursos } from '../screens/Recordemos';
import AnswerCorrectly from '../utils/AnswerCorrectly';
import AnswerWrong from '../utils/AnswerWrong';

const situacion1Opt = [
  {
    tituloSituacion: 'Situación 3. Construyendo mi empresa',
    enunciado:
      'Un grupo de estudiantes de último semestre universitario, deciden montar una empresa que vende un material amigable con el ambiente y usado en la construcción de viviendas. Este grupo descubre que el ingreso total (en dólares) en la empresa esta descrito por la relación I=400000-〖(x-2000)〗^2 En donde I es el ingreso total y x el número de unidades vendidas del material. La empresa requiere conocer el mayor ingreso total. Con respecto a la situación planteada anteriormente responda: ',
    postEnunciado: 'Con respecto a la situación planteada anteriormente responda:',
    Subtitulo: '¿Qué comprendes de la situación?',
    postSubtitulo: 'El objetivo del problema es:',
    preguntas: [
      {
        enunciado: '1. El objetivo de la situación es:',
        url: 'https://a7h7o2dls3piqoqkxnv0mw.on.drv.tw/Recursos_APP_Francisco/OVA_PASOS_RP5/Pasos_para_RP/',
        respuestas: ['a. Maximizar una funcion', 'b. Minimizar una funcion'],
        respuestaCorrecta: 0,
        tip: 'Ten presente revisar la comprensión de una situación en Pasos para resolver un problema ',
      },
      {
        enunciado: '2. ¿En este problema se debe?',
        url: 'https://drive.google.com/file/d/1Jtv0g2NSgsnac35AMC8bxREeRDBLh5qh/view?usp=sharing',
        respuestas: [
          'a. Maximizar un ingreso total',
          'b. Maximizar unidades vendidas',
          'c. Maximizar ganancias',
          'd. Maximiar un costo',
        ],
        respuestaCorrecta: 0,
        tip: 'Es importante identificar la incógnita de la situación. Ten presente estudiar máximos y mínimos',
      },
      {
        enunciado: '3. El ingreso de los estudiantes cuando venden 1500 artículos es de:',
        url: 'https://h5p.org/h5p/embed/1465798',
        respuestas: [
          'a. 150000 dólares',
          'b. 1500000 dólares',
          'c. 400000 dólares',
          'd. 403500 dólares',
        ],
        respuestaCorrecta: 0,
        tip: 'Es importante identificar los datos que nos dan en la situación Ten presente  estudiar la evaluación de funciones en recordemos',
      },
      {
        Subtitulo: '¿Qué plan diseñarías?',
        url: 'https://www.youtube.com/watch?v=-UPzQwTQhAU',
        enunciado: '4. En el problema se plantea una función que expresa: ',
        respuestas: [
          'a. La ganancia en función del ingreso total',
          'b. El número de unidades vendidas en función del ingreso total',
          'c. El ingreso total en función del número de unidades vendidas',
          'd. El costo total en función del número de unidades compradas',
        ],
        respuestaCorrecta: 2,
        tip: 'Es importante identificar conceptos previos necesarios para resolver la situación Ten presente estudiar la temática de introducción a las funciones ',
      },
      {
        enunciado: '5. Para realizar el problema se debe',
        url: 'https://drive.google.com/file/d/1Jtv0g2NSgsnac35AMC8bxREeRDBLh5qh/view?usp=sharing',
        respuestas: [
          'a. Primero encontrar los puntos críticos, después determinar si en ese punto crítico hay un máximo absoluto y después interpretar la solución',
          'b. Primero encontrar los puntos críticos, después determinar si en ese punto crítico hay un mínimo absoluto y después interpretar la solución.',
          'c. Primero, identificar la información dada y el objetivo del problema, después identificar como se relaciona esta información, posteriormente hallar los puntos críticos, determinar si en ese punto crítico hay un máximo absoluto y después interpretar la solución.',
          'd. Primero, identificar la información dada y el objetivo del problema, después identificar como se relaciona esta información, posteriormente hallar los puntos críticos, determinar si en ese punto crítico hay un mínimo absoluto y después interpretar la solución',
        ],
        respuestaCorrecta: 2,
        tip: 'Es importante identificar conceptos previos necesarios para resolver la situación. Ten presente estudiar la temática de máximos y mínimos.',
      },
      {
        Subtitulo: '¿Cómo llevarías a cabo el plan?',
        url: 'https://view.genial.ly/5d6d7ca539c592100c2d71fd',
        enunciado: '6. Al derivar la expresión que me determina el ingreso total se obtiene:',
        respuestas: ['a. -2(x-2000)', 'b. 1-2(x-2000)', 'c. 2x-2000', 'd. -2(x-2000)2'],
        respuestaCorrecta: 0,
        tip: 'Ten presente estudiar reglas de derivación',
      },
      {
        enunciado: '7. El punto crítico donde el ingreso es un extremo absoluto es: ',
        url: 'https://a7h7o2dls3piqoqkxnv0mw.on.drv.tw/Recursos_APP_Francisco/OVA_EL_APP5/OVA_Ecuaciones_Lineales_V2/',
        respuestas: ['a. 400000', 'b. 4000', 'c. 2000', 'd. 1000'],
        respuestaCorrecta: 2,
        tip: 'Es importante  realizar correctamente los procedimientos. Ten presente estudiar las ecuaciones lineales ',
      },
      {
        enunciado:
          '8. Si 2000 es el número de unidades vendidas del material que determinan el ingreso total mayor, entonces usando el criterio de la primera derivada se debe cumplir que: ',
        url: 'https://drive.google.com/file/d/1Jtv0g2NSgsnac35AMC8bxREeRDBLh5qh/view?usp=sharing',
        respuestas: [
          'a. La derivada es positiva antes del punto 2000 y negativa después del 2000, por lo tanto, en 2000 hay un punto máximo',
          'b. La derivada es negativa antes del punto 2000 y positiva después del 2000, por lo tanto, en 2000 hay un punto máximo',
          'c. La derivada es negativa antes del punto 2000 y negativa después del 2000, por lo tanto, en 2000 hay un punto máximo',
          'd. La derivada es positiva antes del punto 2000 y positiva después del 2000, por lo tanto, en 2000 hay un punto máximo',
        ],
        respuestaCorrecta: 0,
        tip: 'Recuerde realizar correctamente los procedimientos. Se sugiere estudiar la temática de máximos y mínimos recordemos.',
      },
      {
        Subtitulo: '¿Qué resultados obtienes? ',
        url: 'https://drive.google.com/file/d/1Jtv0g2NSgsnac35AMC8bxREeRDBLh5qh/view?usp=sharing',
        enunciado: '9. El mayor ingreso (en dólares) de la empresa es',
        respuestas: ['a. 400000', 'b. 4000', 'c. 2000', 'd. 440000'],
        respuestaCorrecta: 0,
        tip: 'Es importante comprobar el resultado obtenido. Ten presente estudiar la temática de máximos y mínimos ',
      },
      {
        enunciado:
          '10. Dado que el ingreso total es una función cuadrática, otra forma de comprobar que en el valor 2000 hay un máximo es',
        url: 'https://h5p.org/h5p/embed/244800',
        respuestas: [
          'a. Obteniendo el valor de x del vértice de la parábola de la siguiente manera -4000/2',
          'b. Derivando la expresión 2(x-2000), evaluando el punto crítico 2000 en la derivada encontrada y chequeando que el valor dado sea negativo.',
          'c. Derivando la expresión -2(x-2000), evaluando el punto crítico 2000 en la derivada encontrada y chequeando que el valor dado sea positivo.',
          'd. Obteniendo el valor de x del vértice de la parábola de la siguiente manera   -40002(-1)',
        ],
        respuestaCorrecta: 3,
        tip: 'Es importante analizar otras formas de obtener y mostrar la solución. Ten presente estudiar la función cuadrática',
      },
    ],
  },
];

const RadioButton = ({ label, isSelected, onPress }) => (
  <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
    <View style={[styles.radioButton, isSelected ? styles.radioButtonSelected : null]} />
    <Text style={styles.radioButtonLabel}>{label}</Text>
  </TouchableOpacity>
);

const getSubtitulo = (questionIndex: any) => {
  if (questionIndex >= 0 && questionIndex <= 2) {
    return '¿Qué comprendes de la situación?';
  } else if (questionIndex >= 3 && questionIndex <= 4) {
    return '¿Qué plan diseñarías?';
  } else if (questionIndex >= 5 && questionIndex <= 7) {
    return '¿Cómo llevarías a cabo el plan?';
  } else if (questionIndex >= 8 && questionIndex <= 9) {
    return '¿Qué resultados obtienes?';
  }
  return '';
};

type FeedbackState = 'correct' | 'incorrect' | null;
``;
type DetailsSreenRouteProp = RouteProp<RootStackParamList, 'Situacion1Optimizacion'>;
type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'FeedbackScreen'>;

const Situacion1Optimizacion = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}) as any;
  const [isEnunciadoVisible, setIsEnunciadoVisible] = useState(true);
  const [showFeedback, setShowFeedback] = useState<FeedbackState>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState({
    visible: false,
    type: null, // 'correct' o 'incorrect'
  });
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  const router = useRoute<DetailsSreenRouteProp>();
  const [situacionCompletada, setSituacionCompletada] = useState(false);

  // Verifica si la situación ya ha sido completada
  useEffect(() => {
    const verificarCompletada = async () => {
      const completada = await AsyncStorage.getItem('situacion3_completada');
      if (completada === 'true') {
        setSituacionCompletada(true);
      }
    };

    verificarCompletada();
  }, []);

  const situacion = situacion1Opt[0]; // Asumiendo que solo trabajas con la situación 1

  const handleAnswer = (respuestaIndex) => {
    const question = situacion.preguntas[currentQuestionIndex];

    setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: respuestaIndex });

    let resourceUrl;

    if (question.url.startsWith('http')) {
      resourceUrl = question.url;
    } else if (recursos[question.url]) {
      resourceUrl = recursos[question.url][0].url; // Asume que quieres el primer recurso de la temática
    }

    if (respuestaIndex === question.respuestaCorrecta) {
      setFeedbackModal({
        visible: true,
        type: 'correct',
      });
    } else {
      setFeedbackModal({
        visible: true,
        type: 'incorrect',
        tip: question.tip, // Pasa el tip aquí
        url: resourceUrl, // Pasar URL aquí
      });
    }
  };

  const closeFeedbackModal = () => {
    setFeedbackModal({ visible: false, type: null });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < situacion.preguntas.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowFeedback(null); // Resetear el estado de feedback
    } else {
      // Si es la última pregunta, envía las respuestas
      enviarRespuestas();
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowFeedback(null); // Resetear el estado de feedback
    }
  };

  const renderRespuestas = (respuestas: any, pregunta) => {
    return respuestas.map((respuesta: any, index: any) => (
      <RadioButton
        key={index}
        label={respuesta}
        isSelected={selectedAnswers[currentQuestionIndex] === index}
        onPress={() => handleAnswer(index)}
      />
    ));
  };

  const startCuestionario = () => {
    // Guarda la hora de inicio
    setStartTime(new Date());
  };

  useEffect(() => {
    startCuestionario();
  }, []);

  const marcarComoCompletada = async () => {
    try {
      await AsyncStorage.setItem('situacion3_completada', 'true');
      console.log('Situación 3 marcada como completada');
    } catch (error) {
      console.error('Error al marcar la situación como completada', error);
    }
  };

  const enviarRespuestas = async () => {
    setIsLoading(true);
    if (!startTime) {
      console.error('El tiempo de inicio no está establecido.');
      setIsLoading(false);
      return;
    }

    const end = new Date();
    const tiempoTranscurridoMs = end.getTime() - startTime.getTime();
    if (tiempoTranscurridoMs < 0) {
      console.error('El tiempo de inicio es posterior al tiempo de finalización.');
      setIsLoading(false);
      return;
    }

    const tiempoTranscurridoMinutos = tiempoTranscurridoMs / 60000;

    try {
      const idEstudiante = await AsyncStorage.getItem('userId');
      const idCuestionario = situacion.tituloSituacion; // Asumiendo que 'situacion' es tu objeto de preguntas actual

      if (!idEstudiante || !idCuestionario) {
        console.error('Falta ID del estudiante o ID del cuestionario');
        setIsLoading(false);
        return;
      }

      const respuestasEstudiante = situacion.preguntas.map((pregunta, indice) => ({
        preguntaId: indice,
        respuestaSeleccionada: selectedAnswers[indice],
        esRespuestaCorrecta: selectedAnswers[indice] === pregunta.respuestaCorrecta,
      }));

      const response = await axios.post(
        'https://lasalleapp-dev-sjta.1.us-1.fl0.io/save-answer/guardar-respuesta',
        {
          idEstudiante,
          idCuestionario,
          respuestasEstudiante,
          tiempoTranscurrido: tiempoTranscurridoMinutos,
        }
      );
      console.log('🚀 ~ response:', response);

      if (response.status === 201) {
        await marcarComoCompletada();
        await mostrarFeedbackAnterior();
      }

      // if (response.status === 201) {
      //   // Tras enviar las respuestas, procedemos a analizarlas
      //   const analizarRespuestasUrl = 'https://lasalleapp-dev-sjta.1.us-1.fl0.io/analizar/analizar-respuestas';
      //   const responseAnalizar = await axios.post(analizarRespuestasUrl, {
      //     idEstudiante,
      //     idCuestionario,
      //     tiempoTranscurridoMinutos
      //   });

      //   if (responseAnalizar.data.feedback) {

      //     // Si recibimos feedback del análisis, lo mostramos
      //     await marcarComoCompletada();
      //     await AsyncStorage.setItem('feedback_situacion_1', JSON.stringify(responseAnalizar.data.feedback));
      //     await AsyncStorage.setItem('situacion_1_completada', 'true');
      //      navigation.navigate('FeedbackScreen', {
      //       feedbackData: responseAnalizar.data.feedback,
      //       situacionCompletada: true
      //      });
      //   }
      // }
    } catch (error) {
      console.error('Error al enviar respuestas:', error);
      if (axios.isAxiosError(error) && error.response) {
        // Manejo específico para errores de Axios con respuesta
        console.error('Detalles del error:', error.response.data);
      }
    } finally {
      setIsLoading(false); // Asegúrate de quitar el estado de carga independientemente del resultado
    }
  };

  // Maneja la visualización del feedback anterior
  const mostrarFeedbackAnterior = async () => {
    // Si la situación ya ha sido completada, mostramos el feedback
    const idEstudiante = await AsyncStorage.getItem('userId');
    const idCuestionarioNormalizado = situacion.tituloSituacion;
    // Solo procedemos si tenemos los IDs necesarios
    if (idEstudiante && idCuestionarioNormalizado) {
      navigation.navigate('FeedbackScreen', {
        idEstudiante,
        idCuestionarioNormalizado,
        situacionCompletada: true,
      });
    } else {
      // Manejar el caso donde no se puedan obtener los IDs
      console.error('No se pudo obtener el idEstudiante o el idCuestionarioNormalizado');
    }
  };

  return (
    <View style={styles.container}>
      {situacionCompletada && (
        <Button title="Ver Feedback Anterior" onPress={mostrarFeedbackAnterior} />
      )}
      {isLoading ? (
        // Mostrar el loader cuando isLoading sea true
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Modal
            animationType="slide"
            transparent
            visible={feedbackModal.visible}
            onRequestClose={closeFeedbackModal}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                {feedbackModal.type === 'correct' && <AnswerCorrectly />}
                {feedbackModal.type === 'incorrect' && (
                  <AnswerWrong tip={feedbackModal.tip} url={feedbackModal.url} />
                )}
                <TouchableOpacity style={styles.closeButton} onPress={closeFeedbackModal}>
                  <Text>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TouchableOpacity onPress={() => setIsEnunciadoVisible(!isEnunciadoVisible)}>
            <Text style={styles.tituloSituacion}>{situacion.tituloSituacion}</Text>
          </TouchableOpacity>

          {isEnunciadoVisible && (
            <View>
              <Text style={styles.enunciado}>{situacion.enunciado}</Text>
              <Text style={styles.postEnunciado}>{situacion.postEnunciado}</Text>
            </View>
          )}

          <ScrollView style={styles.scrollView}>
            <View style={styles.preguntaContainer}>
              <Text style={styles.subtitulo}>{getSubtitulo(currentQuestionIndex)}</Text>
              <Text style={styles.preguntaEnunciado}>
                {situacion.preguntas[currentQuestionIndex].enunciado}
              </Text>
              {renderRespuestas(
                situacion.preguntas[currentQuestionIndex].respuestas,
                situacion.preguntas[currentQuestionIndex]
              )}
              {/* Verifica si la pregunta actual es la cuarta pregunta (índice 3 ya que los índices comienzan en 0) */}
            </View>

            <View style={styles.navigationContainer}>
              <TouchableOpacity onPress={previousQuestion} style={styles.navButton}>
                <Text>Anterior</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={nextQuestion} style={styles.navButton}>
                <Text>Siguiente</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    width: '100%',
  },
  situacion: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  tituloSituacion: {
    color: '#facc15',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  enunciado: {
    color: 'black',
    fontSize: 16,
    padding: 16,
  },
  postEnunciado: {
    color: '#facc15',
    fontSize: 16,
    fontWeight: 'bold',
    padding: 16,
    paddingTop: 0,
  },
  preguntaContainer: {
    padding: 16,
    paddingTop: 0,
  },
  preguntaEnunciado: {
    color: '#facc15',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  respuesta: {
    fontSize: 16,
    paddingLeft: 20,
    marginBottom: 2,
  },
  selectedAnswer: {
    backgroundColor: '#e2e8f0',
  },
  scrollView: {
    maxHeight: 500, // Ajusta esto según el tamaño que desees
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    // ... otros estilos que necesites
  },
  navButton: {
    padding: 10,
    backgroundColor: '#ddd', // Cambia esto por el color que prefieras
    // ... otros estilos para tus botones
  },
  respuestaText: {
    fontSize: 16,
  },
  imagen: {
    width: '100%', // Puedes ajustar esto como necesites
    height: 200, // Altura fija para la imagen, también es ajustable
    resizeMode: 'contain', // Esto es para asegurarse de que la imagen se ajuste sin perder la proporción
    marginTop: 20, // Añade un poco de espacio arriba de la imagen
  },
  radioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  radioButton: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'black',
    marginRight: 10,
  },
  radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  radioButtonLabel: {
    color: 'black', // Texto en blanco
    fontSize: 16,
    flex: 1,
    flexShrink: 1,
    marginLeft: 10,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#facc15',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15,
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    // Añade estilos adicionales si es necesario
  },
  imageOptionContainer: {
    alignItems: 'center',
    margin: 10,
    // Añade estilos adicionales si es necesario
  },
  imageOptionText: {
    marginBottom: 5,
    fontWeight: 'bold',
    // Añade estilos adicionales si es necesario
  },
});
export default Situacion1Optimizacion;
