import { AnimatePresence, motion } from 'framer-motion';
import { FaCar, FaPencilAlt, FaShoppingCart, FaTrash, FaUtensils } from 'react-icons/fa';
import '../pages/Dashboard.css';

const ExpenseList = ({ expenses, handleDelete, handleEdit }) => {
    // A simple function to get an icon based on category
    const getCategoryIcon = (categoryName) => {
        const name = categoryName.toLowerCase();
        if (name.includes('food') || name.includes('dinner') || name.includes('cafe')) return <FaUtensils />;
        if (name.includes('travel') || name.includes('commute')) return <FaCar />;
        return <FaShoppingCart />;
    };
    
    if (expenses.length === 0) {
        return <p>No expenses match your current filters.</p>;
    }

    return (
        <div className="expense-list">
            <AnimatePresence>
                {expenses.map(expense => (
                    <motion.div
                        key={expense.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="expense-item"
                    >
                        <div className="expense-info">
                            <div className="expense-icon">
                                {getCategoryIcon(expense.categoryName)}
                            </div>
                            <div className="expense-details">
                                <div className="description">{expense.description}</div>
                                <div className="category">{expense.categoryName} - {expense.date}</div>
                            </div>
                        </div>
                        <div className="expense-right-section">
                            <div className="expense-amount">
                                ₹{expense.amount.toFixed(2)}
                            </div>
                            <div className="expense-actions">
                                <button onClick={() => handleEdit(expense)} className="action-button edit-button">
                                    <FaPencilAlt />
                                </button>
                                <button onClick={() => handleDelete(expense.id)} className="action-button delete-button">
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default ExpenseList;