import { useContext } from "react";
import { Text, View } from "react-native";
import { FavoritesContext } from "../store/context/favorites-context";
import MealsList from "../components/MealsList";
import { MEALS } from "../data/dummy-data";

const FavouritesScreen = () => {
  const { ids } = useContext(FavoritesContext);
  //   console.log(ids);
  const favoriteMeals = MEALS.filter((meal) => ids.indexOf(meal.id) >= 0);
  //   console.log(favoriteMeals);
  if (favoriteMeals.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white" }}>
          No favorite meals found. Start adding some!
        </Text>
      </View>
    );
  }
  return <MealsList displayedMeals={favoriteMeals} />;
};
export default FavouritesScreen;
