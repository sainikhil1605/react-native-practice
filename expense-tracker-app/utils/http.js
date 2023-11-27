import axios from "axios";
const storeExpense = (expenseData) => {
  try {
    axios.post(
      "https://expenses-ap-default-rtdb.firebaseio.com/expenses.json",
      expenseData
    );
  } catch (err) {
    console.log(err);
  }
};
const fetchExpenses = async () => {
  try {
    const data = await axios.get(
      "https://expenses-ap-default-rtdb.firebaseio.com/expenses.json"
    );
    const expenses = [];
    for (const key in data.data) {
      expenses.push({
        id: key,
        amount: data.data[key].amount,
        date: new Date(data.data[key].date),
        description: data.data[key].description,
      });
    }
    return expenses;
  } catch (err) {
    console.log(err);
  }
};
const updatedExpense = async (id, expenseData) => {
  axios.put(
    `https://expenses-ap-default-rtdb.firebaseio.com/expenses/${id}.json`,
    expenseData
  );
};
const deleteExpense = async (id) => {
  axios.delete(
    `https://expenses-ap-default-rtdb.firebaseio.com/expenses/${id}.json`
  );
};

export { storeExpense, fetchExpenses, updatedExpense, deleteExpense };
