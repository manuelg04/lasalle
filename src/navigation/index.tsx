import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Text, View } from 'react-native';

import Situacion1Optimizacion from '../Situaciones/Optimizacion-situacion1';
import Situacion2Optimizacion from '../Situaciones/Optimizacion-situacion2';
import Situacion1RazonDeCambio from '../Situaciones/RazonDeCambio-situacion1';
import Situacion2RazonDeCambio from '../Situaciones/RazonDeCambio-situacion2';
import LoginScreen from '../screens/Auth/LoginScreen';
import ForgotPasswordScreen from '../screens/Auth/RecoverPassword';
import ResetPasswordScreen from '../screens/Auth/ResetPasswordScreen';
import SignUpGeneralScreen from '../screens/Auth/SignUpGeneralScreen';
import SignUpStudent from '../screens/Auth/SignUpStudent';
import SignUpTeacher from '../screens/Auth/SignUpTeacher';
import EstudiemosOptimizacion from '../screens/Estudiemos-optimizacion';
import EstudiemosRazonDeCambio from '../screens/Estudiemos-razon-de-cambio';
import ExpCustomMission from '../screens/Exp-custom-mission';
import Experimentemos from '../screens/Experimentos';
import FeedbackExperimentemos from '../screens/FeedBack-Experimentemos';
import FeedbackScreen from '../screens/FeedbackScreen';
import Perfil from '../screens/Perfil';
import Recordemos from '../screens/Recordemos';
import TeacherFirstScreen from '../screens/TeacherFirstScreen';
import Temas from '../screens/Temas';
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
  Experimentemos: { theme: string };
  FeedbackScreen: undefined;
  Situacion2RazonDeCambio: undefined;
  Perfil: undefined;
  Situacion1Optimizacion: undefined;
  Situacion2Optimizacion: undefined;
  ExpCustomMission: undefined;
  TeacherFirstScreen: undefined;
  FeedbackExperimentemos: undefined;
  ForgotPasswordScreen: undefined;
  ResetPasswordScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FirstScreen">
        <Stack.Screen
          name="FirstScreen"
          component={FirstScreen}
          options={{ title: 'Bienvenido' }}
        />
        <Stack.Screen
          name="SignUpGeneralScreen"
          component={SignUpGeneralScreen}
          options={{ title: 'Tipo de cuenta' }}
        />
        <Stack.Screen
          name="SignUpStudent"
          component={SignUpStudent}
          options={{ title: 'Registro Estudiante' }}
        />
        <Stack.Screen
          name="SignUpTeacher"
          component={SignUpTeacher}
          options={{ title: 'Registro Profesor' }}
        />
        <Stack.Screen name="Temas" component={Temas} />
        <Stack.Screen name="Recordemos" component={Recordemos} />
        <Stack.Screen
          name="EstudiemosRazonDeCambio"
          component={EstudiemosRazonDeCambio}
          options={{ title: 'Estudiemos' }}
        />
        <Stack.Screen
          name="EstudiemosOptimizacion"
          component={EstudiemosOptimizacion}
          options={{ title: 'Estudiemos' }}
        />
        <Stack.Screen
          name="Situacion1RazonDeCambio"
          component={Situacion1RazonDeCambio}
          options={{ title: 'Razón de cambio' }}
        />
        <Stack.Screen
          name="TermsAndConditions"
          component={TermsAndConditions}
          options={{ title: 'Terminos y condiciones' }}
        />
        <Stack.Screen
          name="Experimentemos"
          component={Experimentemos}
          initialParams={{ theme: '' }}
          options={{ title: 'Crea tu misión' }}
        />
        <Stack.Screen
          name="FeedbackScreen"
          component={FeedbackScreen}
          options={{ title: 'Retroalimentacion' }}
        />
        <Stack.Screen
          name="Situacion2RazonDeCambio"
          component={Situacion2RazonDeCambio}
          options={{ title: 'Razon de cambio' }}
        />
        <Stack.Screen name="Perfil" component={Perfil} />
        <Stack.Screen
          name="Situacion1Optimizacion"
          component={Situacion1Optimizacion}
          options={{ title: 'Optimizacion' }}
        />
        <Stack.Screen
          name="Situacion2Optimizacion"
          component={Situacion2Optimizacion}
          options={{ title: 'Optimizacion' }}
        />
        <Stack.Screen
          name="ExpCustomMission"
          component={ExpCustomMission}
          options={{ title: 'Mision personalizada' }}
        />
        <Stack.Screen
          name="FeedbackExperimentemos"
          component={FeedbackExperimentemos}
          options={{ title: 'Retroalimentacion' }}
        />
        <Stack.Screen
          name="TeacherFirstScreen"
          component={TeacherFirstScreen}
          options={{ title: 'Bienvenido' }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={({ navigation }) => ({
            title: 'Iniciar sesión',
            headerLeft: () => (
              <View style={styles.backButton}>
                <Feather name="chevron-left" size={16} color="#007AFF" />
                <Text
                  style={styles.backButtonText}
                  onPress={() => navigation.navigate('FirstScreen')}>
                  Atras
                </Text>
              </View>
            ),
          })}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
          options={{ title: 'Restablecer contraseña' }}
        />
        <Stack.Screen
          name="ResetPasswordScreen"
          component={ResetPasswordScreen}
          options={{ title: 'Restablecer contraseña' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  backButton: 'flex-row',
  backButtonText: 'text-blue-500 ml-1',
};
