import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { CATEGORIES } from "../data/dummy-data";

const CategoriesScreen = ({ navigation }) => {
  const pressHandler = ({ item }) => {
    // console.log(item.id);
    navigation.navigate("MealsOverview", {
      categoryId: item.id,
    });
  };
  return (
    <FlatList
      numColumns={2}
      renderItem={(item) => (
        <View style={styles.itemTile}>
          <Pressable
            style={({ pressed }) => [
              styles.btnStyle,
              pressed ? { opacity: 0.5 } : null,
            ]}
            android_ripple={{ color: "lightgray", radius: 100 }}
            onPress={() => pressHandler(item)}
          >
            <View
              style={[
                styles.innerContainer,
                { backgroundColor: item.item.color },
              ]}
            >
              <Text>{item.item.title}</Text>
            </View>
          </Pressable>
        </View>
      )}
      data={CATEGORIES}
    />
  );
};
export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    textAlign: "center",
  },
  itemTile: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 8,
    elevation: 10,

    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
  },
  btnStyle: {
    flex: 1,
  },

  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
});
