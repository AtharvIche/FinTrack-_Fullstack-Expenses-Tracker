package com.expensetracker.expense_tracker.service;

import com.expensetracker.expense_tracker.dto.UserDto;
import com.expensetracker.expense_tracker.entity.User;

public interface UserService {
    User registerUser(UserDto userDto);
}
