import { Image, StyleSheet, Text, View } from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/color";

const GameOver = ({ userNumber, startNewGame, roundsNumber }) => {
  return (
    <View style={styles.rootContainer}>
      <Title>Game Over</Title>
      <View style={styles.imgContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>
      <Text style={styles.summaryText}>
        Your Phone needed{" "}
        <Text style={styles.highlight}>{roundsNumber.length}</Text> rounds to
        guess number <Text style={styles.highlight}>{userNumber}</Text>
      </Text>

      <PrimaryButton onPress={startNewGame}>Start New Button</PrimaryButton>
    </View>
  );
};
export default GameOver;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  imgContainer: {
    borderRadius: 150,
    width: 300,
    height: 300,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 24,
  },
  highlight: {
    color: Colors.primary700,
    fontFamily: "open-sans-bold",
  },
  listItem: {
    fontFamily: "open-sans",
    fontSize: 18,
    marginVertical: 12,
    padding: 12,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    color: Colors.primary800,
  },
});
