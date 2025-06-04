import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCarrinho } from '../CarrinhoContext'

interface Produto {
  id: string;
  nome: string;
  price: number;
  image: string;
}

export default function CatalogoScreen(): JSX.Element {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [busca, setBusca] = useState('');
  const navigation = useNavigation<any>();
  const { adicionarProduto } = useCarrinho();


  useEffect(() => {
    fetch('https://nova-pasta-production.up.railway.app/api/products')
      .then(response => response.json())
      .then(data => setProdutos(data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  const renderItem = ({ item }: { item: Produto }) => (
    <TouchableOpacity
      style={styles.produtoCard}
      onPress={() => {
        adicionarProduto(item);
        navigation.navigate('Carrinho');
      }}
    >
      <Image source={{ uri: item.image }} style={styles.produtoImagem} />
      <Text style={styles.produtoNome}>{item.nome}</Text>
      <Text style={styles.produtoPreco}>R$ {item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );


  return (
    <ScrollView style={styles.container}>
      {/* Faixa promocional */}
      <TouchableOpacity style={styles.promocaoTopo} onPress={() => navigation.navigate('Cupom')}>
        <Text style={styles.promocaoTopoTexto}>FRUTISALE12 12% NA SUA 1ª COMPRA SEM VALOR MÍNIMO</Text>
        <Text style={styles.cupomButton}>
          <Text style={styles.cupomButtonText}>Ver cupons disponíveis</Text>
        </Text>
      </TouchableOpacity>

      {/* Localização */}
      <View style={styles.localizacao}>
        <Ionicons name="location-outline" size={16} color="#555" />
        <Text style={styles.localizacaoTexto}>Informe sua localização</Text>
      </View>

      {/* Logo e ícones */}
      <View style={styles.topo}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <View style={styles.iconesTopo}>
          <Ionicons onPress={() => navigation.navigate('NotificationScreen')} name="notifications-outline" size={22} color="#000" />
          <TouchableOpacity onPress={() => navigation.navigate('Carrinho')}>
            <Ionicons name="cart-outline" size={22} color="#000" style={{ marginLeft: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Ionicons name="chatbubbles-outline" size={22} style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        </View>
      </View>


      {/* Campo de busca */}
      <View style={styles.campoBusca}>
        <Ionicons name="search" size={20} color="#888" style={{ marginRight: 5 }} />
        <TextInput
          placeholder="O que você está procurando?"
          placeholderTextColor="#999"
          style={styles.searchInput}
          value={busca}
          onChangeText={setBusca}
        />
      </View>

      {/* Promoção destacada */}
      <View style={styles.promocaoContainer}>
        <Text style={styles.promocaoTitulo}>BANANA NANICA KG</Text>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmFuYW5hfGVufDB8fDB8fHww',
          }}
          style={styles.imagemCentro}
          resizeMode="cover"
        />
      </View>


      {/* Benefícios */}
      <View style={styles.beneficiosContainer}>
        <View style={styles.beneficio}>
          <Ionicons name="checkmark-circle" size={16} color="#fff" />
          <Text style={styles.beneficioTexto}>SEM PEDIDO MÍNIMO</Text>
        </View>
        <View style={styles.beneficio}>
          <Ionicons name="car" size={16} color="#fff" />
          <Text style={styles.beneficioTexto}>FRETE GRÁTIS A PARTIR DE R$ 00,00</Text>
        </View>
      </View>

      {/* Ofertas da Semana */}
      <Text style={styles.secaoTitulo}>Ofertas da Semana</Text>
      <FlatList
        horizontal
        data={produtos.slice(0, 3)}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />

      {/* Faça sua feira */}
      <View style={styles.feiraHeader}>
        <Text style={styles.secaoTitulo}>Faça sua feira</Text>
        <Text style={styles.verTodos} onPress={() => navigation.navigate('TodosProdutos')}>
          VER TODOS
        </Text>
      </View>

      <FlatList
        data={produtos.filter(produto =>
          produto.nome.toLowerCase().includes(busca.toLowerCase())
        )}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.lista}
        scrollEnabled={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  promocaoTopo: {
    backgroundColor: '#ff8c00',
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  promocaoTopoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  cupom: {
    color: '#fff',
    fontSize: 12,
    marginTop: 2,
  },
  localizacao: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#f5f5f5',
  },
  localizacaoTexto: {
    marginLeft: 6,
    color: '#555',
  },
  cupomButton: {
    flexDirection: 'row',
    alignItems: 'center',


    marginTop: 8,
    alignSelf: 'center',
  },
  cupomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginTop: 10,
  },
  logo: {
    width: 50,
    height: 50,
  },
  iconesTopo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  campoBusca: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    margin: 12,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  promocaoContainer: {
    backgroundColor: '#ffa726',
    borderRadius: 16,
    margin: 12,
    padding: 12,
    alignItems: 'center',
  },
  promocaoTitulo: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  promocaoImagem: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  imagemCentro: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  promocaoPreco: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  beneficiosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingHorizontal: 10,
  },
  beneficio: {
    backgroundColor: '#2e7d32',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  beneficioTexto: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 12,
    fontWeight: 'bold',
  },
  secaoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginHorizontal: 12,
    marginBottom: 8,
  },
  feiraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 12,
    alignItems: 'center',
  },
  verTodos: {
    color: '#ff8c00',
    fontWeight: 'bold',
    fontSize: 12,
  },
  lista: {
    paddingBottom: 30,
    paddingHorizontal: 5,
  },
  produtoCard: {
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
  produtoImagem: {
    width: 80,
    height: 80,
    marginBottom: 10
  },
  produtoNome: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 13,
  },
  produtoPreco: {
    color: '#2e7d32',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 14,
  },
});
