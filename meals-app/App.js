import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet } from "react-native";
import "react-native-gesture-handler";
import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverview from "./screens/MealsOverview";
import MealDetails from "./screens/MealDetails";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FavoutitesScreen from "./screens/FavouritesScreen";
import FavouritesScreen from "./screens/FavouritesScreen";
import FavortiesContextProvider from "./store/context/favorites-context";
import { Ionicons } from "@expo/vector-icons";
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        // Color of the background of the drawer
        sceneContainerStyle: {
          backgroundColor: "#3f2f25",
        },
        // Color of the header
        headerStyle: {
          backgroundColor: "#724444",
        },
        // Color of the text in the header
        headerTintColor: "white",
        drawerContentStyle: { backgroundColor: "#724444" },
        drawerActiveTintColor: "white",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "Meal Categories",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="FavScreen"
        component={FavouritesScreen}
        options={{
          title: "Favourites",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="star" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <FavortiesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#724444",
              },
              headerTintColor: "white",
              contentStyle: { backgroundColor: "#3f2f25" },
            }}
          >
            <Stack.Screen
              name="MealsCategories"
              component={DrawerNavigator}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MealsOverview"
              component={MealsOverview}
              // options={({ route, navigation }) => {
              //   return { title: categoryId };
              // }}
            />
            <Stack.Screen
              name="MealDetails"
              component={MealDetails}
              // options={{
              //   headerRight: () => (
              //     <Button
              //       title="Fav"
              //       onPress={() => {
              //         console.log("Fav");
              //       }}
              //     />
              //   ),
              // }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavortiesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
});
