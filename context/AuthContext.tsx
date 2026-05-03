import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext({} as any);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSession();
  }, []);

  async function loadSession() {
    const session = await AsyncStorage.getItem('@session');

    if (session) {
      setUser(JSON.parse(session));
    }

    setLoading(false);
  }

  async function login(email: string, password: string) {
    const users = await AsyncStorage.getItem('@users');

    if (!users) return false;

    const parsedUsers = JSON.parse(users);

    const foundUser = parsedUsers.find(
      (item: any) => item.email === email && item.password === password
    );

    if (!foundUser) return false;

    setUser(foundUser);

    await AsyncStorage.setItem('@session', JSON.stringify(foundUser));

    return true;
  }

  async function logout() {
    setUser(null);
    await AsyncStorage.removeItem('@session');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}