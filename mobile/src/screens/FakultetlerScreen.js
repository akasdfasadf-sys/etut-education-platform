import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { fakultetler } from '../data/mockData';

export default function FakultetlerScreen() {
  const [openId, setOpenId] = useState(null);
  const selected = fakultetler.find((f) => f.id === openId);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Fakultetler</Text>
      <View style={styles.rowWrap}>
        {fakultetler.map((f) => (
          <Pressable key={f.id} style={[styles.chip, openId === f.id && styles.chipActive]} onPress={() => setOpenId(openId === f.id ? null : f.id)}>
            <Text style={openId === f.id ? styles.chipTextActive : styles.chipText}>{f.id}. {f.name}</Text>
          </Pressable>
        ))}
      </View>
      {selected && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{selected.icon} {selected.name}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 10 },
  title: { fontSize: 24, fontWeight: '800' },
  rowWrap: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: { borderWidth: 1, borderColor: '#ddd', padding: 8, borderRadius: 20 },
  chipActive: { backgroundColor: '#1a56db', borderColor: '#1a56db' },
  chipText: { color: '#333' },
  chipTextActive: { color: '#fff' },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 10 },
  cardTitle: { fontWeight: '700', fontSize: 16 },
});
