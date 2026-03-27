import { ScrollView, StyleSheet, Text } from 'react-native';

export default function AboutScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Biz Barada</Text>
      <Text style={styles.body}>
        ETUT.EDU.TM — Oguz han Engineering and Technology University of Turkmenistan tarapyndan hödürlenýän
        döwrebap sanly bilim platformasydyr.
      </Text>
      <Text style={styles.body}>
        Platforma talyplara ders, tema we testler arkaly öwrenmegi ýeňilleşdirýär.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 10 },
  title: { fontSize: 24, fontWeight: '800' },
  body: { color: '#444', lineHeight: 22 },
});
