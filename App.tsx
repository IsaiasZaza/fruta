import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import PersonalDataScreen from './screens/PersonalDataScreen';
import AddressScreen from './screens/AddressScreen';
import SplashScreen from './screens/SplashScreen';
import CatalogoScreen from './screens/CatalogoScreen';
import CupomScreen from './screens/CupomScreen';
import CarrinhoScreen from './screens/CarrinhoScreen';
import { CarrinhoProvider } from './CarrinhoContext';
import CarrinhoEtapa1 from './screens/CarrinhoEtapa1';
import CarrinhoEtapa2 from './screens/CarrinhoEtapa2';
import CarrinhoEtapa3 from './screens/CarrinhoEtapa3';
import TodosProdutosScreen from './screens/TodosProdutosScreen';
import PedidoConfirmadoScreen from './screens/PedidoConfirmadoScreen';
import ResumoDoPedidoScreen from './screens/ResumoDoPedidoScreen';
import OnboardingBemVindo from './screens/OnboardingBemVindo';
import OnboardingTermos from './screens/OnboardingTermos';
import OnboardingTipoUsuario from './screens/OnboardingTipoUsuario';
import OnboardingUpdateScreen from './screens/OnboardingUpdateScreen';
import ChatScreen from './screens/ChatScreen';
import NotificationScreen from './screens/NotificationScreen';

export type RootStackParamList = {
  Splash: undefined;
  OnboardingBemVindo: undefined;
  OnboardingTermos: undefined;
  OnboardingTipoUsuario: undefined;
  OnboardingUpdateScreen: undefined;
  Login: undefined;
  PersonalData: undefined;
  Address: undefined;
  Catalogo: undefined;
  Carrinho: undefined;
  Cupom: undefined;
  CarrinhoEtapa1: undefined;
  CarrinhoEtapa2: undefined;
  CarrinhoEtapa3: undefined;
  TodosProdutos: undefined;
  PedidoConfirmado: undefined;
  ResumoDoPedido: undefined;
  Chat: undefined;
  NotificationScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <CarrinhoProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="OnboardingBemVindo" component={OnboardingBemVindo} />
          <Stack.Screen name="OnboardingTermos" component={OnboardingTermos} />
          <Stack.Screen name="OnboardingTipoUsuario" component={OnboardingTipoUsuario} />
          <Stack.Screen name="OnboardingUpdateScreen" component={OnboardingUpdateScreen} />

          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="PersonalData" component={PersonalDataScreen} />
          <Stack.Screen name="Address" component={AddressScreen} />
          <Stack.Screen name="Catalogo" component={CatalogoScreen} />
          <Stack.Screen name="Cupom" component={CupomScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Carrinho" component={CarrinhoScreen} />
          <Stack.Screen name="CarrinhoEtapa1" component={CarrinhoEtapa1} />
          <Stack.Screen name="CarrinhoEtapa2" component={CarrinhoEtapa2} />
          <Stack.Screen name="CarrinhoEtapa3" component={CarrinhoEtapa3} />
          <Stack.Screen name="TodosProdutos" component={TodosProdutosScreen} />
          <Stack.Screen name="PedidoConfirmado" component={PedidoConfirmadoScreen} />
          <Stack.Screen name="ResumoDoPedido" component={ResumoDoPedidoScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} />

        </Stack.Navigator>
      </NavigationContainer>
    </CarrinhoProvider>
  );
}
