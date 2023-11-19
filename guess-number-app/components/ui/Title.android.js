import { Dimensions, StyleSheet, Text } from "react-native";

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;
const deviceWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    // borderWidth: Platform.select({ android: 2, ios: 0 }),
    borderWidth: 2,
    borderColor: "white",
    padding: 12,
    marginTop: deviceWidth < 400 ? 24 : 50,
  },
});
