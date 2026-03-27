import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const USERS = [
  { username: 'admin', password: '1234', name: 'Admin Agza' },
  { username: 'talip1', password: 'talip123', name: 'Aýnur Durdyýewa' },
  { username: 'talip2', password: 'talip456', name: 'Merdan Annaorazow' },
];

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isBootstrapping, setIsBootstrapping] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('auth_user')
      .then((value) => (value ? setUser(JSON.parse(value)) : null))
      .finally(() => setIsBootstrapping(false));
  }, []);

  const login = async (username, password) => {
    const userExists = USERS.find((u) => u.username === username);
    if (!userExists) return { success: false, error: 'Bu ulanyjy ady ulgamda ýok!' };
    if (userExists.password !== password) return { success: false, error: 'Açar söz ýalňyş!' };
    const authUser = { username: userExists.username, name: userExists.name };
    setUser(authUser);
    await AsyncStorage.setItem('auth_user', JSON.stringify(authUser));
    return { success: true };
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem('auth_user');
  };

  const value = useMemo(
    () => ({ user, isLoggedIn: !!user, isBootstrapping, login, logout }),
    [user, isBootstrapping]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
