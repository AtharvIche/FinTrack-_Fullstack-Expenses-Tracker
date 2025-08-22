import { useEffect, useMemo, useState } from 'react';
import AddExpenseForm from '../components/AddExpenseForm';
import EditExpenseModal from '../components/EditExpenseModal';
import ExpenseChart from '../components/ExpenseChart';
import ExpenseList from '../components/ExpenseList';
import { useAuth } from '../context/AuthContext';
import { deleteExpense, getExpenses } from '../services/api';
import './Dashboard.css';

const DashboardPage = () => {
    const { user, logout } = useAuth();
    const [expenses, setExpenses] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);

    // States for filtering and sorting
    const [filterCategory, setFilterCategory] = useState('All');
    const [sortBy, setSortBy] = useState('newest');

    const fetchAllExpenses = async () => {
        try {
            setLoading(true);
            const response = await getExpenses();
            setExpenses(response.data);
            
            const totalAmount = response.data.reduce((sum, expense) => sum + expense.amount, 0);
            setTotal(totalAmount);
        } catch (error) {
            console.error("Failed to fetch expenses", error);
        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchAllExpenses();
    }, []);

    // This single function handles refetching after any data change
    const handleDataUpdate = () => {
        fetchAllExpenses();
    };

    const handleDeleteExpense = async (id) => {
        try {
            await deleteExpense(id);
            handleDataUpdate(); // Refetch data
        } catch(err) {
            console.error("Failed to delete expense", err);
        }
    };

    const handleEditClick = (expense) => {
        setEditingExpense(expense);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingExpense(null);
    };

    // Memoized calculation for filtering and sorting expenses
    const filteredAndSortedExpenses = useMemo(() => {
        let result = [...expenses];

        if (filterCategory !== 'All') {
            result = result.filter(expense => expense.categoryName === filterCategory);
        }

        switch (sortBy) {
            case 'oldest':
                result.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case 'highest':
                result.sort((a, b) => b.amount - a.amount);
                break;
            case 'lowest':
                result.sort((a, b) => a.amount - b.amount);
                break;
            case 'newest':
            default:
                result.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
        }

        return result;
    }, [expenses, filterCategory, sortBy]);

    // Get a unique list of categories for the filter dropdown
    const categories = useMemo(() => ['All', ...new Set(expenses.map(e => e.categoryName))], [expenses]);

    return (
        <div className="dashboard-page">
            <div className="dashboard-grid">
                {/* Left Column */}
                <div className="dashboard-left">
                    <div className="card summary-card">
                        <h1>Hello, {user ? user.username : 'User'}!</h1>
                        <div className="total-amount">
                            Total Expenses: <br/>
                            ₹{total.toFixed(2)}
                        </div>
                    </div>
                    <div className="card expense-list-card">
                        <div className="list-header">
                            <h2>Breakdown</h2>
                            <div className="filters">
                                <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
                                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                                    <option value="newest">Sort by Newest</option>
                                    <option value="oldest">Sort by Oldest</option>
                                    <option value="highest">Amount: High to Low</option>
                                    <option value="lowest">Amount: Low to High</option>
                                </select>
                            </div>
                        </div>
                        {loading ? <p>Loading...</p> : 
                            <ExpenseList 
                                expenses={filteredAndSortedExpenses}
                                handleDelete={handleDeleteExpense}
                                handleEdit={handleEditClick} 
                            />
                        }
                    </div>
                </div>

                {/* Right Column */}
                <div className="dashboard-right">
                    <div className="card profile-card">
                         <h4>{user ? user.username : 'User'}</h4>
                         <button onClick={logout}>Sign Out</button>
                    </div>
                     <div className="card">
                        <AddExpenseForm onNewExpense={handleDataUpdate} />
                    </div>
                    <div className="card">
                         <h2>By Category</h2>
                         {!loading && expenses.length > 0 && <ExpenseChart expenses={expenses} />}
                    </div>
                </div>
            </div>
            
            {isModalOpen && (
                <EditExpenseModal 
                    expense={editingExpense}
                    onClose={handleCloseModal}
                    onExpenseUpdated={handleDataUpdate}
                />
            )}
        </div>
    );
};

export default DashboardPage;