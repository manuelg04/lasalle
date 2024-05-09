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
import ImageView from 'react-native-image-viewing';
import ImageViewer from 'react-native-image-zoom-viewer';
import * as Progress from 'react-native-progress';

import { RootStackParamList } from '../navigation';
import { recursos } from '../screens/Recordemos';
import AnswerCorrectly from '../utils/AnswerCorrectly';
import AnswerWrong from '../utils/AnswerWrong';
import EquationRenderer from '../utils/MathSvg';
import { Ionicons } from '@expo/vector-icons';
/* eslint-disable prettier/prettier */
const situacion2: any = [
  {
    tituloSituacion: 'Situación 2. Caminando a la U',
    enunciado: 'La posición (en metros) de un estudiante que se dirige a la universidad caminando está determinado por la función x(t) = t² - 8t + 18, donde t se mide en segundos. El estudiante desea encontrar algunas velocidades promedias en cierto intervalo de tiempo y la velocidad en un instante específico.',
    postEnunciado: 'Con respecto a la situación planteada anteriormente responda:',
    Subtitulo: '¿Qué comprendes de la situación?',
    postSubtitulo: 'El objetivo de la situacion planteada es',
    preguntas: [
      {
        enunciado: '1. El objetivo de la situación planteada es:',
        url: 'https://a7h7o2dls3piqoqkxnv0mw.on.drv.tw/Recursos_APP_Francisco/OVA_PASOS_RP5/Pasos_para_RP/',
        respuestas: [
          'Hallar la tasa de cambio instantánea y promedio de la posición con respecto a la velocidad. ',
          'Hallar la tasa de cambio instantánea y promedio de la posición con respecto al tiempo',
          'Hallar la tasa de cambio instantánea y promedio del tiempo con respecto a la posición ',
          'Hallar la tasa de cambio instantánea y promedio de la velocidad con respecto al tiempo',
        ],
        respuestaCorrecta: 1,
        tip: 'Es importante identificar el objetivo de la situación - Ten presente revisar la comprensión de una situación en Pasos para resolver un problema ',
      },
      {
        enunciado:
          '2. Con base a la función planteada se puede inferir que la posición del estudiante a los 4 segundos es',
        url: 'https://a7h7o2dls3piqoqkxnv0mw.on.drv.tw/Recursos_APP_Francisco/OVA_PASOS_RP5/Pasos_para_RP/',
        respuestas: ['2 metros', '3 metros', '4 metros', '3.5 metros'],
        respuestaCorrecta: 0,
        tip: 'Es importante identificar los datos o valores que da la situación planteada. - Ten presente revisar la comprensión de una situación en Pasos para resolver un problema ',
      },
      {
        Subtitulo: '¿Qué plan diseñarías?',
        enunciado: '3. Una gráfica de la función posición es',
        url: 'Funciones',
        imagen:
          'https://drive.google.com/file/d/1oeAQtMZLZW3AcHf6iNjEBJKo_jm8ASF-/view?usp=sharing',
        respuestas: ['a', 'b', 'c'],
        respuestaCorrecta: 0,
        tip: 'Es importante identificar los datos o valores que da la situación - Ten presente estudiar la función cuadrática en recordemos',
      },
      {
        enunciado: '4. Con base a la posición del estudiante, es correcto afirmar que: ',
        url: 'Funciones',
        respuestas: [
          'La posición inicial del estudiante es de 16 metros',
          'La posición del estudiante disminuye entre los 3 y 4 segundos.',
          'La posición del estudiante aumenta entre los 3 y 4 segundos',
          'La posición del estudiante es constante entre los 3 y 4 segundos.',
        ],
        respuestaCorrecta: 2,
        tip: 'Es importante relacionar la incógnita con los datos dados - Ten presente estudiar la evaluación de funciones en recordemos',
      },
      {
        enunciado:
          '5. Para hallar la velocidad promedio de la partícula en un tiempo t1 y t2 específico se debe:',
        url: 'https://view.genial.ly/5d8387fa7d6fa60fcf658f94/interactive-content-derivada-de-una-funcion',
        respuestas: ['Usar el cociente xt2-xt1t2-t1 entre las diferencias de las posiciones sobre las diferencias de los tiempos', 
        'Usar el cociente t2-t1xt2-xt1 entre las diferencias de las posiciones sobre las diferencias de los tiempos'
      ],
        respuestaCorrecta: 0,
        tip: 'Es importante identificar los conceptos previos necesarios para resolver la situación - Ten presente estudiar la definición de derivada en recordemos',
      },
      {
        enunciado:
          '6. Una forma de encontrar la velocidad del estudiante en un instante de tiempo t es resolviendo el siguiente límite:',
        url: 'https://view.genial.ly/5d8387fa7d6fa60fcf658f94/interactive-content-derivada-de-una-funcion',
        respuestas: [
          'xt2-xt1t2-t1',
          'xt2-xt1t2-t1',
          't2-t1xt2-xt1',
          'vt2-vt1t2-t1 donde v es la velocidad de la partícula',
        ],
        respuestaCorrecta: 1,
        tip: 'Es importante identificar los conceptos previos necesarios para resolver la situación - Ten presente estudiar la derivada como razón de cambio ',
      },
      {
        enunciado:
          '7. Una forma de encontrar la velocidad instantánea de la posición del estudiante a los 4 segundos es',
        url: 'https://view.genial.ly/5d8387fa7d6fa60fcf658f94/interactive-content-derivada-de-una-funcion',
        respuestas: [
          'Derivar la función aceleración y evaluarla en t=4',
          'Derivar la función velocidad y evaluarla en t=4',
          'Derivar la función posición y evaluarla en t=4',
          'Derivar la función tiempo y evaluarla en t=4',
        ],
        respuestaCorrecta: 2,
        tip: 'Recuerde realizar correctamente los procedimientos. Se sugiere estudiar la temática razón de cambio promedio en recordemos',
      },
      {
        Subtitulo: '¿Cómo llevarías a cabo el plan?',
        enunciado:
          '8. El procedimiento correcto para encontrar la razón de cambio promedio entre los 4 y 4.5 segundos es:',
        url: 'Derivadas',
        respuestas: [
          'x4-x4.54.5-4=2-2.250.5',
          'x4.5-x44.5-4=2.25-20.5',
          'x4.5-x44.5-4=2-0.250.5',
          'x4-x4.54.5=2-2.254.5',
        ],
        respuestaCorrecta: 1,
        tip: 'Recuerde realizar correctamente los procedimientos. Se sugiere estudiar la temática razón de cambio promedio en recordemos',
      },
      {
        enunciado: '9. La velocidad promedio del estudiante entre los 4 y 4.5 segundos es:',
        url: 'Derivadas',
        respuestas: ['-0.5 ms', '0 ms', '1 ms', '0.5 ms'],
        respuestaCorrecta: 3,
        tip: 'Es importante realizar correctamente los procedimientos',
      },
      {
        enunciado:
          '10. Un proceso correcto para encontrar la razón de cambio en un instante de tiempo t es: ',
        url: 'https://view.genial.ly/5d6d7ca539c592100c2d71fd',
        respuestas: ["vt=x(t)=2t-8", "vt=x(t)=2t-8t", "vt=x(t)=2t2-8t", "vt=x(t)=2t-18"],
        respuestaCorrecta: 2,
        tip: 'Recuerde realizar correctamente los procedimientos Se sugiere estudiar la temática reglas de derivación en recordemos',
      },
      {
        enunciado: '11. La velocidad del estudiante a los 4 segundos es:',
        url: 'Derivadas',
        respuestas: ['-1 ms', '0 ms', '1 ms', '0.5 ms'],
        respuestaCorrecta: 1,
        tip: 'Recuerde verificar o comprobar el resultado obtenido Se sugiere estudiar la temática razón de cambio en recordemos ',
      },
      {
        Subtitulo: '¿Qué resultados obtienes?',
        enunciado: '12. Con respecto al movimiento del estudiante, es correcto afirmar que:',
        url: 'Derivadas',
        respuestas: [
          'El estudiante está en reposo a los cero segundos',
          'El cambio de la posición con respecto al tiempo disminuye a los 5 segundos',
          'El estudiante está en reposo a los 4 segundos',
          'El cambio de la posición con respecto al tiempo aumenta a los 3 segundos.',
        ],
        respuestaCorrecta: 2,
        tip: 'Recuerde analizar otras formas de obtener y mostrar la solución Se sugiere estudiar la temática razón de cambio en recordemos',
      },
    ],
  },
];

const RadioButton = ({ label, isSelected, onPress, disabled }) => {
  
  // Verifica si label es un string o un componente
  const content = typeof label === 'string' ? (
  <Text style={styles.radioButtonLabel}>{label}</Text>
  ) : (
  label // Si label es un componente (MathText), lo renderiza directamente
  );

  const handlePress = () => {
  console.log('Radio button touched'); // Add console.log to see when the radio button is touched
  onPress();
  };

  return (
  <TouchableOpacity
    style={styles.radioButtonContainer}
    onPress={handlePress}
    disabled={disabled}
  >
    <View style={[
    styles.radioButton,
    isSelected ? styles.radioButtonSelected : null
    ]} />
    {content}
  </TouchableOpacity>
  );
};


const getSubtitulo = (questionIndex: any) => {
  if (questionIndex >= 0 && questionIndex <= 3) {
    return '¿Qué comprendes de la situación?';
  } else if (questionIndex >= 4 && questionIndex <= 6) {
    return '¿Qué plan diseñarías?';
  } else if (questionIndex >= 7 && questionIndex <= 8) {
    return '¿Cómo llevarías a cabo el plan?';
  } else if (questionIndex >= 9 && questionIndex <= 11) {
    return '¿Qué resultados obtienes?';
  }
  return '';
};

type FeedbackState = 'correct' | 'incorrect' | null;

type DetailsSreenRouteProp = RouteProp<RootStackParamList, 'Situacion2RazonDeCambio'>;
type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'FeedbackScreen'>;

const Situacion2RazonDeCambio = () => {
  const [visible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);
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
  const [isViewerVisible, setIsViewerVisible] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Verifica si la situación ya ha sido completada
  useEffect(() => {
    const verificarCompletada = async () => {
      const completada = await AsyncStorage.getItem('situacion2_completada');
      if (completada === 'true') {
        setSituacionCompletada(true);
      }
    };

    verificarCompletada();
  }, []);

  const situacion = situacion2[0]; // Asumiendo que solo trabajas con la situación 1

  const handleAnswer = (respuestaIndex) => {
    const question = situacion.preguntas[currentQuestionIndex];
    if (selectedAnswers[currentQuestionIndex] === undefined){
      setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: respuestaIndex });
    }
  
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

  // Luego, modificarías el renderizado de las respuestas:
  const renderRespuestas = (respuestas, pregunta) => {
    const isAnswerSelected = selectedAnswers[currentQuestionIndex] !== undefined;
  
    // Función para determinar si la respuesta contiene una fórmula matemática y devolver el componente MathText correspondiente
    const renderMathOrText = (respuesta) => {
      if (respuesta === 'Usar el cociente xt2-xt1t2-t1 entre las diferencias de las posiciones sobre las diferencias de los tiempos') {
        return(
          <View style={styles.container}>
          <EquationRenderer equation="Usar el cociente xt₂ - xt₁t₂ - t₁ entre las diferencias de las posiciones sobre las diferencias de los tiempos" />
        </View>
        
        );
      }

      else if (respuesta === 'Usar el cociente t2-t1xt2-xt1 entre las diferencias de las posiciones sobre las diferencias de los tiempos') {
        return (
          <View style={styles.container}>
          <EquationRenderer equation="Usar el cociente t₂- t₁xt₂- xt₁ entre las diferencias de las posiciones sobre las diferencias de los tiempos" />
        </View>
        )
      }
      
    else if (respuesta === 'vt2-vt1t2-t1 donde v es la velocidad de la partícula') {
        return (
          <View style={styles.container}>
          <EquationRenderer equation="vt₂-vt₁ / t₂-t₁" />
        </View>
        );
      } else if (respuesta === 'xt2-xt1t2-t1') {
        return (
          <View style={styles.container}>
          <EquationRenderer equation="xt₂- xt₁t₂ -t₁" />
        </View>
        );
      }
      else if (respuesta === 't2-t1xt2-xt1') {
        return (
          <View style={styles.container}>
          <EquationRenderer equation="t₂-t₁xt₂-xt₁" />
        </View>
        );
      }
       else if (respuesta === 'x4-x4.54.5-4=2-2.250.5') {
        return (
          <View style={styles.container}>
             <Image source={require('../../assets/situacion2punto8b.png')} style={styles.image} />
          </View>

        )
      } else if (respuesta === 'x4.5-x44.5-4=2.25-20.5') {
        return (
          <View style={styles.container}>
             <Image source={require('../../assets/situacion2punto8c.png')} style={styles.image} />
          </View>
        );
      } else if (respuesta === 'x4.5-x44.5-4=2-0.250.5') {
        return (
          <View style={styles.container}>
          <Image source={require('../../assets/testing.png')} style={styles.image} />
       </View>

        )
      } else if (respuesta === 'x4-x4.54.5=2-2.254.5') {
        return (
          <View style={styles.container}>
          <Image source={require('../../assets/situacion2punto8d.png')} style={styles.image} />
        </View>
        )
      } else if (respuesta === 'vt=x(t)=2t-8') {
        return <Text> v(t) = x'(t) = 2t - 8 </Text>
      } else if (respuesta === 'vt=x(t)=2t-8t') {
        return <Text> v(t) = x'(t) = 2t - 8t </Text>
      } else if (respuesta === 'vt=x(t)=2t2-8t') {
        return <Text> v(t) = x'(t) = 2t² - 8t </Text>
      } else if (respuesta === 'vt=x(t)=2t-18') {
        return <Text> v(t) = x'(t) = 2t - 18 </Text>
      } else {
        return respuesta;
      }
    };
  
    return respuestas.map((respuesta, index) => (
      <RadioButton
        key={index}
        label={renderMathOrText(respuesta)} // Pasamos el componente MathText o el string directamente
        isSelected={selectedAnswers[currentQuestionIndex] === index}
        onPress={() => handleAnswer(index)}
        disabled={isAnswerSelected}
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
      await AsyncStorage.setItem('situacion2_completada', 'true');
      console.log('Situación 2 marcada como completada');
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
        'https://lasalleapp.onrender.com/save-answer/guardar-respuesta',
        {
          idEstudiante,
          idCuestionario,
          respuestasEstudiante,
          tiempoTranscurrido: tiempoTranscurridoMinutos,
        }
      );

      if (response.status === 201) {
        await marcarComoCompletada();
        await mostrarFeedbackAnterior();
      }
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
    const idEstudiante = await AsyncStorage.getItem('userId');
    const idCuestionarioNormalizado = situacion.tituloSituacion;
    if (idEstudiante && idCuestionarioNormalizado) {
      navigation.navigate('FeedbackScreen', {
        idEstudiante,
        idCuestionarioNormalizado,
        situacionCompletada: true,
      });
    } else {
      console.error('No se pudo obtener el idEstudiante o el idCuestionarioNormalizado');
    }
  };

  const opcionesDeRespuesta = [
    { opcion: 'a', uri: require('../../assets/Aopcion.png') },
    { opcion: 'b', uri: require('../../assets/Bopcion.png') },
    { opcion: 'c', uri: require('../../assets/Copcion.png') },
    // Agrega más si es necesario
  ];

  // Convertir las imágenes para ser compatibles con ImageViewer
  const imagesForViewer = opcionesDeRespuesta.map((item) => ({
    url: '',
    props: { source: item.uri },
  }));

  const handleImagePress = (index) => {
    setCurrentImageIndex(index);
    setIsViewerVisible(true);
  };
  

  const renderImagenes = () => {
    return (
      <View style={styles.imagesContainer}>
        {opcionesDeRespuesta.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleImagePress(index)}
            style={styles.imageOptionContainer}>
            <Text style={styles.imageOptionText}>Opción {item.opcion.toUpperCase()}</Text>
            <Image source={item.uri} style={styles.imagen} />
          </TouchableOpacity>
        ))}

        <Modal visible={isViewerVisible} transparent onRequestClose={() => setIsViewerVisible(false)}>
          <ImageViewer
            imageUrls={imagesForViewer}
            index={currentImageIndex}
            onSwipeDown={() => setIsViewerVisible(false)}
            enableSwipeDown
            enableImageZoom
            onCancel={() => setIsViewerVisible(false)}
          />
        </Modal>
      </View>
    );
  };

  const totalQuestions = 12; // El número total de preguntas
  const progress = (currentQuestionIndex + 1) / totalQuestions;
  

  return (
    <View style={styles.container}>
      {situacionCompletada && (
        <Button title="Ver Feedback Anterior" onPress={mostrarFeedbackAnterior} />
      )}
      {isLoading ? (
        // Mostrar el loader cuando isLoading sea true
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        // El contenido de tu pantalla cuando isLoading sea false
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
                  <Text onPress={closeFeedbackModal}>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <View style={styles.progressContainer}>
            <Progress.Bar progress={progress} width={null} />
          </View>
          <TouchableOpacity
            onPress={() => setIsEnunciadoVisible(!isEnunciadoVisible)}
            style={styles.tituloSituacionContainer}>
            <Text style={styles.tituloSituacion}>{situacion.tituloSituacion}</Text>
            <Ionicons
              name={isEnunciadoVisible ? 'chevron-up' : 'chevron-down'}
              size={20}
              color="#000"
              style={{ margin: 'auto', paddingRight: 12 }}
            />
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
              {/* Verifica si la pregunta actual es la tercera (índice 2 ya que los índices comienzan en 0) */}
              {currentQuestionIndex === 2 && renderImagenes()}
            </View>

            <ImageView
              images={opcionesDeRespuesta}
              imageIndex={0}
              visible={visible}
              onRequestClose={() => setIsVisible(false)}
            />

            <View style={styles.navigationContainer}>
              <TouchableOpacity style={styles.navButton} onPress={previousQuestion}>
                <Text>Anterior</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton} onPress={nextQuestion}>
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
    height: 'auto',
    width: 'auto'
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
    height: 200, // Altura fija para la imagen, también es ajustable // Esto es para asegurarse de que la imagen se ajuste sin perder la proporción
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
    marginRight: 5,
    
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
  imageStyle: {
    width: 200,        // Ancho de la imagen
    height: 100,       // Altura de la imagen
    resizeMode: 'contain', // O 'cover' para llenar el espacio sin perder la proporción
    marginVertical: 10,    // Espacio vertical arriba y abajo de la imagen
    borderRadius: 10,      // Bordes redondeados
    borderWidth: 1,        // Ancho del borde
    borderColor: '#ddd',   // Color del borde, un gris claro en este caso
    // Añade estilos adicionales si es necesario
  },
  progressContainer: {
    marginTop: 10,
    padding: 10,
    alignItems: 'stretch',
  },
  image: {
    marginHorizontal: 5,
  },
  imageContainer: {
    flexDirection: 'row',

  },
  text: {
    fontSize: 12,
    flexShrink: 1,
  },
  containerAnswers: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tituloSituacionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // Añade cualquier otro estilo como padding si es necesario
  },

});

export default Situacion2RazonDeCambio;
