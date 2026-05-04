import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../constants/colors';

type Props = {
  titulo: string;
  subtitulo: string;
};

export default function AppHeader({ titulo, subtitulo }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.kicker}>FIAP Sala Livre</Text>
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.subtitulo}>{subtitulo}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  kicker: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  titulo: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 8,
  },
  subtitulo: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
});