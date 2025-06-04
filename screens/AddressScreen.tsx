import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import axios from 'axios';

export default function AddressScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Address'>>();
  const route = useRoute();
  const { name, email, phone, cpf, password } = route.params as RootStackParamList['Address'];

  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');

  const handleRegister = async () => {
  try {
    const response = await axios.post('https://nova-pasta-production.up.railway.app/api/register', {
      name,
      email,
      phone,
      cpf,
      senha: password,
      cep,
      street,
      number,
      complement,
    });

    Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('Login'), // ou a tela que quiser retornar
      },
    ]);
    
    // navigation.navigate('Login'); // descomente se quiser redirecionar
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // O servidor respondeu com código de erro (4xx, 5xx)
        const message = error.response.data?.message || 'Erro desconhecido do servidor.';
        Alert.alert('Erro', message);
      } else if (error.request) {
        // Requisição feita mas nenhuma resposta recebida
        Alert.alert('Erro', 'Servidor indisponível. Verifique sua conexão e tente novamente.');
      } else {
        // Erro ao configurar a requisição
        Alert.alert('Erro', 'Erro ao preparar a requisição.');
      }
    } else {
      // Erro não relacionado ao axios (outro tipo de erro)
      Alert.alert('Erro', 'Ocorreu um erro inesperado. Tente novamente.');
    }
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>ECO FRUTI</Text>
      </View>

      <Text style={styles.formTitle}>INFORME SEU ENDEREÇO</Text>

      <TextInput placeholder="CEP" keyboardType="numeric" style={styles.input} value={cep} onChangeText={setCep} />
      <TextInput placeholder="Rua" style={styles.input} value={street} onChangeText={setStreet} />
      <TextInput placeholder="Número" keyboardType="numeric" style={styles.input} value={number} onChangeText={setNumber} />
      <TextInput placeholder="Complemento" style={styles.input} value={complement} onChangeText={setComplement} />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>FINALIZAR</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Feito com muito <Text style={styles.heart}>❤️</Text> para você.</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20, justifyContent: 'center' },
  logoContainer: { alignItems: 'center', marginBottom: 20, marginTop: -50 },
  logo: { width: 80, height: 80 },
  title: { fontWeight: 'bold', fontSize: 20, marginTop: 5 },
  formTitle: { fontSize: 16, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: { backgroundColor: '#f2f2f2', padding: 12, borderRadius: 5, marginBottom: 12 },
  button: { backgroundColor: '#2e7d32', padding: 15, borderRadius: 30, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  footer: { textAlign: 'center', marginTop: 30, color: '#555', fontSize: 12 },
  heart: { color: 'red' },
});
