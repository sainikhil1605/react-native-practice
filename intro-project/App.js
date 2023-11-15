import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
  const [courseGoals, setCourseGoals] = useState([]); // [
  const [isAddMode, setIsAddMode] = useState(false);

  function addGoalHandler(enteredGoal) {
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { item: enteredGoal, key: Math.random().toString() },
    ]);
    endAddGoal();
  }
  function deleteGoalHandler(id) {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => goal.key !== id);
    });
  }
  const endAddGoal = () => {
    setIsAddMode(false);
  };
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button
          title="Add New Goal"
          color="#5e0acc"
          onPress={() => setIsAddMode(true)}
        />
        <GoalInput
          onAddGoal={addGoalHandler}
          isAddMode={isAddMode}
          onCancel={endAddGoal}
        />
        <View style={styles.listContainer}>
          <FlatList
            data={courseGoals}
            renderItem={({ item }) => (
              <GoalItem
                text={item.item}
                id={item.key}
                onDeleteItem={deleteGoalHandler}
              />
            )}
            keyExtractor={(item, index) => item.key}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  listContainer: {
    flex: 5,
  },
});
