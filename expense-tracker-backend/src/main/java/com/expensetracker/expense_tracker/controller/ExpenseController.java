package com.expensetracker.expense_tracker.controller;

import com.expensetracker.expense_tracker.dto.ExpenseDto;
import com.expensetracker.expense_tracker.service.ExpenseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    @PostMapping
    public ResponseEntity<ExpenseDto> createExpense(@RequestBody ExpenseDto expenseDto, Authentication authentication){
        String username = authentication.getName(); //// Get username from the authenticated principal
        ExpenseDto createdExpense = expenseService.createExpense(expenseDto,username);

        return new ResponseEntity<>(createdExpense, HttpStatus.CREATED);

    }

    @GetMapping
    public ResponseEntity<List<ExpenseDto>> getExpenses(Authentication authentication){
        String username = authentication.getName();

        List<ExpenseDto> expenses = expenseService.getExpensesForUser(username);

        return ResponseEntity.ok(expenses);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExpense(@PathVariable Long id, Authentication authentication){
        String username = authentication.getName();
        expenseService.deleteExpense(id,username);
        return ResponseEntity.noContent().build();
    }
}
