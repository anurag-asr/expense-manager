interface totalExpenseCount {
  total: number;
}

const TotalExpenseAmount: React.FC<totalExpenseCount> = ({ total }) => {
  return (
    <div className="bg-green-500 shadow-lg p-8 rounded-lg mt-6 text-white ">
      <h2 className="text-2xl font-semibold mb-2">Total Expense</h2>
      <p className="text-4xl font-bold">₹{total.toFixed(2)}</p>
    </div>
  );
};

export default TotalExpenseAmount;
