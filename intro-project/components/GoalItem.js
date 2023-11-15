import { Pressable, StyleSheet, Text, View } from "react-native";

const GoalItem = ({ text, onDeleteItem, id }) => {
  return (
    <View style={styles.goalItem}>
      <Pressable
        onPress={() => onDeleteItem(id)}
        android_ripple={{ color: "#dddddd" }}
        style={({ pressed: pressData }) =>
          pressData.pressed && styles.pressedItem
        }
      >
        <Text style={styles.goalText}>{text}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  goalItem: {
    marginVertical: 10,
    backgroundColor: "#5e0acc",
    borderWidth: 1,
    borderRadius: 4,
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "white",
    padding: 10,
  },
});

export default GoalItem;
