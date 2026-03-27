import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { fakultetler, kurslar, subjects } from '../data/mockData';
import { useMemo, useState } from 'react';

export default function TemalarScreen({ navigation }) {
  const [selectedFakultet, setSelectedFakultet] = useState(null);
  const [selectedKurs, setSelectedKurs] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let list = subjects.filter((s) => s.fakultet === selectedFakultet && s.kurs === selectedKurs);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    }
    return list;
  }, [selectedFakultet, selectedKurs, searchQuery]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dersler we Temalar</Text>
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
      {!!selectedFakultet && !!selectedKurs && <TextInput value={searchQuery} onChangeText={setSearchQuery} placeholder="Ders gözle..." style={styles.input} />}
      {filtered.map((s) => (
        <Pressable key={s.id} style={styles.card} onPress={() => navigation.navigate('SubjectDetail', { id: s.id })}>
          <Text style={styles.cardTitle}>{s.icon} {s.name}</Text>
          <Text>{s.description}</Text>
        </Pressable>
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
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10 },
  card: { backgroundColor: '#fff', padding: 12, borderRadius: 10, gap: 6 },
  cardTitle: { fontWeight: '700', fontSize: 16 },
});
