import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

type Props = {
  mensagem: string;
};

export default function EmptyState({ mensagem }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="file-tray-outline" size={34} color={colors.primary} />
      <Text style={styles.titulo}>Nenhuma sala encontrada</Text>
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    padding: 24,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  titulo: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 8,
  },
  mensagem: {
    color: colors.muted,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});