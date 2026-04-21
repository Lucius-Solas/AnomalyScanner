import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Pressable, useWindowDimensions, TouchableOpacity } from 'react-native';
import { textStyles } from '../styles/textStyles';
import { MaterialIcons} from '@expo/vector-icons';

export default function App() {
  const { width } = useWindowDimensions();
  const photoButtonSize = width * 0.9;

  return (
    <View style={styles.container}>
      <Text style={textStyles.undertitle}>CREATE A REPORT</Text>
      <Text style={[textStyles.title, styles.titleSpacing]}>New Anomaly</Text>
      <Text style={textStyles.sys}>Title</Text>

      <TextInput
        placeholder="Enter anomaly title"
        placeholderTextColor="#8A8A8A"
        style={styles.input}
      />

      <Text style={[textStyles.sys, styles.fieldLabel]}>Description</Text>
      <TextInput
        placeholder="Put description here"
        placeholderTextColor="#8A8A8A"
        style={[styles.input, styles.descriptionInput]}
        multiline
        textAlignVertical="top"
      />

      <Text style={[textStyles.sys, styles.fieldLabel]}>Image</Text>
      <TouchableOpacity style={[styles.photoButton, { width: photoButtonSize, height: photoButtonSize }]}> 
        <MaterialIcons name="add-a-photo" size={28} color="#84ced6" />
        <Text style={styles.photoButtonText}>Add your photo</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.saveButton, { width: width*0.9, height: 20 }]}> 
        <Text style={styles.photoButtonText}>Save Anomaly</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 42,
    paddingHorizontal: 20,
  },
  titleSpacing: {
    marginBottom: 20,
  },
  fieldLabel: {
    marginTop: 14,
  },
  input: {
    width: '100%',
    height: 44,
    borderWidth: 1,
    borderColor: '#6B7280',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#FFFFFF',
    marginTop: 8,
  },
  descriptionInput: {
    height: 110,
    paddingTop: 10,
  },
  photoButton: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#6B7280',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  photoButtonText: {
    color: '#84ced6',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  saveButton: {
    marginTop: 8,
    borderWidth: 1,
    color:'#217e88',
    borderColor: '#6B7280',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
