import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;


export default function LoginScreen(): JSX.Element {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const handleLogin = () => {
    // Aqui você pode colocar a lógica de validação de login
    // Se for bem-sucedido:
    navigation.navigate('Catalogo');
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* Logo e título */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')} // Substitua com o caminho correto da imagem
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>ECO FRUTI</Text>
      </View>

      {/* Título da tela */}
      <Text style={styles.loginTitle}>ENTRAR COM E-MAIL E SENHA</Text>

      {/* Inputs */}
      <TextInput
        placeholder="ex.: exemplo@mail.com"
        placeholderTextColor="#999"
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Adicione sua senha"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
      />

      {/* Redefinir senha */}
      <TouchableOpacity style={styles.forgotButton}>
        <Text style={styles.forgotText}>REDEFINIR SENHA</Text>
      </TouchableOpacity>

      {/* Botão de Entrar */}
      <TouchableOpacity style={styles.loginButton}>
        <Text onPress={handleLogin} style={styles.loginButtonText}>ENTRAR</Text>
      </TouchableOpacity>

      {/* Botão de cadastro */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('PersonalData')}
      >
        <Text style={styles.registerText}>NÃO TEM UMA CONTA? CADASTRE-SE</Text>
      </TouchableOpacity>

      {/* Rodapé */}
      <Text style={styles.footerText}>
        Feito com muito <Text style={styles.heart}>❤️</Text> para você.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
    marginTop: -50,
  },
  logo: {
    width: 80,
    height: 80,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 5,
  },
  loginTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 45,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  forgotButton: {
    alignSelf: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: '#000',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  loginButton: {
    width: '100%',
    height: 45,
    backgroundColor: '#2e7d32',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerButton: {
    width: '100%',
    height: 45,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#2e7d32',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    color: '#2e7d32',
    fontWeight: 'bold',
    fontSize: 12,
  },
  footerText: {
    position: 'absolute',
    bottom: 10,
    fontSize: 12,
    color: '#555',
  },
  heart: {
    color: 'red',
  },
});
