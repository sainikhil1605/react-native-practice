import { useContext, useLayoutEffect } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpenseContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { storeExpense } from "../utils/http";

const ManageExpense = ({ route, navigation }) => {
  const { deleteExpense, updateExpense, addExpense, expenses } =
    useContext(ExpenseContext);
  const editedExpenseId = route?.params?.expenseId;
  const isEditing = !!editedExpenseId;
  const selectedExpense = isEditing
    ? expenses.find((expense) => expense.id === editedExpenseId)
    : null;
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: isEditing ? "Edit Expense" : "Add Expense",
      headerRight: ({ tintColor }) => {
        if (isEditing)
          return (
            <IconButton
              icon="trash"
              size={24}
              color={tintColor}
              onPress={deleteExpenseHandler}
            />
          );
      },
    });
  }, [navigation, isEditing]);
  const deleteExpenseHandler = () => {
    deleteExpense(editedExpenseId);
    navigation.goBack();
  };
  const cancelHandler = () => {
    navigation.goBack();
  };
  const confirmHandler = (expense) => {
    if (isEditing) {
      console.log(expense);
      updateExpense({
        ...expense,
        id: editedExpenseId,
      });
    } else {
      storeExpense(expense);
      addExpense({
        ...expense,
      });
    }
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <ExpenseForm
        isEditing={isEditing}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
    </View>
  );
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
});
