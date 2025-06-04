import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCarrinho } from '../CarrinhoContext';

const { height } = Dimensions.get('window');

export default function CarrinhoScreen(): JSX.Element {
  const navigation = useNavigation<any>();
  const { carrinho } = useCarrinho();

  const renderProduto = ({ item }: any) => (
    <View style={styles.produto}>
      <Image source={{ uri: item.image }} style={styles.produtoImagem} />
      <View style={{ flex: 1 }}>
        <Text style={styles.produtoNome}>{item.nome}</Text>
        <Text style={styles.produtoPreco}>R$ {item.price.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>MEU CARRINHO</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.faixaFrete}>
        <Ionicons name="car" size={16} color="#000" />
        <Text style={styles.faixaTexto}>FALTAM APENAS R$ 99,00 PARA FRETE GRÁTIS</Text>
      </View>

      {carrinho.length === 0 ? (
        <View style={styles.conteudo}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1170/1170678.png' }}
            style={styles.imagemCarrinho}
          />

          <Text style={styles.textoPrincipal}>CARRINHO VAZIO? NÃO CHORE</Text>
          <Text style={styles.textoSecundario}>QUE TAL COMEÇAR SUAS COMPRAS?</Text>
          <Text style={styles.textoDescricao}>
            NAVEGUE PELAS CATEGORIAS{'\n'}OU BUSQUE PELO SEU PRODUTO
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate('Catalogo')}
          >
            <Text style={styles.botaoTexto}>FAZER COMPRAS</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <FlatList
            data={carrinho}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={renderProduto}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          <TouchableOpacity
            style={[styles.botao, { marginTop: 30, alignSelf: 'center' }]}
            onPress={() => navigation.navigate('CarrinhoEtapa1')}
          >
            <Text style={styles.botaoTexto}>FINALIZAR COMPRA</Text>
          </TouchableOpacity>

        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start',
    marginTop: 45,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  faixaFrete: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5eee6',
    borderRadius: 8,
    padding: 10,
    marginVertical: 20,
    width: '100%',
  },
  faixaTexto: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 13,
    color: '#000',
  },
  conteudo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 0.05,
  },
  imagemCarrinho: {
    width: 160,
    height: 160,
    marginBottom: 20,
  },
  textoPrincipal: {
    fontWeight: 'bold',
    color: '#388e3c',
    fontSize: 16,
    textAlign: 'center',
  },
  textoSecundario: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 6,
    textAlign: 'center',
    color: '#333',
  },
  textoDescricao: {
    textAlign: 'center',
    fontSize: 13,
    color: '#555',
    marginTop: 10,
    lineHeight: 18,
  },
  botao: {
    backgroundColor: '#2e7d32',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 25,
    elevation: 3,
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  produto: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 10,
  },
  produtoImagem: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  produtoNome: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
    color: '#333',
  },
  produtoPreco: {
    color: '#2e7d32',
    fontWeight: 'bold',
  },
});
