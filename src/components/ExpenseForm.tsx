import { useEffect, useState } from "react";

interface ExpenseFormProps {
  onAddExpense: (expense: {
    description: string;
    amount: number;
    date: string;
  }) => void;
  editingExpense: { description: string; amount: number; date: string } | null;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onAddExpense,
  editingExpense,
}) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddExpense({ description, amount: parseFloat(amount), date });
    setDescription("");
    setAmount("");
    setDate("");
  };

  useEffect(() => {
    if (editingExpense) {
      setDescription(editingExpense.description);
      setAmount(editingExpense.amount.toString());
      setDate(editingExpense.date);
    } else {
      setDescription("");
      setAmount("");
      setDate("");
    }
  }, [editingExpense]);

  return (
    <form
      className="bg-slate-400 p-6 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">
          Description
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border focus:outline-none rounded-lg"
          placeholder="Enter expense description"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">
          Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-3 border focus:outline-none rounded-lg"
          placeholder="Enter amount"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white text-sm font-bold mb-2">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-3 border focus:outline-none rounded-lg"
          max={new Date().toISOString().split("T")[0]}
          required
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="bg-white text-purple-700 font-semibold px-6 py-2 rounded-lg hover:bg-indigo-700 hover:text-white transition duration-300 ease-in-out"
        >
          {editingExpense ? "Edit Expense" : "Add Expense"}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
