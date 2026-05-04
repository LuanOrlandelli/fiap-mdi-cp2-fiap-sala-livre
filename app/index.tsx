import { useEffect } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import AppButton from '../components/AppButton';
import { colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';

export default function HomeScreen() {
  const { user, loading, logout } = useAuth();
  const { reservations } = useAppData();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user]);

  if (loading || !user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  const userReservations = reservations.filter((item) => item.userEmail === user.email);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerRow}>
        <Image
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/7/70/FIAP_logo.png' }}
          style={styles.logo}
        />
        <Text style={styles.badge}>CP2</Text>
      </View>

      <Text style={styles.welcome}>Olá, {user.nome.split(' ')[0]}.</Text>
      <Text style={styles.titulo}>FIAP Sala Livre</Text>

      <Text style={styles.subtitulo}>
        Consulte salas disponíveis, filtre por período e registre reservas que ficam salvas mesmo após fechar o app.
      </Text>

      <View style={styles.statsCard}>
        <Text style={styles.statsNumber}>{userReservations.length}</Text>
        <Text style={styles.statsLabel}>
          {userReservations.length === 1 ? 'reserva ativa' : 'reservas ativas'} no seu usuário
        </Text>
      </View>

      <AppButton title="Ver salas disponíveis" onPress={() => router.push('/salas')} />
      <AppButton title="Sair da conta" variant="secondary" onPress={logout} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: 24,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 140,
    height: 50,
    resizeMode: 'contain',
  },
  badge: {
    color: colors.text,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: '800',
  },
  welcome: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  titulo: {
    color: colors.text,
    fontSize: 34,
    fontWeight: '900',
    marginBottom: 12,
  },
  subtitulo: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  statsCard: {
    backgroundColor: colors.card,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
    marginBottom: 18,
  },
  statsNumber: {
    color: colors.text,
    fontSize: 36,
    fontWeight: '900',
  },
  statsLabel: {
    color: colors.muted,
    fontSize: 15,
    marginTop: 4,
  },
});
