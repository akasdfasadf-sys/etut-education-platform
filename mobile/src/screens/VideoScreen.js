import { Linking, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useMemo, useState } from 'react';
import { fakultetler, videos } from '../data/mockData';

export default function VideoScreen() {
  const [selectedFakultet, setSelectedFakultet] = useState(null);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let list = videos.filter((v) => v.fakultet === selectedFakultet);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((v) => v.title.toLowerCase().includes(q) || v.desc.toLowerCase().includes(q));
    }
    return list;
  }, [selectedFakultet, query]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Video Sapaklar</Text>
      <View style={styles.rowWrap}>
        {fakultetler.map((f) => (
          <Pressable key={f.id} style={[styles.chip, selectedFakultet === f.id && styles.chipActive]} onPress={() => setSelectedFakultet(f.id)}>
            <Text style={selectedFakultet === f.id ? styles.chipTextActive : styles.chipText}>{f.icon} {f.name}</Text>
          </Pressable>
        ))}
      </View>
      {!!selectedFakultet && <TextInput placeholder="Wideo gözle..." style={styles.input} value={query} onChangeText={setQuery} />}
      {filtered.map((v) => (
        <Pressable key={v.id} style={styles.card} onPress={() => Linking.openURL(`https://www.youtube.com/watch?v=${v.youtubeId}`)}>
          <Text style={styles.cardTitle}>{v.title}</Text>
          <Text>{v.desc}</Text>
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
