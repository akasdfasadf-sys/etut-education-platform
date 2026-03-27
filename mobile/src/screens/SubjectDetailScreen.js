import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { subjectDetails } from '../data/mockData';

export default function SubjectDetailScreen({ route, navigation }) {
  const id = route.params?.id;
  const subject = subjectDetails[id];

  if (!subject) return <View style={styles.container}><Text>Ders tapylmady.</Text></View>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{subject.name}</Text>
      <Text style={styles.desc}>{subject.description}</Text>
      {subject.topics.map((topic) => (
        <View key={topic.testId} style={styles.row}>
          <Text style={styles.topic}>{topic.num}. {topic.name}</Text>
          <Pressable style={styles.btn} onPress={() => navigation.navigate('Test', { id: topic.testId })}>
            <Text style={styles.btnText}>Testi geç</Text>
          </Pressable>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 10 },
  title: { fontSize: 22, fontWeight: '800' },
  desc: { color: '#555' },
  row: { backgroundColor: '#fff', borderRadius: 10, padding: 12, gap: 8 },
  topic: { fontWeight: '600' },
  btn: { alignSelf: 'flex-start', backgroundColor: '#1a56db', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: '700' },
});
