import { View, Text, StyleSheet } from 'react-native';

type Props = {
  mensagem: string;
};

export default function EmptyState({ mensagem }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Nenhuma sala encontrada</Text>
      <Text style={styles.mensagem}>{mensagem}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1C1C1E',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  mensagem: {
    color: '#CCCCCC',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});