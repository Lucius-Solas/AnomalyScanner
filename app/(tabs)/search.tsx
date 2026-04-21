import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type ApodItem = {
  id: string;
  date: string;
  title: string;
  excerpt: string;
  details: string;
  author: string;
  image: string;
};

const records: ApodItem[] = [
  {
    id: '1',
    date: '2026-03-26',
    title: 'Black Holes and Neutron Stars: 218 Mergers and Counting',
    excerpt:
      'What is the sound of two black holes merging in deep space? Sound waves do not propagate in vacuum, but gravitational waves do.',
    details:
      'Using advanced observatories, astronomers identified hundreds of compact object mergers. Each event helps map how stars die and how black holes gain mass.',
    author: 'LIGO / Virgo / KAGRA Collaboration',
    image:
      'https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '2',
    date: '2026-03-25',
    title: 'The Guardians of Rapa Nui beneath the Milky Way',
    excerpt:
      'In the words of today\'s astrophotographer, “What have these silent sentinels watched pass across the sky?”',
    details:
      'A long exposure over Easter Island captures starlight, atmospheric glow, and ancient stone figures aligned under the Milky Way arc.',
    author: 'Rositsa Dimitrova',
    image:
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '3',
    date: '2026-03-23',
    title: 'Light Pillars and Orion over Mohe',
    excerpt:
      'Pictured here are not auroras but light pillars, a phenomenon typically much closer to the ground than aurora curtains.',
    details:
      'In very cold air, flat ice crystals reflect city lights into vertical columns. The sky can look surreal, even while stars remain visible.',
    author: 'APOD Editorial',
    image:
      'https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: '4',
    date: '2026-03-21',
    title: 'Galaxies in the River: NGC 1300 and NGC 1297',
    excerpt:
      'Spiral NGC 1300 and elliptical NGC 1297 are galaxies that lie on the banks of the southern constellation Eridanus.',
    details:
      'At nearly 70 million light-years away, this pair reveals different galaxy architectures: one with a central bar and sweeping spiral arms, another smoother and more compact.',
    author: 'Dietmar Hager and Eric Benson',
    image:
      'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=1400&q=80',
  },
];

export default function App() {
  const [selected, setSelected] = useState<ApodItem | null>(null);

  if (selected) {
    return (
      <View style={styles.container}>
        <View style={styles.detailTopRow}>
          <Text style={styles.detailDate}>{selected.date}</Text>
          <Pressable style={styles.closeButton} onPress={() => setSelected(null)}>
            <Text style={styles.closeButtonText}>x</Text>
          </Pressable>
        </View>

        <ScrollView style={styles.detailScroll} showsVerticalScrollIndicator={false}>
          <Image source={{ uri: selected.image }} style={styles.detailImage} resizeMode="cover" />
          <Text style={styles.detailTitle}>{selected.title}</Text>
          <Text style={styles.detailAuthor}>© {selected.author}</Text>
          <Text style={styles.detailBody}>{selected.details}</Text>
        </ScrollView>

        <Pressable style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save to My Anomalies</Text>
        </Pressable>

        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>EXPLORE RECORDS</Text>
      <Text style={styles.heading}>APOD Search</Text>

      <View style={styles.dateRow}>
        <View>
          <Text style={styles.dateLabel}>FROM</Text>
          <View style={styles.datePill}>
            <Text style={styles.datePillText}>20. Mar 2026</Text>
          </View>
        </View>
        <View>
          <Text style={styles.dateLabel}>TO</Text>
          <View style={styles.datePill}>
            <Text style={styles.datePillText}>26. Mar 2026</Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </Pressable>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {records.map((item) => (
          <Pressable key={item.id} style={styles.card} onPress={() => setSelected(item)}>
            <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.cardTextBlock}>
              <Text style={styles.cardDate}>{item.date}</Text>
              <Text style={styles.cardTitle} numberOfLines={2}>
                {item.title}
              </Text>
              <Text style={styles.cardExcerpt} numberOfLines={2}>
                {item.excerpt}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#031a31',
    paddingTop: 48,
    paddingHorizontal: 16,
  },
  eyebrow: {
    color: '#8f84d8',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.6,
  },
  heading: {
    color: '#f2f6ff',
    fontSize: 40,
    fontWeight: '700',
    marginTop: 6,
    marginBottom: 14,
  },
  dateRow: {
    flexDirection: 'row',
    gap: 18,
    marginBottom: 12,
  },
  dateLabel: {
    color: '#6b82a0',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
  },
  datePill: {
    backgroundColor: '#203650',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  datePillText: {
    color: '#e8f1ff',
    fontSize: 22,
    fontWeight: '500',
  },
  searchButton: {
    backgroundColor: '#7d52ff',
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  list: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    borderRadius: 12,
    backgroundColor: '#0b2847',
    borderWidth: 1,
    borderColor: '#173d66',
    padding: 8,
    marginBottom: 10,
  },
  cardImage: {
    width: 76,
    height: 76,
    borderRadius: 8,
  },
  cardTextBlock: {
    flex: 1,
    marginLeft: 10,
  },
  cardDate: {
    color: '#607b9b',
    fontSize: 11,
    marginBottom: 2,
  },
  cardTitle: {
    color: '#e8f1ff',
    fontSize: 19,
    fontWeight: '700',
    lineHeight: 22,
  },
  cardExcerpt: {
    color: '#7f99b4',
    fontSize: 12,
    marginTop: 4,
    lineHeight: 16,
  },
  detailTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#102c49',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  detailDate: {
    color: '#627e9d',
    fontSize: 12,
    fontWeight: '700',
  },
  closeButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#203b58',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#d7e4f7',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 16,
  },
  detailScroll: {
    flex: 1,
  },
  detailImage: {
    width: '100%',
    height: 240,
    borderRadius: 14,
    marginBottom: 12,
  },
  detailTitle: {
    color: '#f2f6ff',
    fontSize: 39,
    fontWeight: '700',
    lineHeight: 34,
    marginBottom: 8,
  },
  detailAuthor: {
    color: '#6f86a3',
    fontSize: 11,
    marginBottom: 10,
  },
  detailBody: {
    color: '#96abc3',
    fontSize: 19,
    lineHeight: 22,
    paddingBottom: 90,
  },
  saveButton: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 20,
    height: 48,
    borderRadius: 10,
    backgroundColor: '#ff8a33',
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
