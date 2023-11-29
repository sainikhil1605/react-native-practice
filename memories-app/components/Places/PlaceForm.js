import { useCallback, useState } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
const PlaceForm = () => {
  const [form, setForm] = useState({ title: "", image: "" });
  const handleFormChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedLocation, setSelectedLocation] = useState();
  const imageTakenHandler = (imgaeUri) => {
    setSelectedImage(imgaeUri);
  };
  const locationPickedHandler = useCallback((location) => {
    setSelectedLocation(location);
  }, []);
  const savePlaceHandler = () => {};
  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={(val) => handleFormChange("title", val)}
        />
      </View>
      <View>
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker onPickLocation={locationPickedHandler} />
        <Button onPress={savePlaceHandler} title="Add Place" />
      </View>
    </ScrollView>
  );
};
export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
