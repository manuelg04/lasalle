/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image, Modal, ActivityIndicator, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { RootStackParamList } from '../navigation';
import {recursos} from "../screens/Recordemos"
import AnswerCorrectly from '../utils/AnswerCorrectly';
import AnswerWrong from '../utils/AnswerWrong';

const situacion2Opt = [
  {
    tituloSituacion: 'Situación 4. Aprovechando los matariales',
    enunciado:
      'Una empresa de ingeniería necesita enviar insumos para la terminación de una obra. Decide empacarlos en una caja de almacenaje con base cuadrada y sin tapa para garantizar la ventilación y temperatura adecuada. Para que los insumos no se maltraten se decide que la caja debe tener un volumen de 2048 pulgadas cúbicas. La empresa quiere determinar las dimensiones de cada caja que le proporcionen la menor cantidad de material utilizado Con respecto a la situación planteada anteriormente responda: ',
    Subtitulo: '¿Qué comprendes de la situación?',
    postSubtitulo: 'El objetivo de la situacion es:',
    preguntas: [
      {
        enunciado: '1. El objetivo de la situación es:',
        url: 'https://a7h7o2dls3piqoqkxnv0mw.on.drv.tw/Recursos_APP_Francisco/OVA_PASOS_RP5/Pasos_para_RP/',
        respuestas: ['a. Minimizar una funcion', 'b. Maximizar una funcion'],
        respuestaCorrecta: 1,
        tip: 'Es importante identificar el objetivo de la situación. Ten presente revisar la comprensión de una situación en Pasos para resolver un problema  ',
      },
      {
        enunciado: '2. ¿En este problema se debe?',
        url: 'https://a7h7o2dls3piqoqkxnv0mw.on.drv.tw/Recursos_APP_Francisco/OVA_PASOS_RP5/Pasos_para_RP/',
        respuestas: [
          'a. Maximizar un volumen',
          'b. Maximizar un area superficial',
          'c. Minimizar un costo',
          'd. Maximiar un volumen',
        ],
        respuestaCorrecta: 1,
        tip: 'Es importante identificar la incógnita de la situación. Ten presente revisar la comprensión de una situación en Pasos para resolver un problema',
      },
      {
        enunciado:
          '3. La cantidad o dato que se proporciona en el problema es (información dada): ',
          url: 'https://a7h7o2dls3piqoqkxnv0mw.on.drv.tw/Recursos_APP_Francisco/OVA_PASOS_RP5/Pasos_para_RP/',
        respuestas: [
          'a. volumen',
          'b. Area superficial',
          'c. Altura de la caja',
          'd. Ancho de la base',
        ],
        respuestaCorrecta: 0,
        tip: 'Es importante identificar los datos que da la situación. Ten presente revisar la comprensión de una situación en Pasos para resolver un problema  ',
      },
      {
        enunciado: '4. La cantidad que se desconoce del problema son:',
        url: 'https://a7h7o2dls3piqoqkxnv0mw.on.drv.tw/Recursos_APP_Francisco/OVA_PASOS_RP5/Pasos_para_RP/',
        respuestas: [
          'a. Volumen',
          'b. Area superficial',
          'c. Altura de la caja',
          'd. Ancho de la base',
        ],
        respuestaCorrecta: 1 || 2 || 3,
        tip: 'Es importante identificar las cantidades desconocidas de la situación. Ten presente revisar la comprensión de una situación en Pasos para resolver un problema ',
      },
      {
        enunciado:
          '5. Si L es el largo, A es el ancho y h la altura, entonces un diagrama que ilustre la situación es:',
          url: 'https://drive.google.com/file/d/10Xx_scheSiMvdZzWwVYWywBrNRADtoZ6/view?usp=sharing',
        imagen:
          'https://drive.google.com/file/d/1Q-V9EJF2L9NtkTL1o0yIgGFM3lOW55k2/view?usp=sharing',
        respuestas: ['a', 'b', 'c'],
        respuestaCorrecta: 1,
        tip: 'Es importante ayudarse de un gráfico para comprender la situación. Ten presente  estudiar áreas y volúmenes ',
      },
      {
        Subtitulo: '¿Qué plan diseñarías?',
        enunciado:
          '6. Si A es el largo de la base y h la altura de la caja de almacenaje, entonces una expresión para el volumen es:  ',
          url: "https://youtu.be/xOOMcb5OrWo",
        respuestas: ['a. 2048=A^2+4Ah', 'b. 2048=A^2 (4h)', 'c. 2048=A^2 h^2', 'd. 2048=A^2 h'],
        respuestaCorrecta: 3,
        tip: 'Es importante identificar conceptos previos de apoyo para resolver la situación. Ten presente estudiar operaciones algebraicas',
      },
      {
        enunciado:
          '7. Si A es el largo de la base y h la altura, entonces el área superficial de la caja para el almacenaje es:',
          url: "https://youtu.be/xOOMcb5OrWo" && "https://drive.google.com/file/d/10Xx_scheSiMvdZzWwVYWywBrNRADtoZ6/view?usp=sharing",
        respuestas: ['a. 〖2A〗^2+4Ah ', 'b. A^2+4Ah', 'c. A^2+2Ah', 'd. 6Ah'],
        respuestaCorrecta: 1,
        tip: 'Es importante identificar conceptos previos de apoyo para resolver la situación. Ten presente estudiar áreas, volúmenes y operaciones algebraicas.',
      },
      {
        enunciado: '8. Para resolver el problema se debe plantear una función que expresa:',
        url: "https://www.youtube.com/watch?v=-UPzQwTQhAU",
        respuestas: [
          'a. El volumen en función del largo del área superficial ',
          'b. El área superficial en función del ancho de la base',
          'c. El área superficial en función del volumen ',
          'd. El volumen en función de la altura ',
        ],
        respuestaCorrecta: 1,
        tip: 'Es importante identificar conceptos previos de apoyo para resolver la situación.. Ten presente estudiar la introducción a las funciones',
      },
      {
        enunciado:
          '9. La cantidad de material utilizado en función del ancho de la base A es se puede representar por la expresión:',
          url:"https://h5p.org/h5p/embed/1465798",
        respuestas: ['a. A^2+2048/A', 'b. A^2+8192/A', 'c. A^2-8192/A', 'd. A^2+8192/A^2'],
        respuestaCorrecta: 1,
        tip: 'Es importante identificar conceptos previos de apoyo para resolver la situación. Ten presente estudiar funciones',
      },
      {
        Subtitulo: '¿Cómo llevarías a cabo el plan?',
        enunciado:
          '10, Al derivar la expresión que me determina la cantidad de material utilizado se obtiene:',
          url:"https://view.genial.ly/5d6d7ca539c592100c2d71fd",
        respuestas: ['a. 2A-2048/A', 'b. 2A+8192/A', 'c. 2A-8192/A^2', 'd. 2A+8192/A^2 '],
        respuestaCorrecta: 2,
        tip: 'Es importante realizar correctamente los procedimientos. Ten presente estudiar  reglas de derivación',
      },
      {
        enunciado:
          '11. El punto crítico por analizar para que el ancho de la base A sea un extremo absoluto es: ',
          url:"https://a7h7o2dls3piqoqkxnv0mw.on.drv.tw/Recursos_APP_Francisco/OVA_EL_APP5/OVA_Ecuaciones_Lineales_V2/",
        respuestas: ['a. 64', 'b. 32', 'c. 16', 'd. 8'],
        respuestaCorrecta: 2,
        tip: 'Es importante realizar correctamente los procedimientos. Ten presente estudiar ecuaciones',
      },
      {
        enunciado:
          '12. Al usar el criterio de la primera derivada en la función “cantidad de material utilizado” (área superficial), es correcto afirmar que para el valor del ancho de la base A se cumple: ',
            url:"https://drive.google.com/file/d/1mns5u6TVmj5pV0AQBKjH8OwBC9ZAl4md/view?usp=sharing",
        respuestas: [
          'a. La derivada es positiva antes del punto 16 y negativa después del 16, por lo tanto, en 16 hay un punto mínimo.',
          'b. La derivada es negativa antes del punto 16 y positiva después del 16, por lo tanto, en 16 hay un punto mínimo.',
          'c. La derivada es negativa antes del punto 16 y negativa después del 16, por lo tanto, en 16 hay un punto máximo',
          'd. La derivada es positiva antes del punto 16 y positiva después del 16, por lo tanto, en 16 hay un punto máximo',
        ],
        respuestaCorrecta: 1,
        tip: 'Es importante realizar correctamente los procedimientos. Ten presente estudiar el criterio de la primera derivada',
      },
      {
        Subtitulo: '¿Qué resultados obtienes?',
        enunciado:
          '13. Las dimensiones de la caja que proporcionan la menor cantidad de material utilizado son',
          url:"https://drive.google.com/file/d/1mns5u6TVmj5pV0AQBKjH8OwBC9ZAl4md/view?usp=sharing",
        respuestas: [
          'a. El ancho de la base 8 pulgadas y altura 16 pulgadas',
          'b. El ancho de la base 8 pulgadas y altura 32 pulgadas',
          'c. El ancho de la base 8 pulgadas y altura 8 pulgadas',
          'd. El ancho de la base 16 pulgadas y altura 8 pulgadas',
        ],
        respuestaCorrecta: 3,
        tip: 'Es importante comprobar el resultado obtenido. Ten presente estudiar el criterio de la primera derivada',
      },
      {
        enunciado:
          '14. Si el área de la base es de 256 pulgadas cuadradas, entonces es correcto afirmar que menor cantidad de material utilizado en la fabricación de una caja es de:  ',
          url:"https://drive.google.com/file/d/1mns5u6TVmj5pV0AQBKjH8OwBC9ZAl4md/view?usp=sharing",
        respuestas: [
          'a. 2048 pulgadas cuadradas',
          'b. 768 pulgadas cuadradas',
          'c. 919.2 pulgadas cuadradas aproximadamente',
          'd. 32 pulgadas cuadradas',
        ],
        respuestaCorrecta: 1,
        tip: 'Es importante comprobar el resultado obtenido. Ten presente estudiar el criterio de la primera derivada ',
      },
      {
        enunciado:
          '15. Otra forma de comprobar que en A=16 hay un valor mínimo asociado al ancho de la base de la caja es: ',
          url:"https://drive.google.com/file/d/1sHFC150lWG3ZQ_5Kgiq1e_7H_ay_aYqX/view?usp=sharing",
        respuestas: [
          'a. Derivando la expresión 2A-8192/A^2  , evaluando el punto critico A=16 en la derivada encontrada y chequeando que el valor dado sea positivo. ',
          'b. Derivando la expresión 2A-8192/A^2  , evaluando el punto crítico A=16 en la derivada encontrada y chequeando que el valor dado sea negativo.',
          'c. Derivando la expresión A^2+8192/A , evaluando el punto crítico A=16 en la derivada encontrada y chequeando que el valor dado sea positivo',
          'd. Derivando la expresión A^2+8192/A , evaluando el punto crítico A=16 en la derivada encontrada y chequeando que el valor dado sea negativo.',
        ],
        respuestaCorrecta: 0,
        tip: 'Es importante analizar otras formas de obtener y mostrar la solución. Ten presente estudiar la prueba de la segunda derivada',
      },
    ],
  },
];

const RadioButton = ({ label, isSelected, onPress }) => (
    <TouchableOpacity style={styles.radioButtonContainer} onPress={onPress}>
        <View style={[
            styles.radioButton,
            isSelected ? styles.radioButtonSelected : null
        ]} />
        <Text style={styles.radioButtonLabel}>{label}</Text>
    </TouchableOpacity>
);

const getSubtitulo = (questionIndex: any) => {
    if (questionIndex >= 0 && questionIndex <= 4) {
        return "¿Qué comprendes de la situación?";
    } else if (questionIndex >= 5 && questionIndex <= 8) {
        return "¿Qué plan diseñarías?";
    } else if (questionIndex >= 9 && questionIndex <= 11) {
        return "¿Cómo llevarías a cabo el plan?";
    } else if (questionIndex >= 12 && questionIndex <= 14) {
        return "¿Qué resultados obtienes?";
    }
    return "";
};

type FeedbackState = 'correct' | 'incorrect' | null;
``
type DetailsSreenRouteProp = RouteProp<RootStackParamList, 'Situacion1Optimizacion'>;
type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'FeedbackScreen'>;


const Situacion2Optimizacion = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}) as any;
  const [isEnunciadoVisible, setIsEnunciadoVisible] = useState(true);
  const [showFeedback, setShowFeedback] = useState<FeedbackState>(null);
  const [isLoading, setIsLoading] = useState(false)
  const [feedbackModal, setFeedbackModal] = useState({
    visible: false,
    type: null, // 'correct' o 'incorrect'
});
const [startTime, setStartTime] = useState<Date | null>(null);
const [endTime, setEndTime] = useState<Date | null>(null);
const navigation = useNavigation<OverviewScreenNavigationProps>();
const router = useRoute<DetailsSreenRouteProp>();
const [situacionCompletada, setSituacionCompletada] = useState(true);

  // Verifica si la situación ya ha sido completada
  useEffect(() => {
    const verificarCompletada = async () => {
      const completada = await AsyncStorage.getItem('situacion4_completada');
      if (completada === 'true') {
        setSituacionCompletada(true);
      }
    };

    verificarCompletada();
  }, []);



  const situacion = situacion2Opt[0]; // Asumiendo que solo trabajas con la situación 1

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
            type: 'correct'
        });
    } else {
        setFeedbackModal({
            visible: true,
            type: 'incorrect',
            tip : question.tip, // Pasa el tip aquí
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

  const renderRespuestas = (respuestas:any, pregunta) => {
    return respuestas.map((respuesta:any, index:any) => (
        <RadioButton
            key={index}
            label={respuesta}
            isSelected={selectedAnswers[currentQuestionIndex] === index}
            onPress={() => handleAnswer(index)}
        />
    ));
};

const renderImages = (opciones) => {
  // Asigna la fuente de la imagen basada en la opción
  const imageSource = (opcion) => {
    switch (opcion) {
      case 'a':
        return require('../../assets/aResponse.png');
      case 'b':
        return require('../../assets/bResponse.png');
      case 'c':
        return require('../../assets/cResponse.png');
      case 'd':
        return require('../../assets/dResponse.png');
      default:
        return null;
    }
  };

  return (
    <View style={styles.imagesContainer}>
      {opciones.map((opcion, index) => (
        <Image
          key={index}
          source={imageSource(opcion)}
          style={styles.imagen}
        />
      ))}
    </View>
  );
};


  const renderImagen = (imagen:any) => {
    if (!imagen) return null;
    return <Image source={require('../../assets/situacion1_punto4.png')} style={styles.imagen} />;
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
    await AsyncStorage.setItem('situacion4_completada', 'true');
    console.log('Situación 1 marcada como completada');
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
    console.log("🚀 ~ idCuestionario:", idCuestionario)

    if (!idEstudiante || !idCuestionario) {
      console.error('Falta ID del estudiante o ID del cuestionario');
      setIsLoading(false);
      return;
    }

    const respuestasEstudiante = situacion.preguntas.map((pregunta, indice) => ({
      preguntaId: indice,
      respuestaSeleccionada: selectedAnswers[indice],
      esRespuestaCorrecta: selectedAnswers[indice] === pregunta.respuestaCorrecta
    }));

    const response = await axios.post('https://lasalleapp-dev-sjta.1.us-1.fl0.io/save-answer/guardar-respuesta', {
      idEstudiante,
      idCuestionario,
      respuestasEstudiante,
      tiempoTranscurrido: tiempoTranscurridoMinutos
    });

    if(response.status === 201){
      
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
      situacionCompletada: true
    });
  } else {
    // Manejar el caso donde no se puedan obtener los IDs
    console.error('No se pudo obtener el idEstudiante o el idCuestionarioNormalizado');
  }
  
};

  const renderImagenes = () => {
    const opcionesDeRespuesta = [
      { opcion: 'a', imagen: require('../../assets/5a.png') },
      { opcion: 'b', imagen: require('../../assets/5b.png') },
      { opcion: 'c', imagen: require('../../assets/5c.png') },
    ];
  
    return (
      <View style={styles.imagesContainer}>
        {opcionesDeRespuesta.map((item, index) => (
          <View key={index} style={styles.imageOptionContainer}>
            <Text style={styles.imageOptionText}>Opción {item.opcion.toUpperCase()}</Text>
            <Image source={item.imagen} style={styles.imagen} />
          </View>
        ))}
      </View>
    );
  };
  
  
  

  return (
<View style={styles.container}>
{situacionCompletada && (
        <Button
          title="Ver Feedback Anterior"
          onPress={mostrarFeedbackAnterior}
        />
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
          onRequestClose={closeFeedbackModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {feedbackModal.type === 'correct' && <AnswerCorrectly />}
              {feedbackModal.type === 'incorrect' && (
                <AnswerWrong tip={feedbackModal.tip} url={feedbackModal.url} />
              )}
              <TouchableOpacity
                style={styles.closeButton}
                onPress={closeFeedbackModal}
              >
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
  <Text style={styles.preguntaEnunciado}>{situacion.preguntas[currentQuestionIndex].enunciado}</Text>
  {renderRespuestas(situacion.preguntas[currentQuestionIndex].respuestas, situacion.preguntas[currentQuestionIndex])}
  {/* Verifica si la pregunta actual es la cuarta pregunta (índice 3 ya que los índices comienzan en 0) */}
  {currentQuestionIndex === 4 && renderImagenes()}
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
    marginTop: 15
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
export default Situacion2Optimizacion;