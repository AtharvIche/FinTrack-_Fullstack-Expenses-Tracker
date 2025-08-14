# FinTrack - Expense Tracker Backend

This repository contains the backend service for FinTrack, a full-stack web application designed for personal expense management. This service is built with **Java** and the **Spring Boot** framework, providing a secure and robust RESTful API.

---

## ✨ Key Features

- **Secure Authentication:** Implemented stateless user authentication and authorization using **Spring Security** and **JSON Web Tokens (JWT)**.
- **RESTful API:** A complete set of REST endpoints for full CRUD (Create, Read, Update, Delete) operations on user and expense data.
- **Data Persistence:** Utilizes **Spring Data JPA** and **Hibernate** for efficient object-relational mapping to a **MySQL** database.
- **User-Specific Data:** Ensures that users can only access and manage their own financial data.
- **Clean Architecture:** Follows best practices, including a service-repository pattern and the use of DTOs for data transfer.

---

## 🛠️ Technologies Used

- **Framework:** Spring Boot, Spring Security, Spring Data JPA
- **Language:** Java 17
- **Database:** MySQL
- **Build Tool:** Maven
- **API Testing:** Postman

---

## 🚀 Getting Started

### Prerequisites

- Java JDK 17 or later
- Maven
- A running MySQL database instance

### Setup and Run

1.  **Clone the repository** (or navigate into this directory if you've cloned the parent repo).

2.  **Configure the database:**
    - Open `src/main/resources/application.properties`.
    - Update the `spring.datasource.url`, `spring.datasource.username`, and `spring.datasource.password` properties to match your local MySQL setup.
    - Set your own secret key for `application.security.jwt.secret-key`.

3.  **Run the application:**
    - You can run the `ExpenseTrackerApplication.java` file from your IDE (like IntelliJ) or build and run from the command line:
    ```bash
    # Build the project
    mvn clean install

    # Run the application
    java -jar target/expense-tracker-0.0.1-SNAPSHOT.jar
    ```
- The server will start on `http://localhost:8080`.

---

## 📋 API Endpoints

- **Authentication**
  - `POST /api/auth/register` - Register a new user.
  - `POST /api/auth/login` - Authenticate a user and receive a JWT.

- **Expenses (Requires JWT Bearer Token)**
  - `POST /api/expenses` - Create a new expense.
  - `GET /api/expenses` - Get all expenses for the authenticated user.
  - `DELETE /api/expenses/{id}` - Delete a specific expense.