import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";

import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import { Colors } from "./constants/styles";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import { useContext, useEffect, useState } from "react";
import IconButton from "./components/ui/IconButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          headerRight: () => (
            <IconButton
              icon="exit"
              size={24}
              color="white"
              onPress={() => {
                logout();
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

function Navigation() {
  const { isAuthenticatied } = useContext(AuthContext);
  if (isAuthenticatied) {
    return (
      <NavigationContainer>
        <AuthenticatedStack />
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}

const Root = () => {
  const { authenticate } = useContext(AuthContext);
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (token) {
        authenticate(token);
      }
      setIsReady(true);
    });
  }, []);
  if (!isReady) return <AppLoading />;
  return <Navigation />;
};
export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthContextProvider>
        <Root />
      </AuthContextProvider>
    </>
  );
}
