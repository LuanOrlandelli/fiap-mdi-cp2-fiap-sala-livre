import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { AppDataProvider } from '../context/AppDataContext';
import { colors } from '../constants/colors';

export default function RootLayout() {
  return (
    <AuthProvider>
      <AppDataProvider>
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.background },
            headerTintColor: colors.text,
            headerTitleStyle: { fontWeight: '700' },
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="login" options={{ title: 'Entrar' }} />
          <Stack.Screen name="cadastro" options={{ title: 'Cadastro' }} />
          <Stack.Screen name="index" options={{ title: 'FIAP Sala Livre' }} />
          <Stack.Screen name="salas" options={{ title: 'Salas Disponíveis' }} />
          <Stack.Screen name="detalhe" options={{ title: 'Detalhes da Sala' }} />
        </Stack>
      </AppDataProvider>
    </AuthProvider>
  );
}
