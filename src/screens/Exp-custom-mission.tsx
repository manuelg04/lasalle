/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { RootStackParamList } from '../navigation';

type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'ExpCustomMission'>;

const RadioButton = ({ isSelected, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.radioButton}>
    {isSelected ? <View style={styles.radioButtonSelected} /> : null}
  </TouchableOpacity>
);

const ExpCustomMission = () => {
  const navigation = useNavigation<OverviewScreenNavigationProps>();
  // Estado para manejar las respuestas seleccionadas por el usuario
  const [selectedOptions, setSelectedOptions] = useState({});
  const route = useRoute();
  const { problemText }: any = route.params;
  console.log('🚀 ~ problemText:', problemText);
  // Parsea el texto del problema tan pronto como se recibe

  const handleSelectOption = (questionId, optionIndex) => {
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [questionId]: optionIndex,
    }));
  };

  useEffect(() => {
    console.log('Respuestas seleccionadas:', selectedOptions);
  }, [selectedOptions]);


  const handleSubmit = async () => {
    try {
      // Suponiendo que tienes una manera de obtener el studentId, posiblemente de los props, el estado global o almacenamiento local
      const studentId = await AsyncStorage.getItem('studentId');
      
      // Recopilar datos de las preguntas con las respuestas seleccionadas
      const answeredQuestions = missionData.questions.map((question, index) => {
        const questionNumber = index + 1;
        const selectedOptionIndex = selectedOptions[questionNumber];
        const isCorrect =
          selectedOptionIndex !== undefined &&
          selectedOptionIndex === question.correctOption;

        return {
          ...question,
          selectedOption: selectedOptionIndex,
          isCorrect,
        };
      });
      console.log('🚀 ~ answeredQuestions:', answeredQuestions);
      // Obtener la fecha y hora actual en formato ISO 8601
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      const postData = {
        studentId,
        missionName: missionData.name,
        context: missionData.context,
        questions: answeredQuestions,
        sentDate: formattedDate,
      };
      console.log("🚀 ~ postData:", postData)

      // Realizar la petición POST con axios
      const response = await axios.post(
        'https://lasalleapp.onrender.com/save/saveMissionResponse',
        postData
      );
      // Verificar si la respuesta es exitosa
      if (response.status === 201) {
        console.log('Respuesta guardada con éxito:', response.data);
        const currentMissionName = await AsyncStorage.getItem('currentMissionName');
        // Guardar el nombre de la misión actual como la misión anterior en AsyncStorage
        await AsyncStorage.setItem('previousMissionName', currentMissionName || '');
        // Extraer los datos de retroalimentación de la respuesta
        const feedbackData = response.data.data;
        // Aquí podrías realizar acciones como navegar a otra pantalla o mostrar un mensaje de éxito
        Alert.alert('Éxito', 'Misión finalizada con éxito');
        navigation.navigate('FeedbackExperimentemos', {
          studentId,
          missionName: missionData.name,
          missionStatement: currentMissionName,
          feedbackData,
        });
      } else {
        // Manejar las respuestas que no son código 201
        console.log('Respuesta recibida, pero con un código de estado diferente:', response.status);
      }
    } catch (error) {
      // Manejar el error aquí
      console.error('Error al guardar la respuesta:', error.response.data);
      // Mostrar un mensaje de error al usuario, si es necesario
    }
  };

  const parseProblemText = (text) => {
    const { correctAnswers }: any = route.params;
    console.log('🚀 ~ correctAnswers:', correctAnswers);
    const lines = text
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line);

    let missionName = '';
    let missionContext = '';
    const questions = [];
    let currentPhase = '';
    let currentQuestion = null;
    let questionIndex = 0;
    let isContextContinuation = false;

    // Parsear las respuestas correctas en un objeto
    const correctAnswersMap = {};
    correctAnswers.split('\n').forEach((line) => {
      const match = line.match(/Pregunta (\d+)\. es la ([A-D])/);
      if (match) {
        const questionNumber = match[1];
        const correctAnswer = match[2].charCodeAt(0) - 65;
        correctAnswersMap[`Pregunta ${questionNumber}`] = correctAnswer;
      }
    });

    lines.forEach((line) => {
      if (line.startsWith('Nombre de la misión:')) {
        missionName = line.substring('Nombre de la misión:'.length).trim();
      } else if (line.startsWith('Contexto:')) {
        missionContext = line.substring('Contexto:'.length).trim();
        isContextContinuation = true;
      } else if (isContextContinuation && !line.startsWith('FASE.')) {
        missionContext += ' ' + line.trim();
      } else if (line.startsWith('FASE.')) {
        currentPhase = line.substring('FASE.'.length).trim();
        isContextContinuation = false;
      } else if (line.startsWith('Pregunta') && line.includes(':')) {
        if (currentQuestion) {
          questions.push(currentQuestion);
        }
        const questionParts = line.split(':');
        questionIndex++;
        if (questionParts.length >= 2) {
          currentQuestion = {
            phase: currentPhase,
            text: questionParts[0].trim() + ': ' + questionParts[1].trim(),
            options: [],
            correctOption: null,
          };
        }
      } else if (line.match(/^[a-d]\)/)) {
        currentQuestion?.options.push(line.trim());
      }
    });

    if (currentQuestion) {
      questions.push(currentQuestion);
    }

    questions.forEach((question) => {
      const questionNumber = question.text.match(/Pregunta (\d+):/)[1];
      if (correctAnswersMap.hasOwnProperty(`Pregunta ${questionNumber}`)) {
        const correctAnswer = correctAnswersMap[`Pregunta ${questionNumber}`];
        question.correctOption = correctAnswer;
      }
    });

    return { name: missionName, context: missionContext.trim(), questions, correctAnswers };
  };

  const missionData = parseProblemText(problemText);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.missionName}>{missionData.name}</Text>
        <View style={styles.missionContextContainer}>
          <Text style={styles.missionContext}>{missionData.context}</Text>
        </View>
        {missionData.questions.map((question, questionIndex) => (
          <View key={questionIndex} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question.text}</Text>
            {question.options.map((option, optionIndex) => (
              <TouchableOpacity
                key={optionIndex}
                style={styles.optionContainer}
                onPress={() => handleSelectOption(questionIndex + 1, optionIndex)}>
                <RadioButton isSelected={selectedOptions[questionIndex + 1] === optionIndex} />
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Completar Misión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E7EB',
  },
  content: {
    padding: 16,
    width: '100%',
  },
  missionName: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#000',
    marginBottom: 8,
  },
  missionContext: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  questionContainer: {
    marginBottom: 20,
    padding: 10,
  },
  questionText: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    flexShrink: 1,
    backgroundColor: '#FFFFFF', // Fondo claro para las opciones
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    fontSize: 15,
    flexShrink: 1,
  },
  submitButton: {
    backgroundColor: '#34eb37', // Considera un verde menos brillante
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000', // Sombra para el botón de enviar
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioButtonSelected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  missionContextContainer: {
    width: '100%',
  },
});

export default ExpCustomMission;
