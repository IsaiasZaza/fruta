// OnboardingTipoUsuario.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingTipoUsuario() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>ESCOLHA SEU TIPO DE USUÁRIO</Text>

      <View style={styles.botoesContainer}>
        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#2e7d32' }]}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.botaoTexto}>CLIENTE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#fb8c00' }]}
          onPress={() => navigation.navigate('OnboardingUpdateScreen')}
        >
          <Text style={styles.botaoTexto}>VENDEDOR</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botao, { backgroundColor: '#c62828' }]}
          onPress={() => navigation.navigate('OnboardingUpdateScreen')}
        >
          <Text style={styles.botaoTexto}>ENTREGADOR</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.rodape}>Feito com ♥ pela Eco Fruti</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 45,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 60,
    textAlign: 'center',
    color: '#333',
  },
  botoesContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  botao: {
    width: '80%',
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  rodape: {
    marginBottom: 20,
    fontSize: 13,
    color: '#999',
  },
});
