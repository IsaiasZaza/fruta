import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCarrinho } from '../CarrinhoContext';

export default function CarrinhoEtapa1() {
  const navigation = useNavigation<any>();
  const { carrinho, atualizarQuantidade } = useCarrinho();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>🛒 Meu Carrinho</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={26} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Faixa de Frete */}
      <View style={styles.faixaFrete}>
        <Ionicons name="car" size={18} color="#000" />
        <Text style={styles.faixaTexto}>Faltam R$ 99,00 para frete grátis!</Text>
      </View>

      {/* Lista de Itens */}
      {carrinho.map((item) => (
        <View key={item.id} style={styles.itemCard}>
          <Image source={{ uri: item.image }} style={styles.itemImage} />
          <View style={styles.itemInfo}>
            <Text style={styles.itemNome}>{item.nome}</Text>
            <Text style={styles.itemPreco}>R$ {item.price.toFixed(2)}</Text>

            <View style={styles.quantidadeContainer}>
              <TouchableOpacity
                onPress={() =>
                  atualizarQuantidade(item.id, item.quantidade - 1)
                }
                style={styles.botaoQtd}
              >
                <Text style={styles.qtdTexto}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtd}>{item.quantidade}</Text>
              <TouchableOpacity
                onPress={() =>
                  atualizarQuantidade(item.id, item.quantidade + 1)
                }
                style={styles.botaoQtd}
              >
                <Text style={styles.qtdTexto}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      {/* Botão de Próximo */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('CarrinhoEtapa2')}
      >
        <Text style={styles.botaoTexto}>PRÓXIMO</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fdfdfd',
    marginTop: 45,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
  },
  faixaFrete: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1efe9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 24,
  },
  faixaTexto: {
    marginLeft: 10,
    fontWeight: '500',
    fontSize: 14,
    color: '#444',
  },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    elevation: 2, // sombra Android
    shadowColor: '#000', // sombra iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: 'center',
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemNome: {
    fontWeight: '600',
    fontSize: 16,
    color: '#333',
  },
  itemPreco: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  quantidadeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  botaoQtd: {
    backgroundColor: '#e0e0e0',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  qtdTexto: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  qtd: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  botao: {
    backgroundColor: '#2e7d32',
    paddingVertical: 16,
    borderRadius: 30,
    marginTop: 30,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
