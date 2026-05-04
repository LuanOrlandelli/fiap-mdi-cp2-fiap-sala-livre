import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import { colors } from '../constants/colors';
import { useAuth } from '../context/AuthContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function CadastroScreen() {
  const { register } = useAuth();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState({ nome: false, email: false, senha: false, confirmacao: false });

  const errors = useMemo(() => {
    return {
      nome: !nome.trim() ? 'O nome completo é obrigatório.' : nome.trim().split(' ').length < 2 ? 'Informe nome e sobrenome.' : '',
      email: !email.trim()
        ? 'O e-mail é obrigatório.'
        : !emailRegex.test(email)
          ? 'Informe um e-mail válido.'
          : '',
      senha: !senha ? 'A senha é obrigatória.' : senha.length < 6 ? 'A senha deve ter pelo menos 6 caracteres.' : '',
      confirmacao: !confirmacao
        ? 'A confirmação de senha é obrigatória.'
        : confirmacao !== senha
          ? 'As senhas não conferem.'
          : '',
    };
  }, [nome, email, senha, confirmacao]);

  const hasErrors = !!errors.nome || !!errors.email || !!errors.senha || !!errors.confirmacao;

  async function handleRegister() {
    setTouched({ nome: true, email: true, senha: true, confirmacao: true });
    setFeedback({ type: '', message: '' });

    if (hasErrors) return;

    setSubmitting(true);
    const response = await register({ nome: nome.trim(), email: email.trim(), senha });
    setSubmitting(false);

    setFeedback({ type: response.success ? 'success' : 'error', message: response.message });

    if (response.success) {
      setTimeout(() => router.replace('/login'), 700);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Criar cadastro</Text>
        <Text style={styles.subtitle}>Cadastre seus dados para usar o FIAP Sala Livre.</Text>

        <AppInput
          label="Nome completo"
          icon="person-outline"
          placeholder="Seu nome completo"
          value={nome}
          onChangeText={setNome}
          onBlur={() => setTouched((old) => ({ ...old, nome: true }))}
          autoCapitalize="words"
          error={touched.nome ? errors.nome : ''}
        />

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
          placeholder="Mínimo 6 caracteres"
          value={senha}
          onChangeText={setSenha}
          onBlur={() => setTouched((old) => ({ ...old, senha: true }))}
          secureTextEntry
          error={touched.senha ? errors.senha : ''}
        />

        <AppInput
          label="Confirmar senha"
          icon="shield-checkmark-outline"
          placeholder="Repita a senha"
          value={confirmacao}
          onChangeText={setConfirmacao}
          onBlur={() => setTouched((old) => ({ ...old, confirmacao: true }))}
          secureTextEntry
          error={touched.confirmacao ? errors.confirmacao : ''}
        />

        {!!feedback.message && (
          <Text style={feedback.type === 'success' ? styles.successMessage : styles.errorMessage}>
            {feedback.message}
          </Text>
        )}

        <AppButton title="Cadastrar" onPress={handleRegister} disabled={hasErrors} loading={submitting} />
        <AppButton title="Voltar para login" variant="secondary" onPress={() => router.replace('/login')} />
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
  successMessage: {
    color: colors.success,
    fontSize: 14,
    marginBottom: 4,
  },
});
