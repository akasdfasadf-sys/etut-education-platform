import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useAuth } from '../store/AuthContext';

export default function LoginScreen() {
  const { login, user, logout } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    setLoading(true);
    setError('');
    const result = await login(username, password);
    if (!result.success) setError(result.error);
    setLoading(false);
  };

  if (user) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Salam, {user.name}</Text>
        <Pressable style={styles.btn} onPress={logout}>
          <Text style={styles.btnText}>Logout</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giriş</Text>
      <TextInput value={username} onChangeText={setUsername} style={styles.input} placeholder="Ulanyjy ady" />
      <TextInput value={password} onChangeText={setPassword} style={styles.input} placeholder="Açar söz" secureTextEntry />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <Pressable style={styles.btn} onPress={onLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.btnText}>GIRIŞ</Text>}
      </Pressable>
      <Text style={styles.hint}>Synag: admin/1234, talip1/talip123</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center', gap: 10 },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  btn: { backgroundColor: '#1a56db', padding: 12, borderRadius: 10, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '700' },
  error: { color: '#c53030' },
  hint: { color: '#777', fontSize: 12 },
});
