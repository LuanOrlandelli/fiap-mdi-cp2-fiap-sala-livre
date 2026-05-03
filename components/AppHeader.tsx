import { View, Text, StyleSheet } from 'react-native';

type Props = {
  titulo: string;
  subtitulo: string;
};

export default function AppHeader({ titulo, subtitulo }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.subtitulo}>{subtitulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitulo: {
    color: '#CCCCCC',
    fontSize: 15,
    lineHeight: 22,
  },
});