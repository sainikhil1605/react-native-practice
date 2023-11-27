import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";

const RecentExpenses = () => {
  const { expenses } = useContext(ExpenseContext);
  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo;
  });
  return (
    <ExpensesOutput
      expensesPeriod="Last 7 days"
      expenses={recentExpenses}
      fallbackText="No expenses for the last 7 days"
    />
  );
};

export default RecentExpenses;
