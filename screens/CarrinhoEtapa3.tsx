import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCarrinho } from '../CarrinhoContext';
import { Ionicons } from '@expo/vector-icons';

export default function CarrinhoEtapa3() {
  const navigation = useNavigation<any>();
  const { carrinho } = useCarrinho();

  const total = carrinho.reduce(
    (acc, item) => acc + item.price * item.quantidade,
    0
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Ionicons name="checkmark-done-circle" size={28} color="#2e7d32" />
        <Text style={styles.titulo}>Finalize sua compra</Text>
      </View>

      <View style={styles.resumoBox}>
        <Text style={styles.resumoLabel}>Total do Pedido:</Text>
        <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
      </View>

      <View style={styles.cupomBox}>
        <Text style={styles.cupomTitulo}>🎁 Cupom aplicado</Text>
        <Text style={styles.cupomCodigo}>FRUITSALE12</Text>
      </View>

      <Text style={styles.subtitulo}>Escolha a forma de pagamento</Text>

      <View style={styles.pagamentos}>
        <TouchableOpacity style={styles.pagamentoItem}>
          <Image source={require('../assets/pix.png')} style={styles.icon} />
          <Text style={styles.pagamentoTexto}>Pix</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pagamentoItem}>
          <Image source={require('../assets/vr.png')} style={styles.icon} />
          <Text style={styles.pagamentoTexto}>VR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pagamentoItem}>
          <Image source={require('../assets/cartao.png')} style={styles.icon} />
          <Text style={styles.pagamentoTexto}>Cartão</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botao}>
        <Text style={styles.botaoTexto}>FINALIZAR COMPRA</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fdfdfd',
    flexGrow: 1,
    alignItems: 'center',
    marginTop: 45, 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  resumoBox: {
    backgroundColor: '#e8f5e9',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
  },
  resumoLabel: {
    fontSize: 16,
    color: '#333',
  },
  total: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1b5e20',
    marginTop: 4,
  },
  cupomBox: {
    backgroundColor: '#fff3e0',
    padding: 16,
    borderRadius: 12,
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffe0b2',
  },
  cupomTitulo: {
    fontWeight: 'bold',
    color: '#ff9800',
    marginBottom: 6,
  },
  cupomCodigo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ef6c00',
  },
  subtitulo: {
    alignSelf: 'flex-start',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  pagamentos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 30,
  },
  pagamentoItem: {
    alignItems: 'center',
  },
  pagamentoTexto: {
    fontSize: 14,
    marginTop: 6,
    color: '#444',
  },
  icon: {
    width: 50,
    height: 50,
  },
  botao: {
    backgroundColor: '#2e7d32',
    paddingVertical: 16,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
