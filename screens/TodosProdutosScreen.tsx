import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCarrinho } from '../CarrinhoContext';

interface Produto {
  id: string;
  nome: string;
  price: number;
  image: string;
}

export default function TodosProdutosScreen() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState('');
  const navigation = useNavigation<any>();
  const { adicionarProduto } = useCarrinho();

  useEffect(() => {
    fetch('https://f095-2804-8aa4-3e6c-2400-54-e9cb-8f4f-2e4e.ngrok-free.app/api/products')
      .then(res => res.json())
      .then(data => setProdutos(data))
      .catch(err => console.error(err));
  }, []);

  const renderItem = ({ item }: { item: Produto }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        adicionarProduto(item);
        navigation.navigate('Carrinho');
      }}
    >
      <Image source={{ uri: item.image }} style={styles.imagem} />
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.preco}>R$ {item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.titulo}>Todos os Produtos</Text>
      </View>

      <View style={styles.campoBusca}>
        <Ionicons name="search" size={20} color="#888" style={{ marginRight: 6 }} />
        <TextInput
          placeholder="Buscar produto..."
          placeholderTextColor="#999"
          value={busca}
          onChangeText={setBusca}
          style={styles.input}
        />
      </View>

      <FlatList
        data={produtos.filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()))}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  campoBusca: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
  },
  lista: {
    paddingBottom: 30,
  },
  card: {
    flex: 1,
    margin: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  imagem: {
    width: 80,
    height: 80,
    marginBottom: 8,
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 13,
    textAlign: 'center',
  },
  preco: {
    color: '#2e7d32',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 14,
  },
});
