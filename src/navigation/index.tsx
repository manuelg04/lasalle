import { Feather } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';

import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpGeneralScreen from '../screens/Auth/SignUpGeneralScreen';
import SignUpStudent from '../screens/Auth/SignUpStudent';
import SignUpTeacher from '../screens/Auth/SignUpTeacher';
import EstudiemosOptimizacion from '../screens/Estudiemos-optimizacion';
import EstudiemosRazonDeCambio from '../screens/Estudiemos-razon-de-cambio';
import Recordemos from '../screens/Recordemos';
import Temas from '../screens/Temas';
import FirstScreen from '../screens/first-screen';

export type RootStackParamList = {
  FirstScreen: undefined;
  LoginScreen: undefined;
  SignUpGeneralScreen: undefined;
  SignUpStudent: undefined;
  SignUpTeacher: undefined;
  Temas: undefined;
  Recordemos: undefined;
  EstudiemosRazonDeCambio: undefined;
  EstudiemosOptimizacion: undefined;
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
