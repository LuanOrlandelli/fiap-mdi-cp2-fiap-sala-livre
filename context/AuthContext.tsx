import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

type User = {
  nome: string;
  email: string;
  senha: string;
};

type AuthContextData = {
  user: Omit<User, 'senha'> | null;
  loading: boolean;
  register: (data: User) => Promise<{ success: boolean; message: string }>;
  login: (email: string, senha: string) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
};

const USERS_KEY = '@fiap_sala_livre:users';
const SESSION_KEY = '@fiap_sala_livre:session';

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Omit<User, 'senha'> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSession() {
      try {
        const storedSession = await AsyncStorage.getItem(SESSION_KEY);
        if (storedSession) {
          setUser(JSON.parse(storedSession));
        }
      } finally {
        setLoading(false);
      }
    }

    loadSession();
  }, []);

  async function getUsers(): Promise<User[]> {
    const storedUsers = await AsyncStorage.getItem(USERS_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }

  async function register(data: User) {
    const users = await getUsers();
    const emailAlreadyExists = users.some(
      (item) => item.email.toLowerCase() === data.email.toLowerCase()
    );

    if (emailAlreadyExists) {
      return { success: false, message: 'Este e-mail já possui cadastro.' };
    }

    const updatedUsers = [...users, data];
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));

    return { success: true, message: 'Cadastro realizado com sucesso.' };
  }

  async function login(email: string, senha: string) {
    const users = await getUsers();
    const foundUser = users.find(
      (item) => item.email.toLowerCase() === email.toLowerCase() && item.senha === senha
    );

    if (!foundUser) {
      return { success: false, message: 'E-mail ou senha inválidos.' };
    }

    const sessionUser = { nome: foundUser.nome, email: foundUser.email };
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
    setUser(sessionUser);

    return { success: true, message: 'Login realizado com sucesso.' };
  }

  async function logout() {
    await AsyncStorage.removeItem(SESSION_KEY);
    setUser(null);
    router.replace('/login');
  }

  const value = useMemo(
    () => ({ user, loading, register, login, logout }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
