import { useEffect, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import { colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen() {
  const { login, user, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [touched, setTouched] = useState({ email: false, senha: false });
  const [feedback, setFeedback] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace('/');
    }
  }, [loading, user]);

  const errors = useMemo(() => {
    return {
      email: !email.trim()
        ? 'O e-mail é obrigatório.'
        : !emailRegex.test(email)
          ? 'Informe um e-mail válido.'
          : '',
      senha: !senha ? 'A senha é obrigatória.' : senha.length < 6 ? 'A senha deve ter pelo menos 6 caracteres.' : '',
    };
  }, [email, senha]);

  const hasErrors = !!errors.email || !!errors.senha;

  async function handleLogin() {
    setTouched({ email: true, senha: true });
    setFeedback('');

    if (hasErrors) return;

    setSubmitting(true);
    const response = await login(email.trim(), senha);
    setSubmitting(false);

    if (!response.success) {
      setFeedback(response.message);
      return;
    }

    router.replace('/');
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>FIAP</Text>
        </View>

        <Text style={styles.title}>Bem-vindo de volta</Text>
        <Text style={styles.subtitle}>Entre para consultar e reservar salas livres no campus.</Text>

        <AppInput
          label="E-mail"
          icon="mail-outline"
          placeholder="usuario@dominio.com"
          value={email}
          onChangeText={setEmail}
          onBlur={() => setTouched((old) => ({ ...old, email: true }))}
          keyboardType="email-address"
          error={touched.email ? errors.email : ''}
        />

        <AppInput
          label="Senha"
          icon="lock-closed-outline"
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={setSenha}
          onBlur={() => setTouched((old) => ({ ...old, senha: true }))}
          secureTextEntry
          error={touched.senha ? errors.senha : ''}
        />

        {!!feedback && <Text style={styles.errorMessage}>{feedback}</Text>}

        <AppButton title="Entrar" onPress={handleLogin} disabled={hasErrors} loading={submitting} />
        <AppButton title="Criar cadastro" variant="secondary" onPress={() => router.push('/cadastro')} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: colors.background },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  logoBox: {
    width: 86,
    height: 86,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logoText: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '900',
    letterSpacing: 1,
  },
  title: {
    color: colors.text,
    fontSize: 31,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 28,
  },
  errorMessage: {
    color: colors.error,
    fontSize: 14,
    marginBottom: 4,
  },
});
