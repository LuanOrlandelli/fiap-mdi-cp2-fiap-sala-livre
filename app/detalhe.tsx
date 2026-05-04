import { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import AppButton from '../components/AppButton';
import { colors } from '../constants/colors';
import { rooms } from '../data/rooms';
import { useAppData } from '../context/AppDataContext';
import { useAuth } from '../context/AuthContext';

export default function DetalheScreen() {
  const { id } = useLocalSearchParams();
  const { user, loading } = useAuth();
  const { reservations, createReservation, removeReservation, loadingData } = useAppData();

  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [loading, user]);

  const sala = rooms.find((room) => room.id === id);

  const roomReservation = useMemo(() => {
    if (!sala) return undefined;
    return reservations.find((item) => item.roomId === sala.id);
  }, [reservations, sala]);

  const isRoomReserved = !!roomReservation;
  const isReservedByCurrentUser = roomReservation?.userEmail === user?.email;
  const canReserve = !!sala?.disponivel && !isRoomReserved;

  async function handleReservation() {
    if (!sala || !user) return;

    setSubmitting(true);
    setFeedback('');

    try {
      if (isReservedByCurrentUser && roomReservation) {
        await removeReservation(roomReservation.id);
        setFeedback('Reserva cancelada com sucesso. A sala voltou a ficar livre.');
      } else {
        if (!canReserve) {
          setFeedback('Esta sala já está ocupada e não pode ser reservada.');
          return;
        }

        await createReservation({
          roomId: sala.id,
          roomName: sala.nome,
          userEmail: user.email,
        });

        setFeedback('Reserva realizada com sucesso. A sala agora está ocupada.');
      }
    } catch (error) {
      setFeedback('Esta sala já está ocupada e não pode ser reservada.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || loadingData || !user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  if (!sala) {
    return (
      <View style={styles.containerPlain}>
        <Text style={styles.titulo}>Sala não encontrada</Text>
        <AppButton title="Voltar" onPress={() => router.back()} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: sala.imagem }} style={styles.imagem} />

      <View style={styles.card}>
        <Text style={styles.tag}>
          {isRoomReserved
            ? 'Sala ocupada'
            : sala.disponivel
              ? 'Disponível para reserva'
              : 'Indisponível'}
        </Text>

        <Text style={styles.titulo}>{sala.nome}</Text>

        <Text style={styles.descricao}>
          Ambiente indicado para estudos, reuniões acadêmicas e trabalhos em grupo.
        </Text>

        <View style={styles.infoBox}>
          <Text style={styles.info}>Bloco: {sala.bloco}</Text>
          <Text style={styles.info}>Capacidade: {sala.capacidade} pessoas</Text>
          <Text style={styles.info}>Período: {sala.periodo}</Text>
          <Text style={styles.info}>
            Status: {isRoomReserved ? 'Ocupada' : sala.disponivel ? 'Livre' : 'Indisponível'}
          </Text>

          {isRoomReserved && (
            <Text style={styles.info}>
              Reservada por:{' '}
              {isReservedByCurrentUser ? 'você' : roomReservation?.userEmail}
            </Text>
          )}
        </View>

        <AppButton
          title={
            isReservedByCurrentUser
              ? 'Cancelar minha reserva'
              : isRoomReserved
                ? 'Sala ocupada'
                : 'Reservar sala'
          }
          variant={isReservedByCurrentUser ? 'danger' : 'primary'}
          onPress={handleReservation}
          disabled={!isReservedByCurrentUser && !canReserve}
          loading={submitting}
        />

        {!!feedback && (
          <Text style={feedback.includes('sucesso') ? styles.success : styles.error}>
            {feedback}
          </Text>
        )}

        {!sala.disponivel && !isRoomReserved && (
          <Text style={styles.error}>Esta sala não pode ser reservada no momento.</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: colors.background,
  },
  containerPlain: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  imagem: {
    width: '100%',
    height: 230,
    borderRadius: 20,
    marginBottom: 18,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 20,
  },
  tag: {
    alignSelf: 'flex-start',
    color: colors.text,
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 12,
  },
  titulo: {
    color: colors.text,
    fontSize: 29,
    fontWeight: '900',
    marginBottom: 8,
  },
  descricao: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: colors.cardSoft,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  info: {
    color: colors.muted,
    fontSize: 15,
    marginBottom: 7,
  },
  success: {
    color: colors.success,
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  error: {
    color: colors.error,
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
});