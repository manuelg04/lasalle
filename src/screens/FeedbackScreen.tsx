/* eslint-disable prettier/prettier */
// Pantalla de Feedback (screens/FeedbackScreen.js)

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';

import { RootStackParamList } from '../navigation';


type DetailsSreenRouteProp = RouteProp<RootStackParamList, 'LoginScreen'>;
type OverviewScreenNavigationProps = StackNavigationProp<RootStackParamList, 'EstudiemosRazonDeCambio'>;

const FeedbackScreen = ({ route }) => {
    const navigation = useNavigation<OverviewScreenNavigationProps>();
    const router = useRoute<DetailsSreenRouteProp>();
  // Obtener los datos de feedback desde los parámetros de navegación
  const { feedbackData } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.feedbackText}>{feedbackData}</Text>
      <Button
        title="Continuar Estudiando"
        onPress={() => navigation.navigate('EstudiemosRazonDeCambio')} // Asegúrate de que el nombre de la ruta es correcto
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  feedbackText: {
    fontSize: 16,
    // ... otros estilos que puedas necesitar
  },
  // ... otros estilos que puedas necesitar ...
});

export default FeedbackScreen;
