import { FaCar, FaShoppingCart, FaTrash, FaUtensils } from 'react-icons/fa';

const ExpenseList = ({ expenses, handleDelete }) => {
    // A simple function to get an icon based on category
    const getCategoryIcon = (categoryName) => {
        if (categoryName.toLowerCase().includes('food')) return <FaUtensils />;
        if (categoryName.toLowerCase().includes('travel')) return <FaCar />;
        return <FaShoppingCart />;
    };
    
    if (expenses.length === 0) {
        return <p>No expenses found.</p>;
    }

    return (
        <div className="expense-list">
            {expenses.map(expense => (
                <div key={expense.id} className="expense-item">
                    <div className="expense-info">
                        <div className="expense-icon">
                            {getCategoryIcon(expense.categoryName)}
                        </div>
                        <div className="expense-details">
                            <div className="description">{expense.description}</div>
                            <div className="category">{expense.categoryName} - {expense.date}</div>
                        </div>
                    </div>
                    <div className="expense-amount">
                        ₹{expense.amount.toFixed(2)}
                    </div>
                    <button onClick={() => handleDelete(expense.id)} className="delete-button">
                        <FaTrash />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ExpenseList;