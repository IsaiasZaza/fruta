// PedidoConfirmadoScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function PedidoConfirmadoScreen() {
  const navigation = useNavigation<any>();
  const numeroPedido = '12345678';
  const previsaoEntrega = '15:30';

  return (
    <View style={styles.container}>
      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.logoTexto}>ECO FRUTI</Text>
      </View>

      {/* Mensagem */}
      <Text style={styles.confirmado}>SEU PEDIDO</Text>
      <Text style={styles.confirmado}>FOI CONFIRMADO!</Text>

      <Text style={styles.detalhe}>NÚMERO DO PEDIDO: {numeroPedido}</Text>
      <Text style={styles.detalhe}>PREVISÃO DE ENTREGA: {previsaoEntrega}</Text>

      {/* Botões */}
      <TouchableOpacity style={styles.botaoResumo}>
        <Text onPress={() => navigation.navigate('ResumoDoPedido')} style={styles.botaoResumoTexto}>RESUMO DO SEU PEDIDO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoAcompanhar}>
        <Text style={styles.botaoAcompanharTexto}>ACOMPANHAR SEU PEDIDO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 40,
    height: 40,
  },
  logoTexto: {
    fontWeight: 'bold',
    marginTop: 4,
    color: '#2e7d32',
  },
  confirmado: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
  },
  detalhe: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    textAlign: 'center',
  },
  botaoResumo: {
    backgroundColor: '#eee',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 2,
  },
  botaoResumoTexto: {
    color: '#333',
    fontWeight: 'bold',
  },
  botaoAcompanhar: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 20,
    marginTop: 15,
  },
  botaoAcompanharTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
