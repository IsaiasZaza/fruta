import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCarrinho } from '../CarrinhoContext';

export default function CarrinhoEtapa1() {
  const navigation = useNavigation<any>();
  const { carrinho, atualizarQuantidade } = useCarrinho();

  const [cupom, setCupom] = useState('');
  const [desconto, setDesconto] = useState(0);
  const [mensagemCupom, setMensagemCupom] = useState('');

  const validarCupom = async () => {
    try {
      const response = await fetch('https://nova-pasta-production.up.railway.app/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ codigo: cupom }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setMensagemCupom(errorData.message || 'Cupom inválido.');
        setDesconto(0);
        return;
      }

      const dados = await response.json();

      if (dados.valor && typeof dados.valor === 'number') {

        const descontoCalculado = Math.min(dados.valor, subtotal);
        setDesconto(descontoCalculado);
        setMensagemCupom(`Cupom aplicado: R$ ${descontoCalculado.toFixed(2)} de desconto!`);
      } else {
        setDesconto(0);
        setMensagemCupom('Cupom inválido ou sem valor de desconto.');
      }
    } catch (error) {
      setMensagemCupom('Erro ao validar cupom.');
      setDesconto(0);
    }
  };




  const subtotal = carrinho.reduce((total, item) => {
    return total + item.price * item.quantidade;
  }, 0);

  const totalComDesconto = Math.max(0, subtotal - desconto);

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
                onPress={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                style={styles.botaoQtd}
              >
                <Text style={styles.qtdTexto}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qtd}>{item.quantidade}</Text>
              <TouchableOpacity
                onPress={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                style={styles.botaoQtd}
              >
                <Text style={styles.qtdTexto}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}

      {/* Cupom */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 6 }}>Adicionar Cupom:</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <View style={{ flex: 1 }}>
            <TextInput
              style={styles.inputCupom}
              placeholder="Digite o cupom"
              value={cupom}
              onChangeText={setCupom}
            />
          </View>
          <TouchableOpacity
            onPress={validarCupom}
            style={styles.botaoCupom}
          >
            <Text style={{ color: '#fff', fontWeight: 'bold' }}>Aplicar</Text>
          </TouchableOpacity>
        </View>

        {mensagemCupom !== '' && (
          <Text style={{ marginTop: 6, color: desconto > 0 ? 'green' : 'red' }}>
            {mensagemCupom}
          </Text>
        )}
      </View>

      {/* Total */}
      <View style={{ marginTop: 24 }}>
        <Text style={{ fontSize: 16, fontWeight: '600' }}>Subtotal: R$ {subtotal.toFixed(2)}</Text>
        {desconto > 0 && (
          <Text style={{ fontSize: 16, fontWeight: '600', color: 'green' }}>
            Desconto: - R$ {desconto.toFixed(2)} → Total: R$ {totalComDesconto.toFixed(2)}
          </Text>
        )}
      </View>

      {/* Botão de Próximo */}
      <TouchableOpacity
        style={styles.botao}
        onPress={() => navigation.navigate('CarrinhoEtapa2', { desconto })}
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
    elevation: 2,
    shadowColor: '#000',
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
  inputCupom: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
  },
  botaoCupom: {
    backgroundColor: '#2e7d32',
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
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
