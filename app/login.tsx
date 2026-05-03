import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen() {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function handleLogin() {
    if (!email.includes('@')) {
      setError('E-mail inválido');
      return;
    }

    const success = await login(email, password);

    if (!success) {
      setError('Usuário não encontrado');
      return;
    }

    router.replace('/salas');
  }

  return (
    <View>
      <Text>Login</Text>

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {!!error && <Text>{error}</Text>}

      <TouchableOpacity onPress={handleLogin}>
        <Text>Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}