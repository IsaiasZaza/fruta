// OnboardingTermos.tsx
import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function OnboardingTermos() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>TERMOS DE USO E POLÍTICA DE PRIVACIDADE</Text>

      <Text style={styles.texto}>
        1. Este aplicativo é fornecido pela ECO FRUTI com o objetivo de facilitar a comunicação, gestão e experiência dos usuários com nossos serviços.{'\n\n'}

        2. Coletamos dados mínimos e necessários como nome, telefone, localização e preferências, com o único intuito de melhorar sua experiência, garantir a segurança da plataforma e oferecer conteúdos relevantes.{'\n\n'}

        3. Seus dados são armazenados de forma segura e nunca serão compartilhados com terceiros sem seu consentimento prévio, exceto em caso de exigência legal.{'\n\n'}

        4. O uso do aplicativo implica na aceitação integral destes Termos de Uso e da nossa Política de Privacidade. Caso não concorde, recomendamos não continuar com o uso do app.{'\n\n'}

        5. É de responsabilidade do usuário manter seus dados atualizados e utilizar o app de forma ética, respeitando os demais usuários e a legislação vigente.{'\n\n'}

        6. Podemos atualizar estes termos periodicamente. Notificações serão enviadas em caso de mudanças relevantes.{'\n\n'}

        Ao clicar em "CONTINUAR", você confirma que leu, compreendeu e aceita os Termos de Uso e a Política de Privacidade.
      </Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('OnboardingTipoUsuario')}
      >
        <Text style={styles.botaoTexto}>CONTINUAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'space-between',
    marginTop: 45,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  texto: {
    fontSize: 14,
    lineHeight: 24,
    color: '#333',
  },
  botao: {
    marginTop: 30,
    backgroundColor: '#2e7d32',
    padding: 14,
    borderRadius: 20,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
