import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, View, TextInput, useWindowDimensions, TouchableOpacity } from 'react-native';
import { textStyles } from '../styles/textStyles';
import { MaterialIcons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useAnomalies } from '../../context/AnomalyContext';

export default function App() {
  const { width } = useWindowDimensions();
  const photoButtonSize = width * 0.9;
  const { addAnomaly, draft, setDraft } = useAnomalies();

  const pickImageFromGallery = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.status !== 'granted') {
      Alert.alert('Permission needed', 'Please allow access to your photo library to select an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setDraft({ ...draft, imageUri: result.assets[0].uri });
    }
  };

  const saveAnomaly = () => {
    if (!draft.title.trim()) {
      Alert.alert('Missing title', 'Please enter a title before saving.');
      return;
    }

    addAnomaly({
      title: draft.title.trim(),
      description: draft.description.trim(),
      imageUri: draft.imageUri,
    });

    Alert.alert('Saved', 'Your anomaly has been saved.');
  };

  return (
    <View style={styles.container}>
      <Text style={textStyles.undertitle}>CREATE A REPORT</Text>
      <Text style={[textStyles.title, styles.titleSpacing]}>New Anomaly</Text>
      <Text style={textStyles.sys}>Title</Text>

      <TextInput
        value={draft.title}
        onChangeText={(text) => setDraft({ ...draft, title: text })}
        placeholder="Enter anomaly title"
        placeholderTextColor="#8A8A8A"
        style={styles.input}
      />

      <Text style={[textStyles.sys, styles.fieldLabel]}>Description</Text>
      <TextInput
        value={draft.description}
        onChangeText={(text) => setDraft({ ...draft, description: text })}
        placeholder="Put description here"
        placeholderTextColor="#8A8A8A"
        style={[styles.input, styles.descriptionInput]}
        multiline
        textAlignVertical="top"
      />

      <Text style={[textStyles.sys, styles.fieldLabel]}>Image</Text>
      <TouchableOpacity
        style={[styles.photoButton, { width: photoButtonSize, height: photoButtonSize*0.75 }]}
        onPress={pickImageFromGallery}
        activeOpacity={0.8}
      >
        {draft.imageUri ? (
          <Image source={{ uri: draft.imageUri }} style={styles.photoPreview} resizeMode="cover" />
        ) : (
          <>
            <MaterialIcons name="add-a-photo" size={28} color="#84ced6" />
            <Text style={styles.photoButtonText}>Add your photo</Text>
          </>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={[styles.saveButton, { width: width * 0.9 }]} onPress={saveAnomaly} activeOpacity={0.8}> 
        <Text style={styles.saveButtonText}>Save Anomaly</Text>
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
    overflow: 'hidden',
  },
  photoPreview: {
    width: '100%',
    height: '100%',
  },
  photoButtonText: {
    color: '#84ced6',
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
  },
  saveButton: {
    marginTop: 8,
    height: 48,
    borderWidth: 1,
    borderColor: '#217e88',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#217e88',
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});
