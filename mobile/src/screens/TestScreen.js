import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useEffect, useMemo, useState } from 'react';
import { testsData } from '../data/mockData';

export default function TestScreen({ route }) {
  const id = route.params?.id;
  const subject = testsData[id];
  const [currentQ, setCurrentQ] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(subject?.duration || 0);

  useEffect(() => {
    if (!subject || finished) return;
    const t = setInterval(() => setTimeLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [subject, finished]);

  useEffect(() => {
    if (timeLeft === 0 && subject && !finished) setFinished(true);
  }, [timeLeft, subject, finished]);

  const correct = useMemo(
    () => (subject ? subject.questions.filter((q, i) => userAnswers[i] === q.correct).length : 0),
    [subject, userAnswers]
  );

  if (!subject) return <View style={styles.container}><Text>Test tapylmady.</Text></View>;
  if (finished) return <View style={styles.container}><Text style={styles.title}>Netije: {Math.round((correct / subject.questions.length) * 100)}%</Text></View>;

  const q = subject.questions[currentQ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{subject.title}</Text>
      <Text>⏱ {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}</Text>
      <Text style={styles.q}>{currentQ + 1}. {q.text}</Text>
      {q.options.map((opt, i) => (
        <Pressable key={i} style={[styles.opt, userAnswers[currentQ] === i && styles.optActive]} onPress={() => setUserAnswers((p) => ({ ...p, [currentQ]: i }))}>
          <Text style={userAnswers[currentQ] === i ? styles.optTextActive : styles.optText}>{opt}</Text>
        </Pressable>
      ))}
      <View style={styles.nav}>
        <Pressable style={styles.btn} onPress={() => setCurrentQ((p) => Math.max(0, p - 1))}><Text style={styles.btnText}>Öňki</Text></Pressable>
        {currentQ < subject.questions.length - 1 ? (
          <Pressable style={styles.btn} onPress={() => setCurrentQ((p) => p + 1)}><Text style={styles.btnText}>Indiki</Text></Pressable>
        ) : (
          <Pressable style={styles.btn} onPress={() => setFinished(true)}><Text style={styles.btnText}>Tamamla</Text></Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 10 },
  title: { fontWeight: '800', fontSize: 20 },
  q: { fontSize: 16, fontWeight: '600', marginVertical: 8 },
  opt: { borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 10, marginBottom: 8 },
  optActive: { backgroundColor: '#1a56db', borderColor: '#1a56db' },
  optText: { color: '#111' },
  optTextActive: { color: '#fff' },
  nav: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  btn: { backgroundColor: '#1a1a2e', borderRadius: 8, paddingHorizontal: 14, paddingVertical: 10 },
  btnText: { color: '#fff', fontWeight: '700' },
});
