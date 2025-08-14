# FinTrack - Full-Stack Expense Tracker
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2955aea5-6900-4aa7-bcb8-5d51b10d13ce" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ce3d0994-b69c-4529-ba01-45c7cf1eb424" />



**FinTrack** is a secure and modern full-stack web application designed for personal expense management. It provides a clean, interactive user interface to track, manage, and analyze personal expenses, backed by a robust and secure RESTful API.



---

## ✨ Key Features

- **Secure User Authentication:** Stateless user registration and login system using **Spring Security** and **JSON Web Tokens (JWT)**.
- **Data Privacy:** Ensures that each user can only access and manage their own financial data.
- **Full CRUD Functionality:** Complete Create, Read, and Delete operations for expenses.
- **Dynamic Frontend:** A responsive and interactive single-page application (SPA) built with **React**, providing a seamless user experience.
- **Real-time UI Updates:** The interface updates instantly when users add or delete expenses, without needing a page refresh.
- **Clean API Architecture:** A well-structured RESTful API with clear separation of concerns, using a service-repository pattern.

---

## 🛠️ Technology Stack

| Backend                               | Frontend                  |
| ------------------------------------- | ------------------------- |
| **Java 17** | **React.js** (with Vite)  |
| **Spring Boot** | **JavaScript (ES6+)** |
| **Spring Security** (JWT)             | **React Router** |
| **Spring Data JPA / Hibernate** | **Axios** |
| **MySQL** | **CSS3** |
| **Maven** | **Node.js / npm** |

---

## 🚀 Local Setup & Installation

Follow these instructions to get the project running on your local machine.

### Prerequisites

- Git
- Java JDK 17 or later
- Node.js and npm
- A running MySQL database instance

### Installation Steps

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/AtharvIche/FinTrack-_Fullstack-Expenses-Tracker.git](https://github.com/AtharvIchee/FinTrack-_Fullstack-Expenses-Tracker.git)
    cd FinTrack-_Fullstack-Expenses-Tracker
    ```

2.  **Set up the Backend (Spring Boot):**
    - Navigate to the backend directory:
      ```bash
      cd expense-tracker-backend
      ```
    - Open the `src/main/resources/application.properties` file.
    - Update the `spring.datasource.url`, `spring.datasource.username`, and `spring.datasource.password` properties to match your local MySQL configuration.
    - Set your own unique secret key for `application.security.jwt.secret-key`.
    - Run the application from your IDE (like IntelliJ) or by using the Maven wrapper.

3.  **Set up the Frontend (React):**
    - Open a new terminal and navigate to the frontend directory:
      ```bash
      cd expense-tracker-frontend
      ```
    - Install the necessary dependencies:
      ```bash
      npm install
      ```
    - Create a new file in the root of the frontend folder named `.env`.
    - Add the following line to the `.env` file to tell the frontend where the backend is running:
      ```
      VITE_API_URL=http://localhost:8080/api
      ```
    - Start the development server:
      ```bash
      npm run dev
      ```

4.  **You're all set!**
    - The backend will be running on `http://localhost:8080`.
    - The frontend will be available at `http://localhost:5173`.

---

## 📋 API Endpoints

A brief overview of the main API routes:

| Method | Endpoint              | Description                             |
| ------ | --------------------- | --------------------------------------- |
| `POST` | `/api/auth/register`  | Register a new user.                    |
| `POST` | `/api/auth/login`     | Authenticate a user and get a JWT.      |
| `POST` | `/api/expenses`       | Create a new expense (Auth required).   |
| `GET`  | `/api/expenses`       | Get all expenses for a user (Auth required). |
| `DELETE`| `/api/expenses/{id}`  | Delete an expense (Auth required).      |

---

Made by **Atharv Iche**.
