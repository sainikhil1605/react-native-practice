import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import NumberContainer from "../components/game/NumberContainer";
import Card from "../components/ui/Card";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title.android";
import Colors from "../constants/color";

const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  const randomNum = Math.floor(Math.random() * (max - min)) + min;
  if (randomNum === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return randomNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;
const GameScreen = ({ userNumber, onGameOver }) => {
  const initalGuess = generateRandomNumber(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initalGuess);
  const [rounds, setRounds] = useState([initalGuess]);
  const { width, height } = useWindowDimensions();

  const nextGuessHandler = (direction) => {
    let guess;
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "higher" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess;
    }
    if (direction === "higher") {
      minBoundary = currentGuess + 1;
    }
    guess = generateRandomNumber(minBoundary, maxBoundary, currentGuess);
    setCurrentGuess(guess);
    setRounds((currentRound) => [...currentRound, guess]);
  };

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(currentGuess, rounds);
    }
  }, [currentGuess, userNumber, onGameOver]);
  if (width < 400) {
    content = (
      <>
        <ScrollView>
          <View style={[styles.screen, { marginTop: marginTopDistance }]}>
            <Title>Opponent's Guess</Title>
            <View style={styles.btnsContainer}>
              <View style={styles.btnContainer}>
                <PrimaryButton onPress={() => nextGuessHandler("higher")}>
                  <Ionicons name="md-add" size={24} color="white" />
                </PrimaryButton>
              </View>
              <View style={styles.btnContainer}>
                <PrimaryButton onPress={() => nextGuessHandler("lower")}>
                  <Ionicons name="md-remove" size={24} color="white" />
                </PrimaryButton>
              </View>
            </View>
            <Card>
              <NumberContainer>{currentGuess}</NumberContainer>

              <View style={styles.controlContainer}>
                <Text style={styles.instructionText}>Higher or Lower</Text>
              </View>
            </Card>

            <View>
              <FlatList
                data={rounds}
                renderItem={(data) => (
                  <View style={styles.listItem}>
                    <Text>#{data.index + 1}</Text>
                    <Text>{data.item}</Text>
                  </View>
                )}
                keyExtractor={(item) => item}
              />
            </View>
          </View>
        </ScrollView>
      </>
    );
  }
  const marginTopDistance = height < 400 ? 2 : 12;
  return (
    <ScrollView>
      <View style={[styles.screen, { marginTop: marginTopDistance }]}>
        <Title>Opponent's Guess</Title>
        <Card>
          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.controlContainer}>
            <Text style={styles.instructionText}>Higher or Lower</Text>
            <View style={styles.btnsContainer}>
              <View style={styles.btnContainer}>
                <PrimaryButton onPress={() => nextGuessHandler("higher")}>
                  <Ionicons name="md-add" size={24} color="white" />
                </PrimaryButton>
              </View>
              <View style={styles.btnContainer}>
                <PrimaryButton onPress={() => nextGuessHandler("lower")}>
                  <Ionicons name="md-remove" size={24} color="white" />
                </PrimaryButton>
              </View>
            </View>
          </View>
        </Card>
        <ScrollView>
          <View>
            <FlatList
              data={rounds}
              renderItem={(data) => (
                <View style={styles.listItem}>
                  <Text>#{data.index + 1}</Text>
                  <Text>{data.item}</Text>
                </View>
              )}
              keyExtractor={(item) => item}
            />
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
};
export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  controlContainer: {
    alignItems: "center",
  },
  btnsContainer: {
    flexDirection: "row",
  },
  btnContainer: {
    flex: 1,
  },
  instructionText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 24,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    marginVertical: 12,
    backgroundColor: Colors.accent500,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
  },
});
