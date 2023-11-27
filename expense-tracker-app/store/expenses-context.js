import { createContext, useReducer } from "react";
const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A Pair of Shoes",
    amount: 59.99,
    date: new Date("2023", "11", "24"),
  },
  {
    id: "e2",
    description: "Groceries",
    amount: 100.99,
    date: new Date("2023", "11", "25"),
  },
  {
    id: "e3",
    description: "A New Laptop",
    amount: 259.99,
    date: new Date("2023-10-20"),
  },
  {
    id: "e4",
    description: "A New Desk",
    amount: 199.99,
    date: new Date("2023-10-19"),
  },
  {
    id: "e5",
    description: "A New Book",
    amount: 9.99,
    date: new Date("2023-10-18"),
  },
];
const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, description, amount, date) => {},
});
const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
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
  const [expenses, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);
  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };
  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };
  const updateExpense = (id, description, amount, date) => {
    dispatch({ type: "UPDATE", payload: { id, description, amount, date } });
  };
  return (
    <ExpenseContext.Provider
      value={{
        expenses: expenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};

export { ExpenseContext, ExpenseContextProvider };
