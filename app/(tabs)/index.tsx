import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, useWindowDimensions, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {textStyles} from '../styles/textStyles'

const recentActivity = [
  {
    id: '1',
    title: 'You saved anomaly',
    description: 'Anomaly XY-72-23 added to your active anomaly queue.',
    highlight: false,
  },
  {
    id: '2',
    title: 'Mission completed',
    description: 'Mission Section 31 was completed successfully.',
    highlight: true,
  },
  {
    id: '3',
    title: 'Mission received',
    description: 'A new mission package has arrived from mission control.',
    highlight: false,
  },
];

export default function App() {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();

  const imageWidth = width;
  const imageHeight = imageWidth * (9 / 16); // preserve 16:9 ratio with full-width image

  const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  padhor:{
    flex: 1,
    paddingHorizontal:20,
  },

  image: {
      alignSelf: 'center',
      width: imageWidth,
      height: imageHeight,
      borderRadius: 0,
      marginBottom:20,
    },
  statusCard: {
    width: '100%',
    backgroundColor: '#0b2847',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 12,
    borderWidth: 1,
  },
  statusCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusTitle: {
    color: '#f4f8ff',
    fontSize: 17,
    fontWeight: '700',
  },
  statusText: {
    color: '#f4f8ff',
    fontSize: 15,
    lineHeight: 21,
  },
  statusMetaRow: {
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusMetaText: {
    color: '#9cb4cb',
    fontSize: 10,
    lineHeight: 12,
  },
  sectionHeader: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionIconWrap: {
    width: 28,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sectionTitle: {
    color: '#f4f8ff',
    fontSize: 34,
    fontWeight: '700',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#8fc4e6',
    marginBottom: 8,
  },
  activityRow: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  activityRowHighlight: {
    backgroundColor: '#163553',
  },
  activityThumbWrap: {
    width: 52,
    height: 52,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#8fc4e6',
    marginRight: 10,
  },
  activityThumb: {
    width: '100%',
    height: '100%',
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    color: '#f4f8ff',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
  activityDescription: {
    color: '#c2d7ea',
    fontSize: 13,
    lineHeight: 17,
  },
  bottomSpace: {
    height: 14,
  },
});

  return (
    
    <View style={styles.container}>
      <Image
        source={require('../../assets/image/homeimage.jpg')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.padhor}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <Text style = {textStyles.undertitle}>NASA ANOMALY SCANNER</Text>
      <Text
        style={textStyles.title}
      >
        Home
      </Text>
      <Text style = {textStyles.text}>Review mission status, alerts and activities in one place.</Text>

      <View style={[styles.statusCard, { borderColor: '#52d982' }]}>
        <View style={styles.statusCardRow}>
          <View style={[styles.statusDot, { backgroundColor: '#52d982' }]} />
          <Text style={styles.statusTitle}>In Progress:</Text>
        </View>
        <Text style={styles.statusText}>Prepare for Space Travel</Text>
        <View style={styles.statusMetaRow}>
          <Text style={styles.statusMetaText}>Time Elapsed: 00:00:00</Text>
          <Text style={styles.statusMetaText}>Earth, 48°08'27"N 11°33'18"E</Text>
        </View>
      </View>

      <View style={[styles.statusCard, { borderColor: '#d8df56' }]}>
        <View style={styles.statusCardRow}>
          <Ionicons name="triangle" size={20} color="#ecef35" style={{ marginRight: 8 }} />
          <Text style={styles.statusTitle}>Alert</Text>
        </View>
        <Text style={styles.statusText}>Anomaly EE-8F-XG became unstable.</Text>
        <View style={styles.statusMetaRow}>
          <Text style={styles.statusMetaText}>Time Elapsed: 00:00:00</Text>
          <Text style={styles.statusMetaText}>Earth, 48°08'27"N 17°32'18"E</Text>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <View style={styles.sectionIconWrap}>
          <Ionicons name="time-outline" size={22} color="#f4f8ff" />
        </View>
        <Text style={styles.sectionTitle}>Recent Activity</Text>
      </View>
      <View style={styles.sectionDivider} />
      {recentActivity.map((item) => (
        <View
          key={item.id}
          style={[styles.activityRow, item.highlight ? styles.activityRowHighlight : null]}
        >
          <View style={styles.activityThumbWrap}>
            <Image
              source={require('../../assets/image/homeimage.jpg')}
              style={styles.activityThumb}
              resizeMode="cover"
            />
          </View>
          <View style={styles.activityContent}>
            <Text style={styles.activityTitle}>{item.title}</Text>
            <Text style={styles.activityDescription}>{item.description}</Text>
          </View>
        </View>
      ))}

      <View style={styles.bottomSpace} />
      <StatusBar style="auto" />
      </ScrollView>
      </View>
    </View>
  );
}
