package com.expensetracker.expense_tracker.service;

import com.expensetracker.expense_tracker.dto.ExpenseDto;
import com.expensetracker.expense_tracker.entity.Expense;

import java.util.List;

public interface ExpenseService {
    ExpenseDto createExpense(ExpenseDto expenseDto, String username);
    List<ExpenseDto> getExpensesForUser(String username);
    void deleteExpense(Long expenseId, String username);

}
