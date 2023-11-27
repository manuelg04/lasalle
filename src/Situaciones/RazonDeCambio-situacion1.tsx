/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const situacion1 :any = [
    {
        "tituloSituacion": "Situación 1. ¡Hoy nos tocó empacar! ",
        "enunciado": "Un estudiante desea realizar su proyecto de pasantía en un laboratorio donde frecuentemente se requiere el empaque y traslado de insumos pequeños de laboratorio. Normalmente estos insumos se empacan en diferentes cajas en forma de cubo. Estas cajas cambian de tamaño según la cantidad de insumos a empacar. Debido a estos cambios, el estudiante se inquieta por conocer la variación del volumen de una de estas cajas con respecto a la longitud de la arista, cuando la arista mide 3 cm.",
        "postEnunciado": "Con respecto a la situación planteada anteriormente responda:",
        "Subtitulo": "¿Qué comprendes de la situación?",
        "postSubtitulo": "En el problema se debe",
        "preguntas": [
            {
                "respuestas": [
                    "A. Hallar la razón a la cual cambia el volumen con respecto a la arista",
                    "B. Hallar la razón a la cual cambia la arista con respecto al volumen"
                ],
                "respuestaCorrecta": "Hallar la razón a la cual cambia el volumen con respecto a la arista",
                "tip": "Es importante identificar el objetivo de la situación - Ten presente revisar la comprensión de una situación en Pasos para resolver un problema "
            },
            {
                "enunciado": "2. La cantidad que se desconoce o lo solicitado en el problema es:",
                "respuestas": [
                    "Volumen del cubo",
                    "Arista del cubo",
                    "Razón de cambio del volumen con respecto a la arista",
                    "Razón de cambio de la arista con respecto al volumen"
                ],
                "respuestaCorrecta": "Razón de cambio del volumen con respecto a la arista",
                "tip": "Es importante identificar la incógnita de la situación - Ten presente revisar la comprensión de una situación en Pasos para resolver un problema   "
            },
            {
                "enunciado": "3. La cantidad o dato que se proporcionan en el problema son (información dada): ",
                "respuestas": [
                    "Volumen del cubo",
                    "Arista del cubo",
                    "Razón de cambio del volumen con respecto a la arista",
                    "Razón de cambio de la arista del cubo"
                ],
                "respuestaCorrecta": "Arista del cubo",
                "tip": "Es importante identificar los datos o valores que nos proporcionan - Ten presente revisar la comprensión de una situación en Pasos para resolver un problema  "
            },
            {
                "enunciado": "4. Si a es la arista del cubo, entonces un diagrama que ilustre la situación es:",
                "imagen": "https://drive.google.com/file/d/12CWEv7izFJPPxSTMXjWeGtWJnZlJpATf/view?usp=sharing",
                "respuestas": [
                    "a",
                    "b",
                    "c",
                    "d"
                ],
                "respuestaCorrecta": "b",
                "tip": "Es importante ayudarse de un gráfico para comprender la situación - Ten presente estudiar  áreas y volúmenes en recordemos. "
            },
            {
                "enunciado": "5. En el problema se debe definir previamente:",
                "Subtitulo": "¿Qué plan diseñarías?",
                "respuestas": [
                    "a. La función arista que depende del volumen del cubo ",
                    "b. La función arista que depende de un volumen fijo 3",
                    "c. La función volumen de un cubo que depende de la longitud de arista",
                    "d. La función volumen de un cubo que depende de su área superficial"
                ],
                "respuestaCorrecta": "c. La función volumen de un cubo que depende de la longitud de arista",
                "tip": "Es importante identificar conceptos previos necesarios para resolver la situación - Ten presente estudiar la introducción a las funciones en recordemos. "
            },
            {
                "enunciado": "Si a es la arista del cubo y V es el volumen del cubo, entonces una expresión para el volumen es:",
                "respuestas": [
                    "a. V = 3a",
                    "b. V = 8a",
                    "c. V = a^2",
                    "d. V = a^3"
                ],
                "respuestaCorrecta": "d. V = a^3",
                "tip": "Recuerde que se deben identificar los conceptos previos necesarios para resolver la situación planteada. Se sugiere estudiar la temática de traducción de enunciados en recordemos. "
            },
            {
                "enunciado": "Para encontrar la variación solicitada, el estudiante debe proceder:",
                "respuestas": [
                    "a. Definiendo la arista en función del volumen, derivar dicha función y sustituir el valor de 3 cm de la arista",
                    "b. Definiendo el volumen en función del tiempo, derivar dicha función y sustituir el valor de 3 cm dado por la arista.  ",
                    "c. Definiendo el volumen en función de la arista, derivar dicha función y sustituir el valor de 3 cm dado por la arista.  ",
                    "d. Definiendo el volumen en función del cubo, derivar dicha función y sustituir el valor de 3 cm dado por la arista"
                ],
                "respuestaCorrecta": "c. Definiendo el volumen en función de la arista, derivar dicha función y sustituir el valor de 3 cm dado por la arista.  ",
                "tip": "Recuerde que se deben identificar los conceptos previos necesarios para resolver la situación planteada.Se sugiere estudiar la temática de razón de cambio en recordemos. "
            },
            {
                "enunciado": "Al derivar el volumen V=a3 con respecto a a, se obtiene",
                "respuestas": [
                    "dV/da=3a",
                    "dV/da=3a^2",
                    "da/dV=3a",
                    "dV/da=a^2"
                ],
                "respuestaCorrecta": "dV/da=3a^2",
                "tip": ""
            },
            {
                "enunciado": "Para encontrar la variación solicitada se debe: ",
                "respuestas": [
                    "Reemplazar el valor de  a=3  en la ecuación V=a^3 ",
                    "Reemplazar el valor de a=3  en la ecuación  dV/da=3a^2 ",
                    "Reemplazar el valor de V=3  en la ecuación  dV/da=3a^2  y despejar  a",
                    "Reemplazar el valor de a=3  en la ecuación  dV/da=a^2 "
                ],
                "respuestaCorrecta": "Reemplazar el valor de a=3  en la ecuación  dV/da=3a^2 ",
                "tip": ""
            },
            {
                "enunciado": "La tasa de cambio del volumen de la caja en forma de cubo con respecto a la longitud de la arista, cuando la arista mide 3 mm es de:",
                "respuestas": [
                    "3 m^3/mm",
                    "6 m^3/mm",
                    "9 m^3/mm",
                    "27 m^3/mm"
                ],
                "respuestaCorrecta": "27 m^3/mm",
                "tip": ""
            },
            {
                "enunciado": "En la solución obtenida el valor de  27 m^3/mm   representa",
                "respuestas": [
                    "La velocidad de crecimiento del volumen con respecto a la medida de la arista cuando la misma arista tiene una longitud de 3 mm.",
                    "la velocidad de crecimiento de la arista con respecto a la medida del volumen cuando la misma arista tiene una longitud de 3 mm.",
                    "El volumen en función de la medida de la arista cuando la misma arista tiene una longitud de 3 mm.",
                    "La velocidad de decrecimiento del volumen con respecto a la medida de la arista cuando la misma arista tiene una longitud de 3 mm."
                ],
                "respuestaCorrecta": "La velocidad de crecimiento del volumen con respecto a la medida de la arista cuando la misma arista tiene una longitud de 3 mm.",
                "tip": ""
            },
            {
                "enunciado": "Con respecto al problema anterior, es correcto afirmar que:",
                "respuestas": [
                    "El volumen aumenta a razón de 27 cuando la arista tiene una longitud de 1 cm",
                    "El volumen disminuye a razón de 3 cuando la arista tiene una longitud de 1 cm",
                    "El volumen aumenta a razón de 3 cuando la arista tiene una longitud de 1 cm",
                    "el volumen disminuye a razón de 1 cuando la arista tiene una longitud de 3 cm"
                ],
                "respuestaCorrecta": "El volumen aumenta a razón de 3 cuando la arista tiene una longitud de 1 cm",
                "tip": ""
            }
        ]
    },
]

const Situacion1RazonDeCambio = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({}) as any;
  const [isEnunciadoVisible, setIsEnunciadoVisible] = useState(true);

  const situacion = situacion1[0]; // Asumiendo que solo trabajas con la situación 1

  const handleAnswer = (respuesta:any) => {
      const question = situacion.preguntas[currentQuestionIndex];
      setSelectedAnswers({ ...selectedAnswers, [currentQuestionIndex]: respuesta });
      if (respuesta === question.respuestaCorrecta) {
          Alert.alert('Correcto', 'Has seleccionado la respuesta correcta.');
      } else {
          Alert.alert('Incorrecto', question.tip);
      }
  };

  const nextQuestion = () => {
      if (currentQuestionIndex < situacion.preguntas.length - 1) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
  };

  const previousQuestion = () => {
      if (currentQuestionIndex > 0) {
          setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
  };

  const renderRespuestas = (respuestas, pregunta) => {
    return respuestas.map((respuesta, index) => (
        <TouchableOpacity
            key={index}
            style={[
                styles.respuesta,
                selectedAnswers[currentQuestionIndex] === respuesta && styles.selectedAnswer,
            ]}
            onPress={() => handleAnswer(respuesta)}
        >
            <Text style={styles.respuestaText}>{respuesta}</Text>
        </TouchableOpacity>
    ));
};

  const renderImagen = (imagen) => {
    if (!imagen) return null;
    return <Image source={require('../../assets/situacion1_punto4.png')} style={styles.imagen} />;
};

  return (
      <View style={styles.container}>
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
      </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 12,
      backgroundColor: '#f7fafc',
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
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    enunciado: {
      fontSize: 16,
      marginBottom: 8,
    },
    postEnunciado: {
      fontSize: 16,
      fontStyle: 'italic',
      marginBottom: 8,
    },
    preguntaContainer: {
      marginBottom: 10,
      
    },
    preguntaEnunciado: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 4,
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

  });
export default Situacion1RazonDeCambio;
