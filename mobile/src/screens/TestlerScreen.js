import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { fakultetler, kurslar, subjectDetails, subjects } from '../data/mockData';
import { useMemo, useState } from 'react';

export default function TestlerScreen({ navigation }) {
  const [selectedFakultet, setSelectedFakultet] = useState(null);
  const [selectedKurs, setSelectedKurs] = useState(null);

  const filtered = useMemo(
    () => subjects.filter((s) => s.fakultet === selectedFakultet && s.kurs === selectedKurs),
    [selectedFakultet, selectedKurs]
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Testler</Text>
      <View style={styles.rowWrap}>
        {fakultetler.map((f) => (
          <Pressable key={f.id} style={[styles.chip, selectedFakultet === f.id && styles.chipActive]} onPress={() => { setSelectedFakultet(f.id); setSelectedKurs(null); }}>
            <Text style={selectedFakultet === f.id ? styles.chipTextActive : styles.chipText}>{f.icon} {f.name}</Text>
          </Pressable>
        ))}
      </View>
      {!!selectedFakultet && (
        <View style={styles.rowWrap}>
          {kurslar.map((k) => (
            <Pressable key={k} style={[styles.chip, selectedKurs === k && styles.chipActive]} onPress={() => setSelectedKurs(k)}>
              <Text style={selectedKurs === k ? styles.chipTextActive : styles.chipText}>{k}-nji kurs</Text>
            </Pressable>
          ))}
        </View>
      )}
      {filtered.map((s) => (
        <View key={s.id} style={styles.card}>
          <Text style={styles.cardTitle}>{s.name}</Text>
          {(subjectDetails[s.id]?.topics || []).map((t) => (
            <Pressable key={t.testId} onPress={() => navigation.navigate('Test', { id: t.testId })}>
              <Text style={styles.link}>📝 {t.name}</Text>
            </Pressable>
          ))}
        </View>
      ))}
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
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 10, gap: 8 },
  cardTitle: { fontWeight: '700', fontSize: 16 },
  link: { color: '#1a56db', marginTop: 4 },
});
