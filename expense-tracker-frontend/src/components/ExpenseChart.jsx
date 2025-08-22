import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
    // Process the expense data to group by category and sum amounts
    const dataByCatergory = expenses.reduce((acc, expense) => {
        const category = expense.categoryName;
        if (!acc[category]) {
            acc[category] = 0;
        }
        acc[category] += expense.amount;
        return acc;
    }, {});

    const chartData = {
        labels: Object.keys(dataByCatergory),
        datasets: [
            {
                label: 'Expenses by Category',
                data: Object.values(dataByCatergory),
                backgroundColor: [ // Add some nice colors
                    '#5932ea',
                    '#ff6b6b',
                    '#48bb78',
                    '#f6e05e',
                    '#ed8936',
                ],
                borderColor: '#ffffff',
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Expense Breakdown by Category',
            },
        },
    };

    return <Doughnut data={chartData} options={options} />;
};

export default ExpenseChart;