import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useAnomalies } from '../../context/AnomalyContext';

type ApodItem = {
  id: string;
  date: string;
  title: string;
  category: string;
  excerpt: string;
  details: string;
  author: string;
  image: string;
};

type NasaApodResponseItem = {
  date: string;
  title: string;
  explanation?: string;
  media_type: string;
  url?: string;
  hdurl?: string;
  copyright?: string;
};

const APOD_API_KEY = 'DEMO_KEY';
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

function isValidDateInput(value: string) {
  return DATE_REGEX.test(value) && !Number.isNaN(new Date(value).getTime());
}

function mapToApodItem(item: NasaApodResponseItem): ApodItem {
  const image = item.url || item.hdurl || '';

  return {
    id: `${item.date}-${item.title}`,
    date: item.date,
    title: item.title,
    excerpt: item.explanation || 'No summary available.',
    details: item.explanation || 'No details available.',
    author: item.copyright || 'NASA APOD',
    image,
    category: item.media_type,
  };
}

export default function App() {
  const { addAnomaly } = useAnomalies();
  const [selected, setSelected] = useState<ApodItem | null>(null);
  const [fromDate, setFromDate] = useState('2026-03-20');
  const [toDate, setToDate] = useState('2026-03-26');
  const [records, setRecords] = useState<ApodItem[]>([]);
  const [loading, setLoading] = useState(false);

  const saveSelectedToAnomalies = () => {
    if (!selected) {
      return;
    }

    addAnomaly({
      title: selected.title,
      description: selected.details,
      imageUri: selected.image,
    });

    Alert.alert('Saved', 'APOD item was added to my Anomalies.');
  };

  const searchApodRange = async () => {
    const trimmedFrom = fromDate.trim();
    const trimmedTo = toDate.trim();

    if (!isValidDateInput(trimmedFrom) || !isValidDateInput(trimmedTo)) {
      Alert.alert('Invalid date format', 'Use YYYY-MM-DD for both dates.');
      return;
    }

    if (new Date(trimmedFrom) > new Date(trimmedTo)) {
      Alert.alert('Invalid range', 'FROM date must be before TO date.');
      return;
    }

    setLoading(true);

    try {
      const url = `https://api.nasa.gov/planetary/apod?api_key=${APOD_API_KEY}&start_date=${trimmedFrom}&end_date=${trimmedTo}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const json = await response.json();
      const responseItems: NasaApodResponseItem[] = Array.isArray(json) ? json : [json];
      const mappedItems = responseItems
        .filter((item) => item.media_type === 'image')
        .map(mapToApodItem)
        .filter((item) => item.image)
        .sort((a, b) => b.date.localeCompare(a.date));

      setRecords(mappedItems);
    } catch (error) {
      Alert.alert('Search failed', 'Could not load APOD results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

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
          <Text style={styles.detailCategory}>{selected.category.toUpperCase()}</Text>
          <Text style={styles.detailTitle}>{selected.title}</Text>
          <Text style={styles.detailAuthor}>© {selected.author}</Text>
          <Text style={styles.detailBody}>{selected.details}</Text>
        </ScrollView>

        <Pressable style={styles.saveButton} onPress={saveSelectedToAnomalies}>
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
            <TextInput
              value={fromDate}
              onChangeText={setFromDate}
              style={styles.dateInput}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#9aacc1"
            />
          </View>
        </View>
        <View>
          <Text style={styles.dateLabel}>TO</Text>
          <View style={styles.datePill}>
            <TextInput
              value={toDate}
              onChangeText={setToDate}
              style={styles.dateInput}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="YYYY-MM-DD"
              placeholderTextColor="#9aacc1"
            />
          </View>
        </View>
      </View>

      <Pressable style={styles.searchButton} onPress={searchApodRange}>
        <Text style={styles.searchButtonText}>{loading ? 'Searching...' : 'Search'}</Text>
      </Pressable>

      {loading ? (
        <View style={styles.loaderWrap}>
          <ActivityIndicator size="small" color="#c7d8ef" />
        </View>
      ) : null}

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {!loading && records.length === 0 ? (
          <Text style={styles.emptyText}>No records yet. Enter a date range and tap Search.</Text>
        ) : null}
        {records.map((item) => (
          <Pressable key={item.id} style={styles.card} onPress={() => setSelected(item)}>
            <Image source={{ uri: item.image }} style={styles.cardImage} resizeMode="cover" />
            <View style={styles.cardTextBlock}>
              <Text style={styles.cardDate}>{item.date}</Text>
              <Text style={styles.cardCategory}>{item.category.toUpperCase()}</Text>
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
    paddingVertical: 4,
    width: 150,
  },
  dateInput: {
    color: '#e8f1ff',
    fontSize: 14,
    fontWeight: '500',
    paddingVertical: 4,
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
  loaderWrap: {
    alignItems: 'center',
    marginBottom: 8,
  },
  emptyText: {
    color: '#86a1bf',
    fontSize: 14,
    marginTop: 8,
    marginBottom: 12,
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
    marginBottom: 1,
  },
  cardCategory: {
    color: '#7e65f0',
    fontSize: 10,
    fontWeight: '700',
    marginBottom: 4,
  },
  cardTitle: {
    color: '#e8f1ff',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 19,
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
  detailCategory: {
    color: '#7e65f0',
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 6,
  },
  detailTitle: {
    color: '#f2f6ff',
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 33,
    marginBottom: 8,
  },
  detailAuthor: {
    color: '#6f86a3',
    fontSize: 11,
    marginBottom: 10,
  },
  detailBody: {
    color: '#96abc3',
    fontSize: 15,
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
