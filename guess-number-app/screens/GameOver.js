import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title.android";
import Colors from "../constants/color";

const GameOver = ({ userNumber, startNewGame, roundsNumber }) => {
  const { width, height } = Dimensions.get("window");
  let imageSize = 300;

  if (width < 400) {
    imageSize = 150;
  }
  if (height < 400) {
    imageSize = 80;
  }
  const imageStyle = {
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize / 2,
  };
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.rootContainer}>
        <Title>Game Over</Title>
        <View style={[styles.imgContainer, imageStyle]}>
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
    </ScrollView>
  );
};
export default GameOver;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  rootContainer: {
    flex: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  imgContainer: {
    borderRadius: 150,
    width: deviceWidth < 400 ? 300 : 200,
    height: deviceWidth < 400 ? 300 : 200,
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
