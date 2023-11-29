/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image, Modal, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {recursos} from "../screens/Recordemos"
import AnswerCorrectly from '../utils/AnswerCorrectly';
import AnswerWrong from '../utils/AnswerWrong';
import FeedBackModal from '../utils/FeedbackModal';


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
                    "a. V = 3a",
                    "b. V = 8a",
                    "c. V = a^2",
                    "d. V = a^3"
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
                "enunciado": "8. Al derivar el volumen V=a3 con respecto a a, se obtiene",
                url: "https://www.youtube.com/watch?v=gl9oK_LVPow",
                "respuestas": [
                    "a. dV/da=3a",
                    "b. dV/da=3a^2",
                    "c. da/dV=3a",
                    "d. dV/da=a^2"
                ],
                "respuestaCorrecta":1,
                "tip": "Es importante aplicar correctamente los procedimientos, reglas o estrategias para resolver la situación. - Ten presente  estudiar reglas de derivación en recordemos."
            },
            {
                "enunciado": "9. Para encontrar la variación solicitada se debe: ",
                url: "Derivadas",
                "respuestas": [
                    "a. Reemplazar el valor de  a=3  en la ecuación V=a^3 ",
                    "b. Reemplazar el valor de a=3  en la ecuación  dV/da=3a^2 ",
                    "c. Reemplazar el valor de V=3  en la ecuación  dV/da=3a^2  y despejar  a",
                    "d. Reemplazar el valor de a=3  en la ecuación  dV/da=a^2 "
                ],
                "respuestaCorrecta": 1,
                "tip": "Es importante aplicar correctamente los procedimientos, reglas o estrategias para resolver la situación planteada. - Ten presente estudiar la razón de cambio en recordemos "
            },
            {
                "Subtitulo": "¿Qué resultados obtienes?",
                "enunciado": "10. La tasa de cambio del volumen de la caja en forma de cubo con respecto a la longitud de la arista, cuando la arista mide 3 mm es de:",
                url: "Derivadas",
                "respuestas": [
                    "a. 3 m^3/mm",
                    "b. 6 m^3/mm",
                    "c. 9 m^3/mm",
                    "d. 27 m^3/mm"
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



  const situacion = situacion1[0]; // Asumiendo que solo trabajas con la situación 1

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

  const renderImagen = (imagen:any) => {
    if (!imagen) return null;
    return <Image source={require('../../assets/situacion1_punto4.png')} style={styles.imagen} />;
};

const enviarRespuestas = async () => {
    setIsLoading(true);
    const idCuestionario = situacion.tituloSituacion; // Asumiendo que situacion es situacion1[0]
    const respuestasEstudiante = situacion.preguntas.map((pregunta, indice) => {
      return {
        preguntaId: indice,
        respuestaSeleccionada: selectedAnswers[indice],
        esRespuestaCorrecta: selectedAnswers[indice] === pregunta.respuestaCorrecta
      };
    });
  
    try {
      // Leer idEstudiante e idCuestionario desde AsyncStorage
      const idEstudiante = await AsyncStorage.getItem('userId');
    
  
      if (!idEstudiante || !idCuestionario) {
        console.error('Falta ID del estudiante o ID del cuestionario');
        return;
      }
  
      const response = await axios.post('https://lasalleapp-dev-sjta.1.us-1.fl0.io/save-answer/guardar-respuesta', {
        idEstudiante,
        idCuestionario,
        respuestasEstudiante
      });
      console.log("🚀 ~ response:", response)
      if (response.status === 201) {
        alert('Respuestas enviadas correctamente');
        const analizarRespuestasUrl = 'https://lasalleapp-dev-sjta.1.us-1.fl0.io/analizar/analizar-respuestas';
        const responseAnalizar = await axios.post(analizarRespuestasUrl, {
        idEstudiante,
        idCuestionario
      });
      setIsLoading(false);
      if (responseAnalizar.data.feedback) {
        setFeedbackModal({
            visible: true,
            feedback: responseAnalizar.data.feedback, // Aquí estableces el contenido del feedback
            type: 'correct' // o 'incorrect', según necesites
          });
      }
      }
    
      // Aquí puedes manejar la respuesta del servidor
    } catch (error) {
        setIsLoading(false);
        if (axios.isAxiosError(error)) {
            console.error('Error al enviar respuestas:', error.message);
            if (error.response) {
              // Aquí puedes ver la respuesta completa del error, incluyendo los datos que envía el servidor.
              console.error('Detalles del error:', error.response.data);
            }
          } else {
            // Manejar errores que no son de Axios
            console.error('Error no relacionado con Axios:', error);
          }
      // Manejar el error
    }
  };
  
  


  return (
<View style={styles.container}>
    {isLoading ? (
      // Mostrar el loader cuando isLoading sea true
      <ActivityIndicator size="large" color="#0000ff" />
    ) : (
      // El contenido de tu pantalla cuando isLoading sea false
      <>
        <FeedBackModal
          isVisible={feedbackModal.visible}
          feedback={feedbackModal.feedback}
          onClose={() => setFeedbackModal({ ...feedbackModal, visible: false })}
        />

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
            {situacion.preguntas[currentQuestionIndex].imagen && renderImagen(situacion.preguntas[currentQuestionIndex].imagen)}
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
        backgroundColor: '#212121',
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
        borderBottomColor: 'white',
    },
    enunciado: {
        color: 'white',
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
    borderColor: 'white',
    marginRight: 10,
},
radioButtonSelected: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#facc15',
},
radioButtonLabel: {
    color: 'white', // Texto en blanco
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
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
},
closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 15
},

  });
export default Situacion1RazonDeCambio;
