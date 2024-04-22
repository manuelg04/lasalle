/* eslint-disable import/order */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
// @ts-ignore
import { Ionicons } from '@expo/vector-icons';
// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
// @ts-ignore
import { StackNavigationProp } from '@react-navigation/stack';
// @ts-ignore
import axios from 'axios';
// @ts-ignore
import React, { useEffect, useState } from 'react';
// @ts-ignore
import { View, Text, StyleSheet, ScrollView, Alert, Image, Modal, ActivityIndicator, Button } from 'react-native';
// @ts-ignore
import { TouchableOpacity } from 'react-native-gesture-handler';
// @ts-ignore
import ImageViewer from 'react-native-image-zoom-viewer';
// @ts-ignore
import MathComponent from '../utils/MathSvg';
// @ts-ignore
import { MathJax } from 'react-native-mathjax';
// @ts-ignore
import { Svg, SvgUri } from 'react-native-svg';
// @ts-ignore
import { MathJaxSvg } from 'react-native-mathjax-text-svg';
// @ts-ignore
import * as Progress from 'react-native-progress';

import { RootStackParamList } from '../navigation';
import {recursos} from "../screens/Recordemos"
import AnswerCorrectly from '../utils/AnswerCorrectly';
import AnswerWrong from '../utils/AnswerWrong';
import MathSvg from '../utils/MathSvg';
import MathWebView from '../utils/MathSvg';
import MathImage from '../utils/MathSvg';
import EquationRenderer from '../utils/MathSvg';


const situacion1 :any = [
    {
        "tituloSituacion": "Situación 1. ¡Hoy nos tocó empacar! ",
        "enunciado": "Un estudiante desea realizar su proyecto de pasantía en un laboratorio donde frecuentemente se requiere el empaque y traslado de insumos pequeños de laboratorio. Normalmente estos insumos se empacan en diferentes cajas en forma de cubo. Estas cajas cambian de tamaño según la cantidad de insumos a empacar. Debido a estos cambios, el estudiante se inquieta por conocer la variación del volumen de una de estas cajas con respecto a la longitud de la arista, cuando la arista mide 3 cm.",
        "postEnunciado": "Con respecto a la situación planteada anteriormente responda:",
        "Subtitulo": "¿Qué comprendes de la situación?",
        "postSubtitulo": "En el problema se debe",
        "preguntas": [
            {
                url: "https://a7h7o2dls3piqoqkxnv0mw.on.drv.tw/Recursos_APP_Francisco/OVA_PASOS_RP5/Pasos_para_RP/",
                "respuestas": [
                    "a. Hallar la razón a la cual cambia el volumen con respecto a la arista",
                    "b. Hallar la razón a la cual cambia la arista con respecto al volumen"
                ],
                "respuestaCorrecta": 0,
                "tip": "Es importante identificar el objetivo de la situación - Ten presente revisar la comprensión de una situación en Pasos para resolver un problema "
            },
            {
                "enunciado": "2. La cantidad que se desconoce o lo solicitado en el problema es:",
                url: "https://a7h7o2dls3piqoqkxnv0mw.on.drv.tw/Recursos_APP_Francisco/OVA_PASOS_RP5/Pasos_para_RP/",
                "respuestas": [
                    "a. Volumen del cubo",
                    "b. Arista del cubo",
                    "c. Razón de cambio del volumen con respecto a la arista",
                    "d. Razón de cambio de la arista con respecto al volumen"
                ],
                "respuestaCorrecta": 2,
                "tip": "Es importante identificar la incógnita de la situación - Ten presente revisar la comprensión de una situación en Pasos para resolver un problema   "
            },
            {
                "enunciado": "3. La cantidad o dato que se proporcionan en el problema son (información dada): ",
                url: "https://a7h7o2dls3piqoqkxnv0mw.on.drv.tw/Recursos_APP_Francisco/OVA_PASOS_RP5/Pasos_para_RP/",
                "respuestas": [
                    "a. Volumen del cubo",
                    "b. Arista del cubo",
                    "c. Razón de cambio del volumen con respecto a la arista",
                    "d. Razón de cambio de la arista del cubo"
                ],
                "respuestaCorrecta": 1,
                "tip": "Es importante identificar los datos o valores que nos proporcionan - Ten presente revisar la comprensión de una situación en Pasos para resolver un problema  "
            },
            {
                "enunciado": "4. Si a es la arista del cubo, entonces un diagrama que ilustre la situación es:",
                url: "https://drive.google.com/file/d/10Xx_scheSiMvdZzWwVYWywBrNRADtoZ6/view?usp=sharing",
                "imagen": "https://drive.google.com/file/d/12CWEv7izFJPPxSTMXjWeGtWJnZlJpATf/view?usp=sharing",
                "respuestas": [
                    "a",
                    "b",
                    "c",
                    "d"
                ],
                "respuestaCorrecta": 1,
                "tip": "Es importante ayudarse de un gráfico para comprender la situación - Ten presente estudiar  áreas y volúmenes en recordemos. "
            },
            {
                "Subtitulo": "¿Qué plan diseñarías?",
                "enunciado": "5. En el problema se debe definir previamente:",
                url: "https://www.youtube.com/watch?v=-UPzQwTQhAU",
                
                "respuestas": [
                    "a. La función arista que depende del volumen del cubo ",
                    "b. La función arista que depende de un volumen fijo 3",
                    "c. La función volumen de un cubo que depende de la longitud de arista",
                    "d. La función volumen de un cubo que depende de su área superficial"
                ],
                "respuestaCorrecta": 2,
                "tip": "Es importante identificar conceptos previos necesarios para resolver la situación - Ten presente estudiar la introducción a las funciones en recordemos. "
            },
            {
                "enunciado": "6. Si a es la arista del cubo y V es el volumen del cubo, entonces una expresión para el volumen es:",
                url: "https://h5p.org/h5p/embed/131374",
                "respuestas": [
                    "V=3a",
                    "V=8a",
                    "V=a^2",
                    "V=a^3"
                ],
                "respuestaCorrecta": 3,
                "tip": "Es importante identificar conceptos previos necesarios para resolver la situación - Ten presente estudiar  traducción de enunciados en recordemos"
            },
            {
                "enunciado": "7. Para encontrar la variación solicitada, el estudiante debe proceder:",
                url: "Derivadas",
                "respuestas": [
                    "a. Definiendo la arista en función del volumen, derivar dicha función y sustituir el valor de 3 cm de la arista",
                    "b. Definiendo el volumen en función del tiempo, derivar dicha función y sustituir el valor de 3 cm dado por la arista.  ",
                    "c. Definiendo el volumen en función de la arista, derivar dicha función y sustituir el valor de 3 cm dado por la arista.  ",
                    "d. Definiendo el volumen en función del cubo, derivar dicha función y sustituir el valor de 3 cm dado por la arista"
                ],
                "respuestaCorrecta": 2,
                "tip": "Es importante identificar conceptos previos necesarios para resolver la situación - Ten presente estudiar la razón de cambio en recordemos."
            },
            {
                "Subtitulo": "¿Cómo llevarías a cabo el plan?",
                "enunciado": "8. Al derivar el volumen V=a^3 con respecto a a, se obtiene",
                url: "https://www.youtube.com/watch?v=gl9oK_LVPow",
                "respuestas": [
                    "dV/da=3a",
                    "dV/da=3a^2",
                    "da/dV=3a",
                    "dV/da=a^2"
                ],
                "respuestaCorrecta":1,
                "tip": "Es importante aplicar correctamente los procedimientos, reglas o estrategias para resolver la situación. - Ten presente  estudiar reglas de derivación en recordemos."
            },
            {
                "enunciado": "9. Para encontrar la variación solicitada se debe: ",
                url: "Derivadas",
                "respuestas": [
                    "Reemplazar el valor de a=3 en la ecuación V=a^3",
                    "Reemplazar el valor de a=3 en la ecuación dV/da=3a^2",
                    "Reemplazar el valor de V=3 en la ecuación dV/da=3a^2 y despejar a",
                    "Reemplazar el valor de a=3 en la ecuación dV/da=a^2"
                ],
                "respuestaCorrecta": 1,
                "tip": "Es importante aplicar correctamente los procedimientos, reglas o estrategias para resolver la situación planteada. - Ten presente estudiar la razón de cambio en recordemos "
            },
            {
                "Subtitulo": "¿Qué resultados obtienes?",
                "enunciado": "10. La tasa de cambio del volumen de la caja en forma de cubo con respecto a la longitud de la arista, cuando la arista mide 3 mm es de:",
                url: "Derivadas",
                "respuestas": [
                    "3m^3/mm",
                    "6m^3/mm",
                    "9m^3/mm",
                    "27m^3/mm"
                ],
                "respuestaCorrecta": 3,
                "tip": "Es importante analizar otras formas de obtener y mostrar la solución - Ten presente estudiar la razón de cambio en recordemos "
            },
            {
                "enunciado": "11. En la solución obtenida el valor de  27 m^3/mm   representa",
                url: "Derivadas",
                "respuestas": [
                    "a. La velocidad de crecimiento del volumen con respecto a la medida de la arista cuando la misma arista tiene una longitud de 3 mm.",
                    "b. la velocidad de crecimiento de la arista con respecto a la medida del volumen cuando la misma arista tiene una longitud de 3 mm.",
                    "c. El volumen en función de la medida de la arista cuando la misma arista tiene una longitud de 3 mm.",
                    "d. La velocidad de decrecimiento del volumen con respecto a la medida de la arista cuando la misma arista tiene una longitud de 3 mm."
                ],
                "respuestaCorrecta": 0,
                "tip": "Es importante analizar otras formas de obtener y mostrar la solución  - Ten presente estudiar la razón de cambio en recordemos "
            },
            {
                "enunciado": "12. Con respecto al problema anterior, es correcto afirmar que:",
                url: "Derivadas",
                "respuestas": [
                    "a. El volumen aumenta a razón de 27 cuando la arista tiene una longitud de 1 cm",
                    "b. El volumen disminuye a razón de 3 cuando la arista tiene una longitud de 1 cm",
                    "c. El volumen aumenta a razón de 3 cuando la arista tiene una longitud de 1 cm",
                    "d. el volumen disminuye a razón de 1 cuando la arista tiene una longitud de 3 cm"
                ],
                "respuestaCorrecta": 2,
                "tip": "Es importante comprobar la solución que se encontró - Ten presente estudiar la razón de cambio en recordemos "
            }
        ]
    },
]

const RadioButton = ({ label, isSelected, onPress, disabled }) => {
  const handlePress = () => {
    console.log('Radio button touched'); // Add console.log statement here
    onPress();
  };

  return (
    <TouchableOpacity
      style={styles.radioButtonContainer}
      onPress={handlePress} // Call handlePress instead of onPress directly
      disabled={disabled}
    >
      <View style={[
        styles.radioButton,
        isSelected ? styles.radioButtonSelected : null
      ]} />
      <Text style={styles.radioButtonLabel}>{label}</Text>
    </TouchableOpacity>
  );
};


const getSubtitulo = (questionIndex: any) => {
    if (questionIndex >= 0 && questionIndex <= 3) {
        return "¿Qué comprendes de la situación?";
    } else if (questionIndex >= 4 && questionIndex <= 6) {
        return "¿Qué plan diseñarías?";
    } else if (questionIndex >= 7 && questionIndex <= 8) {
        return "¿Cómo llevarías a cabo el plan?";
    } else if (questionIndex >= 9 && questionIndex <= 11) {
        return "¿Qué resultados obtienes?";
    }
    return "";
};

type FeedbackState = 'correct' | 'incorrect' | null;
``
type DetailsSreenRouteProp = RouteProp<RootStackParamList, 'Situacion1RazonDeCambio'>;
type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'FeedbackScreen'>;


const Situacion1RazonDeCambio = () => {
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
const [situacionCompletada, setSituacionCompletada] = useState(false);
const [isViewerVisible, setIsViewerVisible] = useState(false);
const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Verifica si la situación ya ha sido completada
  useEffect(() => {
    const verificarCompletada = async () => {
      const completada = await AsyncStorage.getItem('situacion1_completada');
      if (completada === 'true') {
        setSituacionCompletada(true);
      }
    };

    verificarCompletada();
  }, []);



  const situacion = situacion1[0]; // Asumiendo que solo trabajas con la situación 1

  const handleAnswer = (respuestaIndex) => {
    console.log('handleAnswer called with', respuestaIndex); // Agregamos un log aquí
    const question = situacion.preguntas[currentQuestionIndex];
    if(selectedAnswers[currentQuestionIndex] === undefined) {
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
  console.log('Cerrando modal de feedback');
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

  const renderRespuestas = (respuestas, pregunta) => {
    const isAnswerSelected = selectedAnswers[currentQuestionIndex] !== undefined;
    // Función para determinar si la respuesta contiene una fórmula matemática y devolver el componente MathText correspondiente
    const renderMathOrText = (respuesta) => {
      if (respuesta === 'V=a^2') {
        return (
         <Text>V=a²</Text>
        );
      
      } 
      else if (respuesta === 'V=3a') {
        return <Text> V=3a </Text>
      }
      else if (respuesta === 'V=8a') {
        return <Text> V=8a </Text>
      }
      else if (respuesta === 'V=a^3') {
        return <Text> V=a³</Text>
      }
      else if (respuesta === 'V=a^2') {
        return <Text> V=a²</Text>
      } else if (respuesta === 'V=a^3') {
        return <Text> V=a³</Text>
      } else if (respuesta === 'V=3a') {
        return <Text> V=3a</Text>
      }
      else if (respuesta === 'V=8a') {
        return <Text> V=8a</Text>
      }
      else if (respuesta === 'dV/da=3a') {
       return <View style={styles.container}>
       <EquationRenderer equation="dV/da=3a" />
     </View>
     
      } else if (respuesta === 'dV/da=3a^2') {
        return <View style={styles.container}>
         <Text> dV/da = 3a²  </Text>
        </View>
      } else if (respuesta === 'da/dV=3a') {
        return <View style={styles.container}>
        <EquationRenderer equation="da/dv=3a" />
      </View>
      } else if (respuesta === 'dV/da=a^2') {
        return <View style={styles.container}>
        <Text> dV/da = a² </Text>
      </View>
      }
      else if (respuesta === 'Reemplazar el valor de a=3 en la ecuación V=a^3') {
        return (
          <>
            {"Reemplazar el valor de a=3 en la ecuación "}
           <Text> V=a³ </Text>
          </>
        );
      } else if (respuesta === 'Reemplazar el valor de a=3 en la ecuación dV/da=3a^2') {
        return (
          <>
     <View style={styles.container}>
        <Text>Reemplazar el valor de a=3 en la ecuación</Text>
        <View style={styles.imageContainer}>
          <Image source={require('../../assets/situacion1punto9bc.png')} style={styles.image} />
          </View>
      </View>
          </>
        );
      } else if (respuesta.includes(`Reemplazar el valor de V=3 en la ecuación dV/da=3a^2 y despejar a`)) {
        return (
          <>
        <Text>Reemplazar el valor de en la ecuación dV/da = 3a²</Text>
          </>
        );
      } else if (respuesta.includes('Reemplazar el valor de a=3 en la ecuación dV/da=a^2')) {
        return (
          <>
            {"Reemplazar el valor de a=3 en la ecuación "}
            <Text> dV/da = a² </Text>
          </>
        );
      }
      else if (respuesta === '3m^3/mm') {
        return (
          <Text>3m³/mm</Text>
        )
      } else if (respuesta === '6m^3/mm') {
        return (
          <Text>6m³/mm</Text>
        )
      } else if (respuesta === '9m^3/mm') {
        return (
          <Text>9m³/mm</Text>
        )
      } else if (respuesta === '27m^3/mm') {
        return (
          <Text>27m³/mm</Text>
        )
      }
       else {
        return respuesta; // Si no es una fórmula matemática, devuelve el string
      }
    };
    return respuestas.map((respuesta, index) => {
      console.log('Rendering RadioButton', index); // Agregamos un log aquí
      return (
        <RadioButton
          key={index}
          label={renderMathOrText(respuesta)}
          isSelected={selectedAnswers[currentQuestionIndex] === index}
          onPress={() => {
            console.log('RadioButton onPress called', index); // Agregamos un log aquí
            handleAnswer(index);
          }}
          disabled={isAnswerSelected}
        />
      );
    });
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
    await AsyncStorage.setItem('situacion1_completada', 'true');
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

    const response = await axios.post('https://lasalleapp.onrender.com/save-answer/guardar-respuesta', {
      idEstudiante,
      idCuestionario,
      respuestasEstudiante,
      tiempoTranscurrido: tiempoTranscurridoMinutos
    });
    console.log("🚀 ~ response:", response)

    if( response.status === 201){
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
    console.error('Error al enviar respuestas:', error.message);
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
    const idCuestionarioNormalizado = "Situación 1. ¡Hoy nos tocó empacar!"
         if (idEstudiante && idCuestionarioNormalizado) {
      navigation.navigate('FeedbackScreen', { 
        idEstudiante,
        idCuestionarioNormalizado,
        situacionCompletada: true
      });
    } else {
      console.error('No se pudo obtener el idEstudiante o el idCuestionarioNormalizado');
    }   
  };

  //   // Maneja la visualización del feedback anterior
  //   const mostrarFeedbackAnterior = async () => {
  //     // Si la situación ya ha sido completada, mostramos el feedback
  //     const idEstudiante = await AsyncStorage.getItem('userId');
  //     const idCuestionario = situacion.tituloSituacion;
  //   // Solo procedemos si tenemos los IDs necesarios
  //     if (idEstudiante && idCuestionario) {
  //     navigation.navigate('FeedbackScreen', { 
  //       idEstudiante,
  //       idCuestionario,
  //     });
  //   } else {
  //     // Manejar el caso donde no se puedan obtener los IDs
  //     console.error('No se pudo obtener el idEstudiante o el idCuestionarioNormalizado');
  //   }
    
  // };

  const opcionesDeRespuesta = [
    { opcion: 'a', imagen: require('../../assets/aResponse.png') },
    { opcion: 'b', imagen: require('../../assets/bResponse.png') },
    { opcion: 'c', imagen: require('../../assets/cResponse.png') },
    { opcion: 'd', imagen: require('../../assets/dResponse.png') },
  ];

  // Convertir las imágenes para ser compatibles con ImageViewer
const imagesForViewer = opcionesDeRespuesta.map(item => ({
  // Asegúrate de que la propiedad 'url' apunte a tu imagen local o remota
  url: '',
  props: { source: item.imagen }
}));

const renderImagenes = () => {
  return (
    <View style={styles.imagesContainer}>
      {opcionesDeRespuesta.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.imageOptionContainer}
          onPress={() => {
            setCurrentImageIndex(index);
            setIsViewerVisible(true);
          }}>
          <Text style={styles.imageOptionText}>Opción {item.opcion.toUpperCase()}</Text>
          <Image source={item.imagen} style={styles.imagen} />
        </TouchableOpacity>
      ))}

      <Modal visible={isViewerVisible} transparent>
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
  const progress = (currentQuestionIndex + 1) / totalQuestions; // +1 para que la progresión comience en la primera pregunta
  
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
              style={{ marginLeft: 10 }} // Asegura algo de espacio entre el texto y el ícono
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
              {/* Verifica si la pregunta actual es la cuarta pregunta (índice 3 ya que los índices comienzan en 0) */}
              {currentQuestionIndex === 3 && renderImagenes()}
            </View>

            <View style={styles.navigationContainer}>
              <TouchableOpacity style={styles.navButton}>
                <Text onPress={previousQuestion}>Anterior</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.navButton}>
                <Text onPress={nextQuestion}>Siguiente</Text>
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
    marginRight: 5,
},
radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'black',
},
radioButtonLabel: {
  color: 'black',
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
    justifyContent: 'center',
},
closeButton: {
  marginTop: 10, // Ajusta este valor según sea necesario para dar espacio después del botón 'Ver Recurso'
  backgroundColor: '#2196F3',
  borderRadius: 20,
  padding: 10,
  elevation: 2,
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

tituloSituacionContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  // Añade cualquier otro estilo como padding si es necesario
},
progressContainer: {
  marginTop: 10,
  padding: 10,
  alignItems: 'stretch',
},
containerAnswers: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
},
image: {
  width: 80,
  height: 80,
  resizeMode: 'contain',
},
imageContainer: {
  paddingVertical: 10, // Ajusta el padding vertical según sea necesario
},
rowContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'center',
},
text: {
  fontSize: 11,
},
inlineImage: {
  width: 100, // Aumenta el ancho de la imagen
  height: 100, // Aumenta la altura de la imagen
  resizeMode: 'contain',
},

  });
export default Situacion1RazonDeCambio;
