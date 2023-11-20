import { useLayoutEffect } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MEALS } from "../data/dummy-data";
import MealInfo from "../components/MealInfo.js";
import IconButton from "../components/IconButton.js";

const MealDetails = ({
  route: {
    params: { mealId },
  },
  navigation,
}) => {
  const meal = MEALS.find((meal) => meal.id === mealId);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: meal.title,
      headerRight: () => (
        <IconButton icon="star" color="white" onPress={headerBtnPressHandler} />
      ),
    });
  }, []);
  const headerBtnPressHandler = () => {
    console.log("Fav");
  };
  return (
    <View style={styles.container}>
      <Image source={{ uri: meal.imageUrl }} style={styles.imgContainer} />
      <Text style={styles.title}>{meal.title}</Text>
      <MealInfo
        textStyle={{ color: "white" }}
        duration={meal.duration}
        complexity={meal.complexity}
        affordability={meal.affordability}
      />
      <ScrollView>
        <View style={styles.listContainer}>
          <Text style={styles.subTitle}>Ingredients</Text>
          {meal.ingredients.map((ingredient) => {
            return (
              <Text style={styles.listItm} key={ingredient}>
                {ingredient}
              </Text>
            );
          })}
          <Text style={styles.subTitle}>Steps</Text>
          {meal.steps.map((step) => {
            return (
              <Text style={styles.listItm} key={step}>
                {step}
              </Text>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

export default MealDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    width: "100%",
    height: 200,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 8,
    color: "white",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 8,
    color: "white",
    textAlign: "center",
    borderBottomColor: "white",
    borderBottomWidth: 5,
    paddingBottom: 4,
    width: "80%",
  },
  listContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  listItm: {
    backgroundColor: "#f76464",
    width: "80%",
    marginVertical: 5,
    padding: 5,
    borderRadius: 4,

    textAlign: "center",
  },
});
