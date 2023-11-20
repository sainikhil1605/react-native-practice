import { FlatList, StyleSheet, Text, View } from "react-native";
import { CATEGORIES, MEALS } from "../data/dummy-data";
import MealItem from "../components/MealItem";
import { useLayoutEffect } from "react";
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

  const renderMealItem = ({ item }) => {
    const mealItemProps = {
      id: item.id,
      title: item.title,
      imageUrl: item.imageUrl,
      duration: item.duration,
      complexity: item.complexity,
      affordability: item.affordability,
    };
    return <MealItem {...mealItemProps} />;
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        renderItem={renderMealItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
export default MealsOverview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontSize: 16,
  },
});
