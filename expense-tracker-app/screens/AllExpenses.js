import { useContext } from "react";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from "../store/expenses-context";

const AllExpenses = () => {
  const { expenses } = useContext(ExpenseContext);
  return (
    <ExpensesOutput
      expensesPeriod="Total"
      expenses={expenses}
      fallbackText="No registered expenses found"
    />
  );
};

export default AllExpenses;
