import { useContext, useLayoutEffect } from "react";
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
import { FavoritesContext } from "../store/context/favorites-context.js";
import { useSelector, useDispatch } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites.js";
const MealDetails = ({
  route: {
    params: { mealId },
  },
  navigation,
}) => {
  // const { ids, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const { ids } = useSelector((state) => state.favorites);
  const meal = MEALS.find((meal) => meal.id === mealId);
  const mealIsFavorite = ids.indexOf(mealId) >= 0;
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    navigation.setOptions({
      title: meal.title,
      headerRight: () => (
        <IconButton
          icon={mealIsFavorite ? "star" : "star-outline"}
          color={"white"}
          onPress={headerBtnPressHandler}
        />
      ),
    });
  }, [mealId, mealIsFavorite]);
  const headerBtnPressHandler = () => {
    // console.log("press");
    if (!mealIsFavorite) {
      dispatch(addFavorite(mealId));
    } else {
      dispatch(removeFavorite(mealId));
    }
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
