import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

export default function PersonalDataScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'PersonalData'>>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cpf, setCpf] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>ECO FRUTI</Text>
      </View>

      <Text style={styles.formTitle}>DIGITE SEUS DADOS PESSOAIS</Text>

      <TextInput placeholder="Nome completo" style={styles.input} value={name} onChangeText={setName} />
      <TextInput placeholder="E-mail" keyboardType="email-address" style={styles.input} value={email} onChangeText={setEmail} />
      <TextInput placeholder="Telefone" keyboardType="phone-pad" style={styles.input} value={phone} onChangeText={setPhone} />
      <TextInput placeholder="CPF" keyboardType="numeric" style={styles.input} value={cpf} onChangeText={setCpf} />
      <TextInput placeholder="Senha" secureTextEntry style={styles.input} value={password} onChangeText={setPassword} />

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Address', { name, email, phone, cpf, password })
        }
      >
        <Text style={styles.buttonText}>AVANÇAR</Text>
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
