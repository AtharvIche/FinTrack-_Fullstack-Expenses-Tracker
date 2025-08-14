// src/components/AddExpenseForm.jsx
import { useState } from 'react';
import { createExpense } from '../services/api';

const AddExpenseForm = ({ onNewExpense }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [categoryName, setCategoryName] = useState(''); // Changed from default

    const handleSubmit = async (e) => {
        e.preventDefault();
        const expenseData = { description, amount: parseFloat(amount), date, categoryName };
        await createExpense(expenseData);
        onNewExpense(); // Tell the parent to refetch data
        // Clear form
        setDescription(''); setAmount(''); setDate(''); setCategoryName('');
    };

    return (
        <form onSubmit={handleSubmit} className="add-expense-form">
            <h3>Add Expense</h3>
            <div className="form-group">
                <input type="number" placeholder="₹ 0.00" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>
            <div className="form-group">
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="form-group">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            {/* THIS IS NOW A TEXT INPUT FOR CUSTOM CATEGORIES */}
            <div className="form-group">
                <input type="text" placeholder="Category (e.g., Food, Travel)" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
            </div>
            <button type="submit">Add to Expense</button>
        </form>
    );
};
export default AddExpenseForm;