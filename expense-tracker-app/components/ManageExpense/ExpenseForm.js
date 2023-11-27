import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useEffect, useState } from "react";
import Button from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../utils/date";

const ExpenseForm = ({ isEditing, onSubmit, onCancel, defaultValues }) => {
  const [form, setForm] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: !!defaultValues,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: !!defaultValues,
    },

    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: !!defaultValues,
    },
  });

  const formChangeHandler = (inputIdentifier, text) => {
    setForm((prevState) => {
      return {
        ...prevState,
        [inputIdentifier]: { value: text, isValid: true },
      };
    });
  };
  const submitHandler = () => {
    const expenseData = {
      amount: +form.amount.value,
      date: new Date(form.date.value),
      description: form.description.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Please enter valid data");
      setForm((prevState) => {
        return {
          ...prevState,
          amount: {
            value: prevState.amount.value,
            isValid: amountIsValid,
          },
          date: {
            value: prevState.date.value,
            isValid: dateIsValid,
          },
          description: {
            value: prevState.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  };
  return (
    <View>
      <View>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (text) => formChangeHandler("amount", text),
          }}
          value={form.amount.value.toString()}
        />
        {form.amount.isValid === false && (
          <Text style={styles.errorText}>Please enter a valid amount</Text>
        )}
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",

            maxLength: 10,
            onChangeText: (text) => formChangeHandler("date", text),
          }}
          value={form.date.value}
        />
        {form.date.isValid === false && (
          <Text style={styles.errorText}>Please enter a valid date</Text>
        )}
        <Input
          label="Description"
          textInputConfig={{
            multiLine: true,
            numberOfLines: 5,
            onChangeText: (text) => formChangeHandler("description", text),
          }}
          value={form.description.value}
        />
        {form.description.isValid === false && (
          <Text style={styles.errorText}>Please enter a valid description</Text>
        )}
      </View>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} mode="flat" onPress={submitHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
    </View>
  );
};
export default ExpenseForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error50,
    fontSize: 18,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 0,
  },
});
