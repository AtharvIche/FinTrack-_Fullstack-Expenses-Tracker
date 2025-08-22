import { useEffect, useState } from 'react';
import { updateExpense } from '../services/api';

const EditExpenseModal = ({ expense, onClose, onExpenseUpdated }) => {
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [date, setDate] = useState('');
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        if (expense) {
            setDescription(expense.description);
            setAmount(expense.amount);
            setDate(expense.date);
            setCategoryName(expense.categoryName);
        }
    }, [expense]);

    if (!expense) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedData = { description, amount: parseFloat(amount), date, categoryName };
        try {
            await updateExpense(expense.id, updatedData);
            onExpenseUpdated();
            onClose();
        } catch (error) {
            console.error("Failed to update expense", error);
        }
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <h2>Edit Expense</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Description</label>
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Amount</label>
                        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Date</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required />
                    </div>
                    {/* Apply the new CSS classes to the buttons */}
                    <div className="form-actions">
                        <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                        <button type="submit" className="btn-primary">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditExpenseModal;