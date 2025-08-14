import { useEffect, useState } from 'react';
import AddExpenseForm from '../components/AddExpenseForm';
import ExpenseList from '../components/ExpenseList';
import { useAuth } from '../context/AuthContext'; // <-- Import the useAuth hook
import { getExpenses } from '../services/api';
import './Dashboard.css';

const DashboardPage = () => {
    const { user, logout } = useAuth(); // <-- Get user and logout function from context
    const [expenses, setExpenses] = useState([]);
    const [total, setTotal] = useState(0);

    const fetchAllExpenses = async () => {
        try {
            const response = await getExpenses();
            setExpenses(response.data);
            const totalAmount = response.data.reduce((sum, expense) => sum + expense.amount, 0);
            setTotal(totalAmount);
        } catch (error) {
            console.error("Failed to fetch expenses", error);
        }
    };
    
    useEffect(() => {
        fetchAllExpenses();
    }, []);

    const handleNewOrDelete = () => {
        fetchAllExpenses(); // Refetch all data on add or delete
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-grid">
                {/* Left Column */}
                <div className="dashboard-left">
                    <div className="card summary-card">
                        {/* The username is now dynamic! */}
                        <h1>Hello, {user ? user.username : 'User'}!</h1>
                        <div className="total-amount">
                            Total Expenses: <br/>
                            ₹{total.toFixed(2)}
                        </div>
                    </div>
                    <div className="card expense-list-card">
                        <h2>Breakdown</h2>
                        <ExpenseList expenses={expenses} handleDelete={handleNewOrDelete} />
                    </div>
                </div>

                {/* Right Column */}
                <div className="dashboard-right">
                    <div className="card profile-card">
                         {/* The username is now dynamic! */}
                         <h4>{user ? user.username : 'User'}</h4>
                         <button onClick={logout}>Sign Out</button>
                    </div>
                    <div className="card">
                        <AddExpenseForm onNewExpense={handleNewOrDelete} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;