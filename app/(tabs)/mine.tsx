import { StatusBar } from 'expo-status-bar';
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

type AnomalyCardProps = {
  title: string;
  description: string;
  timestamp: string;
};

function AnomalyCard({ title, description, timestamp }: AnomalyCardProps) {
  const { width } = useWindowDimensions();
  const cardWidth = width - 40;
  const imageHeight = cardWidth * 0.5;

  return (
    <Pressable
      style={[styles.card, { width: cardWidth }]}
      android_ripple={{ color: 'rgba(255,255,255,0.12)' }}
      onPress={() => {
        // Card press handler can be wired to navigation details later.
      }}
    >
      <Image
        source={require('../../assets/image/homeimage.jpg')}
        style={[styles.cardImage, { height: imageHeight }]}
        resizeMode="cover"
      />

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{title}</Text>
        <Text style={styles.cardDescription}>{description}</Text>
        <Text style={styles.cardTime}>{timestamp}</Text>
      </View>
    </Pressable>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.eyebrow}>ASSIGNED TO YOU</Text>
      <Text style={styles.heading}>My Anomalies</Text>

      <AnomalyCard
        title="Mission Section 31"
        description="A very complicated mission."
        timestamp="3/26/2026 7:09:50 PM"
      />

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
  card: {
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#14385e',
    backgroundColor: '#0a2746',
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
});
