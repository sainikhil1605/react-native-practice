import { createContext, useReducer } from "react";

const ExpenseContext = createContext({
  expenses: [],
  setExpenses: (expenses) => {},
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, description, amount, date) => {},
});
const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      const expenseIndex = state.findIndex((e) => e.id === action.payload.id);
      const updatedExpense = {
        ...state[expenseIndex],
        ...action.payload,
      };
      const updatedExpenses = [...state];
      updatedExpenses[expenseIndex] = updatedExpense;
      return updatedExpenses;
    case "DELETE":
      return state.filter((e) => e.id !== action.payload);
    default:
      return state;
  }
};

const ExpenseContextProvider = (props) => {
  const [expenses, dispatch] = useReducer(expensesReducer, []);
  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };
  const setExpenses = (expenses) => {
    dispatch({ type: "SET", payload: expenses });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpense = ({ id, description, amount, date }) => {
    dispatch({ type: "UPDATE", payload: { id, description, amount, date } });
  };
  return (
    <ExpenseContext.Provider
      value={{
        expenses: expenses,
        addExpense: addExpense,
        setExpenses: setExpenses,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};

export { ExpenseContext, ExpenseContextProvider };
