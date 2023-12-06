/* eslint-disable prettier/prettier */
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const FeedbackScreen = ({ route }) => {
    const navigation = useNavigation();
    const { feedbackData } = route.params;

    // Función para añadir estilos a cada tipo de línea
    const renderFeedbackText = (text) => {
      return text.split('\n\n').map((paragraph, index) => {
        let lines = paragraph.split('\n');
        let firstLine = lines.shift(); // Separamos la pregunta del resto del párrafo
    
        let questionStyle = firstLine.includes('incorrecta') ? styles.incorrectFeedback : styles.correctFeedback;
        let iconName = firstLine.includes('incorrecta') ? 'close-circle-outline' : 'checkmark-circle-outline';
        let iconColor = firstLine.includes('incorrecta') ? '#D32F2F' : '#388E3C';
    
        return (
          <View key={`feedback_paragraph_${index}`} style={styles.feedbackParagraph}>
            <View style={styles.feedbackLine}>
              <Ionicons name={iconName} size={20} color={iconColor} style={styles.icon} />
              <Text style={questionStyle}>{firstLine}</Text>
            </View>
            <Text style={styles.feedbackText}>{lines.join('\n')}</Text>
          </View>
        );
      });
    };
    
    return (
        <ScrollView style={styles.container}>
            <View style={styles.feedbackContainer}>
                <Text style={styles.headerText}>Retroalimentación</Text>
                {renderFeedbackText(feedbackData)}
                <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
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
      flex: 1, // Permite que el texto ocupe el espacio restante.
      fontSize: 16,
      color: '#555',
      lineHeight: 24,
      marginRight: 10,
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
      fontWeight: 'bold',
      fontSize: 18,
      marginTop: 20,
      color: '#173753', // Un azul oscuro para mayor formalidad
    },
    correctFeedback: {
      fontSize: 16,
      color: '#388E3C', // Un verde oscuro para mejor legibilidad
      marginLeft: 10,
      marginBottom: 10,
    },
    incorrectFeedback: {
      fontSize: 16,
      color: '#D32F2F', // Un rojo oscuro para mejor legibilidad
      marginLeft: 10,
      marginBottom: 10,
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
});

export default FeedbackScreen;
