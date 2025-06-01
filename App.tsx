import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import PersonalDataScreen from './screens/PersonalDataScreen';
import AddressScreen from './screens/AddressScreen';
import SplashScreen from './screens/SplashScreen';
import CatalogoScreen from './screens/CatalogoScreen'; // 👈 Importação


export type RootStackParamList = {
    Splash: undefined;
  Login: undefined;
  PersonalData: undefined;
  Address: undefined;
  Catalogo: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
  <Stack.Screen name="Splash" component={SplashScreen} />
  <Stack.Screen name="Login" component={LoginScreen} />
  <Stack.Screen name="PersonalData" component={PersonalDataScreen} />
  <Stack.Screen name="Address" component={AddressScreen} />
  <Stack.Screen name="Catalogo" component={CatalogoScreen} /> 

</Stack.Navigator>

    </NavigationContainer>
  );
}
