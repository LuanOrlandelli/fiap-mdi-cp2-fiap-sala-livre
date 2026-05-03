import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { rooms } from '../data/rooms';

export default function DetalheScreen() {
  const { id } = useLocalSearchParams();
  const [reservada, setReservada] = useState(false);

  const sala = rooms.find((room) => room.id === id);

  if (!sala) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Sala não encontrada</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: sala.imagem }} style={styles.imagem} />

      <Text style={styles.titulo}>{sala.nome}</Text>
      <Text style={styles.info}>Bloco: {sala.bloco}</Text>
      <Text style={styles.info}>Capacidade: {sala.capacidade} pessoas</Text>
      <Text style={styles.info}>Período: {sala.periodo}</Text>
      <Text style={styles.info}>
        Status: {sala.disponivel ? 'Disponível' : 'Indisponível'}
      </Text>

      <TouchableOpacity style={styles.botao} onPress={() => setReservada(true)}>
        <Text style={styles.botaoTexto}>
          {reservada ? 'Reserva solicitada' : 'Reservar sala'}
        </Text>
      </TouchableOpacity>

      {reservada && (
        <Text style={styles.mensagem}>
          Reserva simulada realizada com sucesso.
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    padding: 24,
  },
  imagem: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 20,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  info: {
    color: '#CCCCCC',
    fontSize: 16,
    marginBottom: 10,
  },
  botao: {
    backgroundColor: '#FF2D55',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mensagem: {
    color: '#FFFFFF',
    fontSize: 15,
    marginTop: 16,
    textAlign: 'center',
  },
});