// NotificationScreen.tsx
import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Animated, { FadeInRight } from 'react-native-reanimated';

const notifications = [
  {
    id: '1',
    title: 'Novos Produtos Disponíveis',
    message: 'Foi adicionado novas Frutas e Saladas no catálogo.',
    time: '2h atrás',
    read: false,
  },
  {
    id: '2',
    title: 'Atualização de perfil',
    message: 'Seu perfil foi atualizado com sucesso.',
    time: '1d atrás',
    read: true,
  },
  {
    id: '3',
    title: 'Compra confirmada',
    message: 'Muito obrigado por comprar conosco! Seu pedido foi confirmado.',
    time: '3d atrás',
    read: true,
  },
];

const NotificationCard = ({ item }: { item: typeof notifications[0] }) => (
  <Animated.View entering={FadeInRight.delay(100)}>
    <TouchableOpacity
      style={[
        styles.card,
        { backgroundColor: item.read ? '#fff' : '#e0edff' },
      ]}
      activeOpacity={0.85}
    >
      <View style={styles.cardContent}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color={item.read ? '#999' : '#2563EB'}
          style={styles.icon}
        />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.message}>{item.message}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  </Animated.View>
);

export default function NotificationScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.header}>Notificações</Text>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NotificationCard item={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff8c00',
    paddingTop: Platform.OS === 'android' ? 40 : 60,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  card: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    elevation: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 12,
    marginTop: 2,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#111827',
  },
  message: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 4,
  },
  time: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 8,
  },
});
