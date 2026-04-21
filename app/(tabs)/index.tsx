import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, useWindowDimensions } from 'react-native';
import { useTheme } from '@react-navigation/native';
import {textStyles} from '../styles/textStyles'

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
    
    paddingHorizontal:20,
  },

  image: {
      alignSelf: 'center',
      width: imageWidth,
      height: imageHeight,
      borderRadius: 0,
      marginBottom:20,
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
      <Text style = {textStyles.undertitle}>NASA ANOMALY SCANNER</Text>
      <Text
        style={textStyles.title}
      >
        Home
      </Text>
      <Text style = {textStyles.text}>Review mission status, alerts and activities in one place.</Text>
      <StatusBar style="auto" />
      </View>
    </View>
  );
}
