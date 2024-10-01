import React, { useContext, useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import TotalExpense from "./components/TotalExpenseAmount";
import AppContext from "./AppContext";

interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
}

const App: React.FC = () => {
  const { state, dispatch } = useContext(AppContext);
  const { expenses, editingExpense } = state;
  const addOrEditExpense = (expense: {
    description: string;
    amount: number;
    date: string;
  }) => {
    dispatch({ type: "ADD_EXPENSE", payload: { ...expense, id: Date.now() } });
  };

  const deleteExpense = (id: number) => {
    dispatch({ type: "DELETE_EXPENSE", payload: id });
  };

  const editExpense = (expense: Expense) => {
    dispatch({ type: "EDIT_EXPENSE", payload: expense });
  };

  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  return (
    <div className="w-full bg-gray-200">
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-6">Expense Manager</h1>
        <ExpenseForm
          onAddExpense={addOrEditExpense}
          editingExpense={editingExpense}
        />
        <ExpenseList
          expenses={expenses}
          onDelete={deleteExpense}
          onEdit={editExpense}
        />
        <TotalExpense total={totalExpense} />
      </div>
    </div>
  );
};

export default App;
