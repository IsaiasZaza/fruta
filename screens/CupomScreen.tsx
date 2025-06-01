import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CupomScreen(): JSX.Element {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>CUPOM</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        <Ionicons name="pricetag-outline" size={60} color="#fff" style={styles.icon} />
        <Text style={styles.discountText}>12%</Text>
        <Text style={styles.subtitle}>NA SUA 1ª COMPRA SEM VALOR MÍNIMO</Text>
        <View style={styles.couponBox}>
          <Text style={styles.couponLabel}>CUPOM</Text>
          <Text style={styles.couponCode}>FRUTISALE12</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>FAZER COMPRAS</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff8c00',
  },
  header: {
    backgroundColor: '#006400',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 14,
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  icon: {
    marginBottom: 10,
  },
  discountText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
  },
  couponBox: {
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 6,
    overflow: 'hidden',
    elevation: 3,
  },
  couponLabel: {
    backgroundColor: '#2e7d32',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 14,
    fontWeight: 'bold',
  },
  couponCode: {
    color: '#000',
    fontWeight: 'bold',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#2e7d32',
    paddingHorizontal: 40,
    paddingVertical: 12,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
