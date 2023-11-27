import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpenseContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";

const RecentExpenses = () => {
  const { expenses, setExpenses } = useContext(ExpenseContext);
  const [fetchedExpenses, setFetchedExpenses] = useState([]);
  const recentExpenses = fetchedExpenses?.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo;
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchExpenses();
      setFetchedExpenses([...data]);
      setExpenses([...data]);
    };
    fetchData();
  }, []);
  if (recentExpenses) {
    return (
      <ExpensesOutput
        expensesPeriod="Last 7 days"
        expenses={recentExpenses}
        fallbackText="No expenses for the last 7 days"
      />
    );
  }
};

export default RecentExpenses;
