# FinTrack - Expense Tracker Frontend

This is the frontend for the FinTrack application, a modern and responsive user interface for managing personal expenses. It is built with **React** and **Vite**, providing a fast and interactive user experience.

---

## ✨ Key Features

- **Dynamic UI:** A clean, component-based interface built with **React** for managing expenses.
- **Client-Side Routing:** Seamless navigation between login, registration, and the main dashboard using **react-router-dom**.
- **User Authentication:** Secure login and registration forms that communicate with the backend API to manage user sessions with JWTs.
- **State Management:** Utilizes React Hooks (`useState`, `useEffect`) and the **Context API** to manage global user state and local component state.
- **API Integration:** Uses **Axios** to communicate with the backend REST API for all data operations.
- **Protected Routes:** Ensures that only authenticated users can access the main dashboard.

---

## 🛠️ Technologies Used

- **Framework/Library:** React.js, Vite
- **Language:** JavaScript (ES6+)
- **Routing:** React Router
- **API Client:** Axios
- **Styling:** CSS3

---

## 🚀 Getting Started

### Prerequisites

- Node.js and npm (or yarn)

### Setup and Run

1.  **Clone the repository** (or navigate into this directory if you've cloned the parent repo).

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure the backend URL:**
    - Create a file named `.env` in the root of this frontend project.
    - Add the following line, pointing to your running backend server:
    ```
    VITE_API_URL=http://localhost:8080/api
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
- The application will be available at `http://localhost:5173`.