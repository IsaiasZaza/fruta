import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCarrinho } from '../CarrinhoContext';

export default function ResumoDoPedidoScreen() {
  const navigation = useNavigation<any>();
  const { carrinho } = useCarrinho();
  const route = useRoute<any>();
  const desconto = route.params?.desconto ?? 0;


  const totalBruto = carrinho.reduce((acc, item) => acc + item.price * (item.quantidade || 1), 0);


  const totalComDesconto = Math.max(0, totalBruto - desconto);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>RESUMO DO SEU PEDIDO</Text>

      <View style={styles.infoContainer}>
        <Text style={styles.info}>Pedido Nº: <Text style={styles.destaque}>#{Math.floor(Math.random() * 1000000)}</Text></Text>
        <Text style={styles.info}>Entrega prevista: <Text style={styles.destaque}>15:30</Text></Text>
        <Text style={styles.info}>Pagamento: <Text style={styles.destaque}>Pix</Text></Text>
      </View>

      <FlatList
        data={carrinho}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.imagem} />
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.itemNome}>{item.nome}</Text>
              <Text style={styles.itemQtd}>
                {item.quantidade || 1}x R$ {item.price.toFixed(2)}
              </Text>
            </View>
          </View>
        )}
      />

      {desconto > 0 && (
        <Text style={styles.desconto}>Desconto aplicado: R$ {desconto.toFixed(2)}</Text>
      )}

      <Text style={styles.total}>TOTAL: R$ {totalComDesconto.toFixed(2)}</Text>

      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('PedidoConfirmado')}
      >
        <Text style={styles.botaoTexto}>VOLTAR PARA INÍCIO</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    marginTop: 45,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoContainer: {
    marginBottom: 20,
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
  },
  destaque: {
    fontWeight: 'bold',
    color: '#2e7d32',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
  },
  imagem: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  itemNome: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  itemQtd: {
    fontSize: 13,
    color: '#555',
  },
  desconto: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d32f2f',
    textAlign: 'right',
    marginTop: 8,
  },
  total: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 10,
    color: '#000',
  },
  botao: {
    marginTop: 30,
    backgroundColor: '#2e7d32',
    padding: 14,
    borderRadius: 20,
  },
  botaoTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
