import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

export default function ContactScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact</Text>
      <TextInput style={styles.input} placeholder="Name" />
      <TextInput style={styles.input} placeholder="Phone" />
      <TextInput style={styles.input} placeholder="Email address" />
      <View style={styles.card}>
        <Text style={styles.info}>Aşgabat, Türkmenistan</Text>
        <Text style={styles.info}>+99364716128</Text>
        <Text style={styles.info}>info@etut.edu.tm</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 10 },
  title: { fontSize: 24, fontWeight: '800' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  card: { backgroundColor: '#fff', borderRadius: 10, padding: 12, gap: 4 },
  info: { color: '#444' },
});
