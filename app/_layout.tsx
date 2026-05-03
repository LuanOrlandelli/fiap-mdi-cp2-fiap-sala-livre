import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#111111',
        },
        headerTintColor: '#FFFFFF',
        contentStyle: {
          backgroundColor: '#111111',
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'FIAP Sala Livre' }} />
      <Stack.Screen name="salas" options={{ title: 'Salas Disponíveis' }} />
      <Stack.Screen name="detalhe" options={{ title: 'Detalhes da Sala' }} />
    </Stack>
  );
}