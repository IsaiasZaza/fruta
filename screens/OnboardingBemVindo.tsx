import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Swiper from 'react-native-swiper';

const { width } = Dimensions.get('window');

const images = [
  require('../assets/uva.webp'),
  require('../assets/maca.webp'),
  require('../assets/banana.avif'),
];

export default function OnboardingBemVindo() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      {/* Header com logo */}
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')} // ajuste o caminho do logo
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Conteúdo principal */}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.titulo}>BEM-VINDO(A)</Text>

        {/* Card com swiper */}
        <View style={styles.card}>
          <Swiper
            autoplay
            autoplayTimeout={3}
            loop
            dotStyle={styles.dot}
            activeDotStyle={styles.activeDot}
            showsPagination
          >
            {images.map((img, index) => (
              <Image
                key={index}
                source={img}
                style={styles.cardImage}
                resizeMode="cover"
              />
            ))}
          </Swiper>
          <View style={styles.overlay}>
            <Text style={styles.subtitulo}>
              COMPRE HORTALIÇAS FRESQUINHAS, MESMO COM IMPERFEIÇÕES, DIRETO DO PRODUTOR.
            </Text>
            <TouchableOpacity
              style={styles.botao}
              onPress={() => navigation.navigate('OnboardingTermos')}
            >
              <Text style={styles.botaoTexto}>COMEÇAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    paddingTop: 40,
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 50,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
  },
  titulo: {
    fontSize: 20,
    color: '#4CAF50', // verde para combinar com o design
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    width: width * 0.95, // mais largo
    aspectRatio: 2 / 3.2, // mais alto e ovalado
    borderRadius: 92,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 16,
    alignItems: 'center',
  },
  subtitulo: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    marginBottom: 12,
    lineHeight: 18,
  },
  botao: {
    backgroundColor: '#f57c00',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  dot: {
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
});
