import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SavedAnomaly, useAnomalies } from '../../context/AnomalyContext';

type AnomalyCardProps = {
  anomaly: SavedAnomaly;
};

function AnomalyCard({ anomaly }: AnomalyCardProps) {
  const { width } = useWindowDimensions();
  const cardWidth = width - 40;
  const imageHeight = cardWidth * 0.5;
  const timestamp = new Date(anomaly.createdAt).toLocaleString();
  const imageSource = anomaly.imageUri
    ? { uri: anomaly.imageUri }
    : require('../../assets/image/homeimage.jpg');

  return (
    <Pressable
      style={[styles.card, { width: cardWidth }]}
      android_ripple={{ color: 'rgba(255,255,255,0.12)' }}
      onPress={() => {
        // Card press handler can be wired to navigation details later.
      }}
    >
      <Image
        source={imageSource}
        style={[styles.cardImage, { height: imageHeight }]}
        resizeMode="cover"
      />

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{anomaly.title}</Text>
        <Text style={styles.cardDescription}>{anomaly.description || 'No description provided.'}</Text>
        <Text style={styles.cardTime}>{timestamp}</Text>
      </View>
    </Pressable>
  );
}

export default function App() {
  const { anomalies } = useAnomalies();

  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>ASSIGNED TO YOU</Text>
      <Text style={styles.heading}>My Anomalies</Text>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {anomalies.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No anomalies yet</Text>
            <Text style={styles.emptyText}>Create one in the New tab and it will appear here.</Text>
          </View>
        ) : (
          anomalies.map((anomaly) => <AnomalyCard key={anomaly.id} anomaly={anomaly} />)
        )}
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
    paddingHorizontal: 20,
  },
  eyebrow: {
    color: '#66d0a6',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  heading: {
    color: '#f4f8ff',
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 14,
  },
  list: {
    flex: 1,
  },
  card: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#14385e',
    backgroundColor: '#0a2746',
    marginBottom: 12,
  },
  cardImage: {
    width: '100%',
  },
  cardBody: {
    paddingHorizontal: 12,
    paddingTop: 10,
    paddingBottom: 10,
  },
  cardTitle: {
    color: '#f5f9ff',
    fontSize: 29,
    fontWeight: '600',
  },
  cardDescription: {
    color: '#8ca4bd',
    fontSize: 14,
    marginTop: 4,
  },
  cardTime: {
    color: '#57718d',
    fontSize: 12,
    marginTop: 8,
  },
  emptyState: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#14385e',
    backgroundColor: '#0a2746',
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  emptyTitle: {
    color: '#f5f9ff',
    fontSize: 18,
    fontWeight: '600',
  },
  emptyText: {
    color: '#8ca4bd',
    fontSize: 14,
    marginTop: 6,
  },
});
