import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const images = [
  require('../assets/uva.webp'),
  require('../assets/maca.webp'),
  require('../assets/banana.avif'),
];

export default function OnboardingBemVindo() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Swiper
        autoplay
        autoplayTimeout={3}
        loop
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        style={styles.swiper}
      >
        {images.map((img, index) => (
          <View key={index} style={styles.slide}>
            <Image source={img} style={styles.image} resizeMode="cover" />
          </View>
        ))}
      </Swiper>

      <View style={styles.bottomContent}>
        <Text style={styles.titulo}>BEM-VINDO(A)</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  swiper: {
    height: '100%',
  },
  slide: {
    flex: 1,
  },
  image: {
    width: width,
    height: height,
  },
  bottomContent: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    paddingHorizontal: 30,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  titulo: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitulo: {
    textAlign: 'center',
    fontSize: 14,
    color: '#fff',
    marginBottom: 20,
    lineHeight: 20,
  },
  botao: {
    backgroundColor: '#f57c00',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 40,
    elevation: 3,
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
