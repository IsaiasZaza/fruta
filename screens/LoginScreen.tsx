import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function LoginScreen(): JSX.Element {
  const navigation = useNavigation<NavigationProp>();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('https://6e4d-2804-8aa4-3e6c-2400-78a2-710c-92c9-70f1.ngrok-free.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login bem-sucedido
        // Você pode salvar o token ou dados do usuário com AsyncStorage, se necessário
        navigation.navigate('Catalogo');
      } else {
        Alert.alert('Erro de login', data?.message || 'Credenciais inválidas');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível conectar ao servidor.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>ECO FRUTI</Text>
      </View>

      <Text style={styles.loginTitle}>ENTRAR COM E-MAIL E SENHA</Text>

      <TextInput
        placeholder="ex.: exemplo@mail.com"
        placeholderTextColor="#999"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Adicione sua senha"
        placeholderTextColor="#999"
        secureTextEntry
        style={styles.input}
        value={senha}
        onChangeText={setSenha}
      />

      <TouchableOpacity style={styles.forgotButton}>
        <Text style={styles.forgotText}>REDEFINIR SENHA</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>ENTRAR</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate('PersonalData')}
      >
        <Text style={styles.registerText}>NÃO TEM UMA CONTA? CADASTRE-SE</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Feito com muito <Text style={styles.heart}>❤️</Text> para você.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... mesmo estilo anterior
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
