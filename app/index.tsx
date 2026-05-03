import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/7/70/FIAP_logo.png' }}
        style={styles.logo}
      />

      <Text style={styles.titulo}>FIAP Sala Livre</Text>

      <Text style={styles.subtitulo}>
        Consulte salas disponíveis para estudar, fazer reuniões e trabalhos em grupo.
      </Text>

      <TouchableOpacity style={styles.botao} onPress={() => router.push('/salas')}>
        <Text style={styles.botaoTexto}>Ver salas disponíveis</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 140,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  titulo: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitulo: {
    color: '#CCCCCC',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
  },
  botao: {
    backgroundColor: '#FF2D55',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});