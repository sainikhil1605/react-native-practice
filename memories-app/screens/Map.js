import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import OutlinedButton from "../components/Ui/OutlinedButtom";
import IconButton from "../components/Ui/IconButton";
const Map = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const region = {
    latitude: 37.38,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const selectLocationHandler = (e) => {
    const lat = e.nativeEvent.coordinate.latitude;
    const lng = e.nativeEvent.coordinate.longitude;
    console.log(lat, lng);
    setSelectedLocation((prev) => ({ ...prev, lat: lat, lng: lng }));
  };
  const savePickLocationHandler = useCallback(() => {
    console.log(selectedLocation);
    if (!selectedLocation) {
      Alert.alert("No location picked", "Please pick a location", [
        { text: "Okay" },
      ]);
      return;
    }
    navigation.navigate("AddPlace", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [selectedLocation, navigation]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <IconButton
          icon="save"
          size={25}
          onPress={() => savePickLocationHandler()}
          title="Save"
          color={tintColor}
        />
      ),
    });
  }, [savePickLocationHandler]);
  console.log(selectedLocation);
  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
};
export default Map;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
