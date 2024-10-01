import React, { createContext, useReducer, ReactNode } from "react";

interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string;
}

type ExpenseState = {
  expenses: Expense[];
  editingExpense: Expense | null;
};

type Action =
  | { type: "ADD_EXPENSE"; payload: Expense }
  | { type: "EDIT_EXPENSE"; payload: Expense }
  | { type: "DELETE_EXPENSE"; payload: number }
  | { type: "SET_EDITING_EXPENSE"; payload: Expense | null };

const initialState: ExpenseState = {
  expenses: [],
  editingExpense: null,
};

const AppContext = createContext<{
  state: ExpenseState;
  dispatch: React.Dispatch<Action>;
}>({ state: initialState, dispatch: () => null });

const expenseReducer = (state: ExpenseState, action: Action): ExpenseState => {
  switch (action.type) {
    case "ADD_EXPENSE":
      if (state.editingExpense) {
        return {
          ...state,
          expenses: state.expenses.map((exp) =>
            exp.id === state.editingExpense?.id
              ? { ...action.payload, id: exp.id }
              : exp
          ),
          editingExpense: null,
        };
      } else {
        return {
          ...state,
          expenses: [...state.expenses, { ...action.payload, id: Date.now() }],
        };
      }
    case "EDIT_EXPENSE":
      return {
        ...state,
        editingExpense: action.payload,
      };
    case "DELETE_EXPENSE":
      return {
        ...state,
        expenses: state.expenses.filter((exp) => exp.id !== action.payload),
      };
    case "SET_EDITING_EXPENSE":
      return {
        ...state,
        editingExpense: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(expenseReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
