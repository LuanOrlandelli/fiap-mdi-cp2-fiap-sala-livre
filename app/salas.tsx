import { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import AppHeader from '../components/AppHeader';
import RoomCard from '../components/RoomCard';
import EmptyState from '../components/EmptyState';
import { rooms } from '../data/rooms';

export default function SalasScreen() {
  const router = useRouter();

  const [listaSalas, setListaSalas] = useState(rooms);
  const [carregando, setCarregando] = useState(true);
  const [filtro, setFiltro] = useState('Todos');

  useEffect(() => {
    const timer = setTimeout(() => {
      setCarregando(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (filtro === 'Todos') {
      setListaSalas(rooms);
    } else {
      const salasFiltradas = rooms.filter((room) => room.periodo === filtro);
      setListaSalas(salasFiltradas);
    }
  }, [filtro]);

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF2D55" />
        <Text style={styles.loadingText}>Carregando salas...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <AppHeader
        titulo="Salas Disponíveis"
        subtitulo="Escolha um período e consulte as salas livres na FIAP."
      />

      <View style={styles.filtros}>
        <TouchableOpacity style={styles.filtroBotao} onPress={() => setFiltro('Todos')}>
          <Text style={styles.filtroTexto}>Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filtroBotao} onPress={() => setFiltro('Manhã')}>
          <Text style={styles.filtroTexto}>Manhã</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filtroBotao} onPress={() => setFiltro('Tarde')}>
          <Text style={styles.filtroTexto}>Tarde</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.filtroBotao} onPress={() => setFiltro('Noite')}>
          <Text style={styles.filtroTexto}>Noite</Text>
        </TouchableOpacity>
      </View>

      {listaSalas.length === 0 ? (
        <EmptyState mensagem="Tente selecionar outro período." />
      ) : (
        listaSalas.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            onPress={() =>
              router.push({
                pathname: '/detalhe',
                params: { id: room.id },
              })
            }
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#111111',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111111',
  },
  loadingText: {
    color: '#CCCCCC',
    fontSize: 16,
    marginTop: 12,
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
    gap: 8,
  },
  filtroBotao: {
    backgroundColor: '#1C1C1E',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  filtroTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});