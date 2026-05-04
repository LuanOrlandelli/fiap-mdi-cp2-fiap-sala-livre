import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

type Reservation = {
  id: string;
  roomId: string;
  roomName: string;
  userEmail: string;
  createdAt: string;
};

type AppDataContextData = {
  reservations: Reservation[];
  loadingData: boolean;
  createReservation: (data: Omit<Reservation, 'id' | 'createdAt'>) => Promise<void>;
  removeReservation: (id: string) => Promise<void>;
  hasReservation: (roomId: string, userEmail?: string) => boolean;
};

const RESERVATIONS_KEY = '@fiap_sala_livre:reservations';

const AppDataContext = createContext<AppDataContextData>({} as AppDataContextData);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    async function loadReservations() {
      try {
        const storedReservations = await AsyncStorage.getItem(RESERVATIONS_KEY);

        if (storedReservations) {
          setReservations(JSON.parse(storedReservations));
        }
      } finally {
        setLoadingData(false);
      }
    }

    loadReservations();
  }, []);

  async function persistReservations(data: Reservation[]) {
    setReservations(data);
    await AsyncStorage.setItem(RESERVATIONS_KEY, JSON.stringify(data));
  }

  async function createReservation(data: Omit<Reservation, 'id' | 'createdAt'>) {
    const roomAlreadyReserved = reservations.some((item) => item.roomId === data.roomId);

    if (roomAlreadyReserved) {
      throw new Error('Esta sala já está ocupada.');
    }

    const newReservation: Reservation = {
      ...data,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
    };

    await persistReservations([...reservations, newReservation]);
  }

  async function removeReservation(id: string) {
    const filteredReservations = reservations.filter((item) => item.id !== id);
    await persistReservations(filteredReservations);
  }

  function hasReservation(roomId: string, userEmail?: string) {
    return reservations.some(
      (item) => item.roomId === roomId && (!userEmail || item.userEmail === userEmail)
    );
  }

  const value = useMemo(
    () => ({
      reservations,
      loadingData,
      createReservation,
      removeReservation,
      hasReservation,
    }),
    [reservations, loadingData]
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  return useContext(AppDataContext);
}