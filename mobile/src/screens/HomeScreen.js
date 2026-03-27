import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>ETUT Education Platform</Text>
      <Text style={styles.subtitle}>Oguz Han Engineering and Technology University</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>CONTACT</Text>
        <TextInput placeholder="Name" style={styles.input} />
        <TextInput placeholder="Phone" style={styles.input} />
        <TextInput placeholder="Email address" style={styles.input} />
        <Text style={styles.info}>Aşgabat, Türkmenistan</Text>
        <Text style={styles.info}>+99364716128</Text>
        <Text style={styles.info}>info@etut.edu.tm</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  title: { fontSize: 26, fontWeight: '800', color: '#1a1a2e' },
  subtitle: { color: '#555' },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 10, gap: 8 },
  sectionTitle: { fontWeight: '800', fontSize: 18 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  info: { color: '#444' },
});
