import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCarrinho } from '../CarrinhoContext';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function CarrinhoEtapa2() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const desconto = route.params?.desconto ?? 0;
  const { carrinho } = useCarrinho();
  const [opcao, setOpcao] = useState<'RETIRADA' | 'ENTREGA' | null>(null);

  const subtotal = carrinho.reduce((acc, item) => acc + item.price * item.quantidade, 0);
  const totalComDesconto = Math.max(0, subtotal - desconto);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>🚚 Escolha como receber seu pedido</Text>

      {/* Resumo do carrinho */}
      <View style={styles.resumoContainer}>
        {carrinho.map((item) => (
          <View key={item.id} style={styles.produtoCard}>
            <Image source={{ uri: item.image }} style={styles.imagemProduto} />
            <View style={{ flex: 1 }}>
              <Text style={styles.nomeProduto}>{item.nome}</Text>
              <Text style={styles.infoProduto}>Qtd: {item.quantidade}</Text>
              <Text style={styles.infoProduto}>R$ {(item.price * item.quantidade).toFixed(2)}</Text>
            </View>
          </View>
        ))}

        <Text style={styles.total}>Subtotal: R$ {subtotal.toFixed(2)}</Text>

        {desconto > 0 && (
          <Text style={{ color: 'green', fontWeight: 'bold', textAlign: 'right', marginBottom: 8 }}>
            Você economizou: R$ {desconto.toFixed(2)}
          </Text>
        )}

        <Text style={[styles.total, { fontSize: 18 }]}>Total: R$ {totalComDesconto.toFixed(2)}</Text>
      </View>

      {/* Opções de entrega */}
      <TouchableOpacity
        style={[
          styles.opcaoCard,
          opcao === 'RETIRADA' && styles.opcaoSelecionada,
        ]}
        onPress={() => setOpcao('RETIRADA')}
      >
        <Ionicons name="storefront" size={24} color={opcao === 'RETIRADA' ? '#fff' : '#333'} />
        <Text style={[styles.opcaoTexto, opcao === 'RETIRADA' && { color: '#fff' }]}>Retirar na loja</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.opcaoCard,
          opcao === 'ENTREGA' && styles.opcaoSelecionada,
        ]}
        onPress={() => setOpcao('ENTREGA')}
      >
        <MaterialIcons name="local-shipping" size={24} color={opcao === 'ENTREGA' ? '#fff' : '#333'} />
        <Text style={[styles.opcaoTexto, opcao === 'ENTREGA' && { color: '#fff' }]}>Entrega no endereço</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.botao, !opcao && { backgroundColor: '#aaa' }]}
        disabled={!opcao}
        onPress={() => navigation.navigate('CarrinhoEtapa3', { desconto, opcao })}
      >
        <Text style={styles.botaoTexto}>PAGAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fdfdfd',
    flexGrow: 1,
    marginTop: 45,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
    textAlign: 'center',
  },
  resumoContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  produtoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  imagemProduto: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  nomeProduto: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  infoProduto: {
    fontSize: 14,
    color: '#666',
  },
  total: {
    textAlign: 'right',
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  opcaoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eee',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  opcaoSelecionada: {
    backgroundColor: '#2e7d32',
  },
  opcaoTexto: {
    fontSize: 16,
    marginLeft: 12,
    color: '#333',
    fontWeight: '500',
  },
  botao: {
    backgroundColor: '#2e7d32',
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
