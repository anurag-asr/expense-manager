interface Expense {
  id: number;
  description: string;
  amount: number;
  date: string; // Format: YYYY-MM-DD
}

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
  onEdit: (expense: Expense) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({
  expenses,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="bg-slate-400 p-6 rounded-lg shadow-lg mt-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">
        Expense List
      </h2>
      {expenses?.length > 0 ? (
        expenses?.map((expense) => (
          <div
            key={expense?.id}
            className="flex justify-between items-center mb-4 p-4 bg-gray-50 rounded-md shadow-sm"
          >
            <span className="text-lg font-medium text-gray-800">
              {expense?.description}
            </span>
            <div className="flex">
              <button className="bg-slate-400 text-white px-4 py-2 rounded-md">
                {expense?.date}
              </button>
              <button className="bg-slate-400 text-white px-4 py-2 rounded-md ml-4">
                ₹{expense?.amount}
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 ml-4"
                onClick={() => onEdit(expense)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 ml-4"
                onClick={() => onDelete(expense?.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500">No expenses found.</p>
      )}
    </div>
  );
};

export default ExpenseList;
