import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';

import Situacion1RazonDeCambio from '../Situaciones/RazonDeCambio-situacion1';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpGeneralScreen from '../screens/Auth/SignUpGeneralScreen';
import SignUpStudent from '../screens/Auth/SignUpStudent';
import SignUpTeacher from '../screens/Auth/SignUpTeacher';
import EstudiemosOptimizacion from '../screens/Estudiemos-optimizacion';
import EstudiemosRazonDeCambio from '../screens/Estudiemos-razon-de-cambio';
import Experimentemos from '../screens/Experimentos';
import FeedbackScreen from '../screens/FeedbackScreen';
import Recordemos from '../screens/Recordemos';
import Temas from '../screens/Temas';
import Perfil from '../screens/Perfil';
import Situacion2RazonDeCambio from '../Situaciones/RazonDeCambio-situacion2';
import TermsAndConditions from '../screens/TermsAndConditions';
import FirstScreen from '../screens/first-screen';

export type RootStackParamList = {
  FirstScreen: undefined;
  LoginScreen: undefined;
  SignUpGeneralScreen: undefined;
  SignUpStudent: undefined;
  SignUpTeacher: undefined;
  Temas: undefined;
  Recordemos: undefined;
  EstudiemosRazonDeCambio: { situacionCompletada?: boolean };
  EstudiemosOptimizacion: undefined;
  Situacion1RazonDeCambio: undefined;
  TermsAndConditions: undefined;
  Experimentos: undefined;
  FeedbackScreen: undefined;
  Situacion2RazonDeCambio: undefined;
  Perfil: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen">
        <Stack.Screen name="FirstScreen" component={FirstScreen} />
        <Stack.Screen name="SignUpGeneralScreen" component={SignUpGeneralScreen} />
        <Stack.Screen name="SignUpStudent" component={SignUpStudent} />
        <Stack.Screen name="SignUpTeacher" component={SignUpTeacher} />
        <Stack.Screen name="Temas" component={Temas} />
        <Stack.Screen name="Recordemos" component={Recordemos} />
        <Stack.Screen name="EstudiemosRazonDeCambio" component={EstudiemosRazonDeCambio} />
        <Stack.Screen name="EstudiemosOptimizacion" component={EstudiemosOptimizacion} />
        <Stack.Screen name="Situacion1RazonDeCambio" component={Situacion1RazonDeCambio} />
        <Stack.Screen name="TermsAndConditions" component={TermsAndConditions} />
        <Stack.Screen name="Experimentos" component={Experimentemos} />
        <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
        <Stack.Screen name="Situacion2RazonDeCambio" component={Situacion2RazonDeCambio} />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <View className={styles.backButton}>
                <Feather name="chevron-left" size={16} color="#007AFF" />
                <Text className={styles.backButtonText} onPress={navigation.goBack}>
                  Back
                </Text>
              </View>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  backButton: 'flex-row',
  backButtonText: 'text-blue-500 ml-1',
};
