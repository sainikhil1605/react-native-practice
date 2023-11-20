import { FlatList, StyleSheet, Text, View } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealItem from "../components/MealItem";
import { useLayoutEffect } from "react";
import MealsList from "../components/MealsList";
const MealsOverview = ({
  route: {
    params: { categoryId },
  },
  navigation,
}) => {
  const categoryTitle = CATEGORIES.find((cat) => cat.id === categoryId).title;
  useLayoutEffect(() => {
    navigation.setOptions({ title: categoryTitle });
  }, []);
  const displayedMeals = MEALS.filter(
    (meal) => meal.categoryIds.indexOf(categoryId) >= 0
  );

  return <MealsList displayedMeals={displayedMeals} />;
};
export default MealsOverview;
