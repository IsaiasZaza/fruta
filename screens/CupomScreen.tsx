import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Coupon {
  id: string;
  codigo: string;
  tipo: string;
  valor: number;
  expiracao: string; // exemplo: "2025-06-12T23:59:59.000Z"
}

export default function CupomScreen(): JSX.Element {
  const navigation = useNavigation();
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCoupons = async () => {
    try {
      const response = await fetch(
        'https://nova-pasta-production.up.railway.app/api/coupons'
      );
      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os cupons.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const isExpired = (expiracao: string): boolean => {
    return new Date(expiracao) < new Date();
  };

  const renderItem = ({ item }: { item: Coupon }) => {
    const expired = isExpired(item.expiracao);

    return (
      <View style={[styles.card, expired && styles.cardExpired]}>
        <Ionicons
          name="pricetag-outline"
          size={32}
          color={expired ? '#888' : '#2e7d32'}
          style={styles.cardIcon}
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.couponCode, expired && styles.textExpired]}>
            {item.codigo}
          </Text>
          <Text style={[styles.description, expired && styles.textExpired]}>
            {item.tipo}
          </Text>
        </View>
        <Text style={[styles.discount, expired && styles.textExpired]}>
          {item.valor}$
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>MEUS CUPONS</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Conteúdo */}
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <FlatList
            data={coupons}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
          />
        )}

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Catalogo')}>
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
    marginTop: 32,
    marginBottom: 20,
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
    fontSize: 16,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 4,
  },
  cardExpired: {
    backgroundColor: '#e0e0e0',
  },
  cardIcon: {
    marginRight: 12,
  },
  couponCode: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#2e7d32',
  },
  description: {
    fontSize: 14,
    color: '#444',
  },
  discount: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#ff8c00',
    marginLeft: 10,
  },
  textExpired: {
    color: '#888',
    textDecorationLine: 'line-through',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#2e7d32',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
