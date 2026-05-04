import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors } from '../constants/colors';

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
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.82}>
      <Image source={{ uri: room.imagem }} style={styles.imagem} />

      <View style={styles.conteudo}>
        <View style={styles.rowBetween}>
          <Text style={styles.nome}>{room.nome}</Text>
          <Text style={[styles.status, room.disponivel ? styles.available : styles.unavailable]}>
            {room.disponivel ? 'Livre' : 'Ocupada'}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="business-outline" size={16} color={colors.muted} />
          <Text style={styles.info}>Bloco {room.bloco}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="people-outline" size={16} color={colors.muted} />
          <Text style={styles.info}>{room.capacidade} pessoas</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={16} color={colors.muted} />
          <Text style={styles.info}>{room.periodo}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  imagem: {
    width: '100%',
    height: 150,
  },
  conteudo: {
    padding: 16,
  },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  nome: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '800',
  },
  status: {
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    overflow: 'hidden',
  },
  available: {
    color: colors.text,
    backgroundColor: colors.success,
  },
  unavailable: {
    color: colors.text,
    backgroundColor: colors.error,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  info: {
    color: colors.muted,
    fontSize: 14,
    marginLeft: 7,
  },
});