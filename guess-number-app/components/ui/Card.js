import { StyleSheet, View } from "react-native";
import Colors from "../../constants/color";

const Card = ({ children }) => {
  return <View style={styles.inputContainer}>{children}</View>;
};
export default Card;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4,
    // The following properties are iOS only:
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,

    alignItems: "center",
  },
});
