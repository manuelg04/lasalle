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
  Image,
} from 'react-native';

import { RootStackParamList } from '../navigation';
import EquationRenderer from '../utils/MathSvg';
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
          console.log("🚀 ~ latestAttemptData:", JSON.stringify(latestAttemptData))
          setFeedbackData(latestAttemptData); // Aquí estableces la data de Firestore en el estado
          setIsLoading(false); // Data ha sido cargada
        } else {
          console.log(
            `No se encontraron intentos para el cuestionario: ${idCuestionarioNormalizado} y estudiante: ${idEstudiante}`
          );
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error completo:', error.message);
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

  const renderMathOrTextForFeedback = (respuesta, index) => {
    if (!respuesta) return null;
    respuesta = respuesta.replace(/^[a-d]\.\s*|\s*:/g, ''); // Elimina las opciones de respuesta (a., b., c., d.) y los dos puntos
    // Función auxiliar para formatear ecuaciones matemáticas para LaTeX
    const formatEquation = (equation) => {
      // Reemplaza los símbolos de ecuación con su equivalente
      const formattedEquation = equation.replace(/([a-zA-Z0-9]+)([\^\/=])([a-zA-Z0-9]+)/g, (match, p1, p2, p3) => {
        if (p2 === '^') {
          return `${p1}${p2}${p3}`;
        } else {
          return `${p1}${p2}${p3}`;
        }
      });
      return formattedEquation;
    };
    if (respuesta === 'xt2-xt1t2-t1') {
      return (
        <View style={styles.container}>
        <EquationRenderer equation="xt₂- xt₁t₂ -t₁" />
      </View>
      )
    }
    else if (respuesta === 'V=a^3') {
      return <Text>V=a³</Text>;
    
    }
    else if (respuesta === 'dV/da=3a^2') {
      return <Text>dV/da=3a²</Text>;
    }
    else if (respuesta === 'dV/da=a^2') {
      return <Text>dV/da=a²</Text>;
    }
    else if (respuesta === 'Reemplazar el valor de a=3 en la ecuación v=a^3') {
      return <Text>Reemplazar el valor de a=3 en la ecuación v=a³</Text>;
    }
    else if (respuesta === 'Reemplazar el valor de a=3 en la ecuación dV/da=3a^2') {
      return <Text>Reemplazar el valor de a=3 en la ecuación dV/da=3a²</Text>;
    }
    else if (respuesta === 'Reemplazar el valor de v=3 en la ecuación dV/da=3a^2 y despejar a') {
      return <Text>Reemplazar el valor de a=3 en la ecuación dV/da=3a² y despejar a</Text>;
    }
    else if (respuesta === 'Reemplazar el valor de a=3 en la ecuación dV/da=a^2') {
      return <Text>Reemplazar el valor de a=3 en la ecuación dV/da=a²</Text>;
    }
    else if (respuesta === '3 m^3/mm') {
      return (
        <Text>3m³/ mm</Text>
      )
    } else if (respuesta === '6 m^3/mm') {
      return (
        <Text>6m³/ mm</Text>
      )
    } else if (respuesta === '9 m^3/mm') {
      return (
        <Text>9m³/ mm</Text>
      )
    } else if (respuesta === '27 m^3/mm') {
      return (
        <Text>27m³/ mm</Text>
      )
    }
    else if (respuesta === 't2-t1xt2-xt1'){
      return(
        <View style={styles.container}>
        <EquationRenderer equation="t₂ - t₁xt₂ - xt₁" />
        </View>
      )
    }
    else if (respuesta === 'vt2-vt1t2-t1 donde v es la velocidad de la partícula') {
      return <Text>vt₂ - vt₁t₂ - t₁ donde v es la velocidad de la partícula</Text>;
    }
    if (respuesta === 'Usar el cociente xt2-xt1t2-t1 entre las diferencias de las posiciones sobre las diferencias de los tiempos') {
      return <Text>Usar el cociente xt₂- xt₁t₂ -t₁ entre las diferencias de las posiciones sobre las diferencias de los tiempos</Text>;
    }
    else if (respuesta === 'Usar el cociente t2-t1xt2-xt1 entre las diferencias de las posiciones sobre las diferencias de los tiempos') {
      return <Text>Usar el cociente t₂ - t₁xt₂ - xt₁ entre las diferencias de las posiciones sobre las diferencias de los tiempos</Text>;
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
      )
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
    }
    if(respuesta.includes('Derivar la función aceleración y evaluarla en t=4')){
      return <Text>Derivar la función aceleración y evaluarla en t=4</Text>
    }
    if(respuesta.includes('Derivar la función velocidad y evaluarla en t=4')){
      return <Text>Derivar la función velocidad y evaluarla en t=4</Text>
    }
    if(respuesta.includes('Derivar la función posición y evaluarla en t=4')){
      return <Text>Derivar la función posición y evaluarla en t=4</Text>
    }
    if(respuesta.includes('Derivar la función tiempo y evaluarla en t=4')){
      return <Text>Derivar la función tiempo y evaluarla en t=4</Text>
    }
    if(respuesta.includes('Obteniendo el valor de x del vértice de la parábola de la siguiente manera -4000/2')){
      return <Text>Obteniendo el valor de x del vertice de la parabola de la siguiente manera -4000/2</Text>
    }
    else if (respuesta === 'Derivando la expresión 2A-8192/A^2, evaluando el punto critico A=16 en la derivada encontrada y chequeando que el valor dado sea positivo.') {
      return (
        <>
         <Text>Derivando la expresión 2A-8182/A² , evaluando el punto crítico A=16 en la derivada encontrada y chequeando que el valor dado sea positivo </Text>
        </>
      );
    } else if (respuesta === 'Derivando la expresión 2A-8192/A^2, evaluando el punto crítico A=16 en la derivada encontrada y chequeando que el valor dado sea negativo.') {
      return (
        <>
          <Text>Derivando la expresión 2A-8192/A², evaluando el punto crítico A=16 en la derivada encontrada y chequeando que el valor dado sea negativo.</Text>
        </>
      );
    } else if (respuesta === 'Derivando la expresión A^2+8192/A, evaluando el punto crítico A=16 en la derivada encontrada y chequeando que el valor dado sea positivo') {
      return (
        <>
          <Text>Derivando la expresión A²+8192/A, evaluando el punto crítico A=16 en la derivada encontrada y chequeando que el valor dado sea positivo</Text>
        </>
      );
    } else if (respuesta === 'Derivando la expresión A^2+8192/A, evaluando el punto crítico A=16 en la derivada encontrada y chequeando que el valor dado sea negativo.') {
      return (
        <>
          <Text>Derivando la expresión A²+8192/A, evaluando el punto crítico A=16 en la derivada encontrada y chequeando que el valor dado sea negativo.</Text>
        </>
      );
    }


    
    // Verificar si la respuesta contiene texto seguido de ecuación
    const hasTextAndEquation = respuesta.match(/(.*)(ecuación)(.*)/);
    
    if (hasTextAndEquation) {
      // Extraer el texto y la ecuación por separado
      const textPart = hasTextAndEquation[1].trim(); // El texto antes de 'ecuación'
      const equationPart = hasTextAndEquation[3].trim(); // La ecuación después de 'ecuación'
      const formattedEquationPart = formatEquation(equationPart);
  
      return (
        <>
          <Text style={styles.questionText2}>{`${textPart} ecuación `}</Text>
          <Text style={styles.questionEquation}>{formattedEquationPart}</Text>
        </>
      );
    } else if (respuesta.includes('^') || respuesta.includes('/') || respuesta.includes('=')) {
      // Si es puramente una ecuación matemática, formatear toda la respuesta
      return <Text style={styles.questionEquation}>{formatEquation(respuesta)}</Text>;
    } else {
      // Si no es una ecuación, renderizar como texto normal
      return <Text>{respuesta}</Text>;
    }
  };
  
  
  
  const renderFeedbackInfo = (feedback) => {
    if (!feedback || !feedback.respuestasPorFase) {
      return null;
    }

    try {
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
       <Text key={`respuesta_${respuestaIdx}`} 
       style={styles.answerText}
       numberOfLines={7}
       ellipsizeMode='tail'
       >
      {renderMathOrTextForFeedback(respuesta, respuestaIdx)}
     </Text>
              ))}
              {pregunta.respuestaSeleccionada !== undefined && (
              <View style={styles.selectedAnswerContainer}>
                <Text style={styles.selectedAnswerText}>
                  Respuesta Seleccionada:{' '}
                  {pregunta.respuestasPosibles[pregunta.respuestaSeleccionada]}
                </Text>
              </View>
            )}
            {pregunta.esCorrecta !== undefined && (
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
            )}
            </View>
          ))}
        </View>
      );
    });
      
    } catch (error) {
      console.error('Error al renderizar la retroalimentación:', error);
      
    }

  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.feedbackContainer}>
        <Text style={styles.headerText}>Has finalizado y esta es tu retroalimentación. Recuerda que puedes volver a intentarlo</Text>
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
  questionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
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
    fontSize: 18,
    color: '#333', // Color oscuro para texto normal
    marginVertical: 8, // Espaciado vertical para las respuestas
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
    questionEquation: {
    fontSize: 18,
    color: '#333',
    
  },
  questionText2: {
    fontSize: 18,
    marginBottom: 5, // Espacio entre la pregunta y la respuesta
    color: '#173753',
  },
  image: {
    marginHorizontal: 5,
  },
});

export default FeedbackScreen;
