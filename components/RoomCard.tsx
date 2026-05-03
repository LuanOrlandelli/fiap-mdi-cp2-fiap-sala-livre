import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

type Props = {
  room: {
    id: string;
    nome: string;
    bloco: string;
    capacidade: number;
    periodo: string;
    disponivel: boolean;
    imagem: string;
  };
  onPress: () => void;
};

export default function RoomCard({ room, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: room.imagem }} style={styles.imagem} />

      <View style={styles.conteudo}>
        <Text style={styles.nome}>{room.nome}</Text>
        <Text style={styles.info}>Bloco: {room.bloco}</Text>
        <Text style={styles.info}>Capacidade: {room.capacidade} pessoas</Text>
        <Text style={styles.info}>Período: {room.periodo}</Text>
        <Text style={styles.status}>
          {room.disponivel ? 'Disponível' : 'Indisponível'}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imagem: {
    width: '100%',
    height: 150,
  },
  conteudo: {
    padding: 16,
  },
  nome: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  info: {
    color: '#CCCCCC',
    fontSize: 14,
    marginBottom: 4,
  },
  status: {
    color: '#FF2D55',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
});