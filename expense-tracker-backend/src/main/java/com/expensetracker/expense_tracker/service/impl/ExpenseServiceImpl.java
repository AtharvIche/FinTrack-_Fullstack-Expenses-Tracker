package com.expensetracker.expense_tracker.service.impl;

import com.expensetracker.expense_tracker.dto.ExpenseDto;
import com.expensetracker.expense_tracker.entity.Category;
import com.expensetracker.expense_tracker.entity.Expense;
import com.expensetracker.expense_tracker.entity.User;
import com.expensetracker.expense_tracker.repository.CategoryRepository;
import com.expensetracker.expense_tracker.repository.ExpenseRepository;
import com.expensetracker.expense_tracker.repository.UserRepository;
import com.expensetracker.expense_tracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ExpenseServiceImpl implements ExpenseService {
    @Autowired
    private ExpenseRepository expenseRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public ExpenseDto createExpense(ExpenseDto expenseDto, String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Category category = categoryRepository.findByName(expenseDto.getCategoryName())
                .orElseGet(() -> {
                    Category newCategory = new Category();
                    newCategory.setName(expenseDto.getCategoryName());
                    return categoryRepository.save(newCategory);
                });

        Expense expense = new Expense();
        expense.setDescription(expenseDto.getDescription());
        expense.setAmount(expenseDto.getAmount());
        expense.setDate(expenseDto.getDate());
        expense.setUser(user); //Link the expense to the logged-in user
        expense.setCategory(category); // Link the expense to the category.

        // Save the expense to the database.
        Expense savedExpense = expenseRepository.save(expense);

        //  Return the created expense as a DTO.
        return convertToDto(savedExpense);
    }

    @Override
    public List<ExpenseDto> getExpensesForUser(String username) {
        return expenseRepository.findByUser_Username(username).stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    @Override
    public ExpenseDto updateExpense(Long expenseId, ExpenseDto expenseDto, String username) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        if (!expense.getUser().getUsername().equals(username)) {
            throw new SecurityException("User does not have permission to update this expense");
        }

        Category category = categoryRepository.findByName(expenseDto.getCategoryName())
                .orElseGet(() -> {
                    Category newCategory = new Category();
                    newCategory.setName(expenseDto.getCategoryName());
                    return categoryRepository.save(newCategory);
                });

        expense.setDescription(expenseDto.getDescription());
        expense.setAmount(expenseDto.getAmount());
        expense.setDate(expenseDto.getDate());
        expense.setCategory(category);

        Expense updatedExpense = expenseRepository.save(expense);
        return convertToDto(updatedExpense);
    }

    @Override
    public void deleteExpense(Long expenseId, String username) {
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(() -> new RuntimeException("Expense not found"));

        //*Verify that the user trying to delete the expense is the one who owns it
        if(!expense.getUser().getUsername().equals(username)){
            throw new SecurityException("User does not have permission to delete this expense");
        }

        expenseRepository.delete(expense);
    }

    private ExpenseDto convertToDto(Expense expense){
        ExpenseDto dto = new ExpenseDto();
        dto.setId(expense.getId());
        dto.setDescription(expense.getDescription());
        dto.setAmount(expense.getAmount());
        dto.setDate(expense.getDate());
        dto.setCategoryName(expense.getCategory().getName());
        return dto;
    }
}
