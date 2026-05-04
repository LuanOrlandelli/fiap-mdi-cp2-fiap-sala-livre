import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AppHeader from '../components/AppHeader';
import EmptyState from '../components/EmptyState';
import RoomCard from '../components/RoomCard';
import { colors } from '../constants/colors';
import { rooms } from '../data/rooms';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';

const filtros = ['Todos', 'Manhã', 'Tarde', 'Noite'];

export default function SalasScreen() {
  const { user, loading } = useAuth();
  const { reservations } = useAppData();

  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState('Todos');
  const [busca, setBusca] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user]);

  useEffect(() => {
    const timer = setTimeout(() => setCarregando(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const listaSalas = useMemo(() => {
    return rooms.filter((room) => {
      const isReserved = reservations.some((item) => item.roomId === room.id);
      const disponibilidadeAtual = room.disponivel && !isReserved;

      const matchesPeriod = filtro === 'Todos' || room.periodo === filtro;
      const searchText = `${room.nome} ${room.bloco} ${room.periodo} ${
        disponibilidadeAtual ? 'livre disponível' : 'ocupada indisponível'
      }`.toLowerCase();

      const matchesSearch = searchText.includes(busca.toLowerCase().trim());

      return matchesPeriod && matchesSearch;
    });
  }, [filtro, busca, reservations]);

  if (loading || carregando || !user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando salas...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <AppHeader
        titulo="Salas Disponíveis"
        subtitulo="Escolha um período, pesquise pelo nome da sala e acompanhe suas reservas."
      />

      <View style={styles.searchArea}>
        <Ionicons name="search-outline" size={20} color={colors.muted} />
        <TextInput
          placeholder="Buscar por sala, bloco, período ou status"
          placeholderTextColor="#777780"
          value={busca}
          onChangeText={setBusca}
          style={styles.searchInput}
        />
      </View>

      <View style={styles.filtros}>
        {filtros.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.filtroBotao, filtro === item && styles.filtroAtivo]}
            onPress={() => setFiltro(item)}
          >
            <Text style={[styles.filtroTexto, filtro === item && styles.filtroTextoAtivo]}>
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {listaSalas.length === 0 ? (
        <EmptyState mensagem="Nenhuma sala combina com o filtro ou busca realizada." />
      ) : (
        listaSalas.map((room) => {
          const isReserved = reservations.some((item) => item.roomId === room.id);

          return (
            <RoomCard
              key={room.id}
              room={{
                ...room,
                disponivel: room.disponivel && !isReserved,
              }}
              onPress={() => router.push({ pathname: '/detalhe', params: { id: room.id } })}
            />
          );
        })
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    color: colors.muted,
    fontSize: 16,
    marginTop: 12,
  },
  searchArea: {
    minHeight: 52,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    marginLeft: 8,
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 8,
  },
  filtroBotao: {
    backgroundColor: colors.card,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filtroAtivo: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filtroTexto: {
    color: colors.muted,
    fontWeight: '700',
  },
  filtroTextoAtivo: {
    color: colors.text,
  },
});