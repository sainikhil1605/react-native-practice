import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../utils/date";
import { useNavigation } from "@react-navigation/native";
const ExpensesList = ({ expenses }) => {
  const navigate = useNavigation();
  const expensePressHandler = (id) => {
    navigate.navigate("ManageExpense", { expenseId: id });
  };
  const renderExpenseItem = ({ item }) => {
    return (
      <Pressable
        style={({ pressed }) => (pressed ? styles.pressed : {})}
        onPress={() => expensePressHandler(item.id)}
      >
        <View style={styles.expenseItem}>
          <View>
            <Text style={[styles.textBase, styles.description]}>
              {item.description}
            </Text>
            <Text style={styles.textBase}>{getFormattedDate(item.date)}</Text>
          </View>
          <View style={styles.amountContainer}>
            <Text>{item.amount.toFixed(2)}</Text>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      keyExtractor={(item) => item.id}
    />
  );
};
export default ExpensesList;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.primary500,
    shadowRadius: 4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    minWidth: 80,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
