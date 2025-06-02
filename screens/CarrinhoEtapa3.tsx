import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCarrinho } from '../CarrinhoContext';
import { Ionicons } from '@expo/vector-icons';

export default function CarrinhoEtapa3() {
  const navigation = useNavigation<any>();
  const { carrinho } = useCarrinho();
  const [modalVisible, setModalVisible] = useState(false);

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

      <Text style={styles.subtitulo}>Pagamento via Pix</Text>

      <View style={styles.pagamentos}>
        <TouchableOpacity
          style={styles.pagamentoItem}
          onPress={() => setModalVisible(true)}
        >
          <Image source={require('../assets/pix.png')} style={styles.icon} />
          <Text style={styles.pagamentoTexto}>Gerar QR Code</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('PedidoConfirmado')}
      >
        <Text style={styles.botaoTexto}>FINALIZAR</Text>
      </TouchableOpacity>

      {/* MODAL PIX */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitulo}>Escaneie para pagar com Pix</Text>
            <Image
              source={require('../assets/pix.png')}
              style={styles.qrCode}
              resizeMode="contain"
            />
            <TouchableOpacity
              style={styles.fecharBotao}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.fecharTexto}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    justifyContent: 'center',
    width: '100%',
    marginBottom: 30,
  },
  pagamentoItem: {
    alignItems: 'center',
    backgroundColor: '#e8f5e9',
    padding: 20,
    borderRadius: 16,
    elevation: 3,
  },
  pagamentoTexto: {
    fontSize: 14,
    marginTop: 6,
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  icon: {
    width: 60,
    height: 60,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2e7d32',
    textAlign: 'center',
  },
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  fecharBotao: {
    backgroundColor: '#2e7d32',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  fecharTexto: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
