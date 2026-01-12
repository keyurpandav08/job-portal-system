package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.dto.UserDto;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public UserDto register(@RequestBody User user)
    {
        return userService.register(user);
    }

    @GetMapping
    public List<UserDto> all(Model model){
        return userService.getAll();
    }

    @GetMapping("/email/{email}")
    public UserDto byEmail(@PathVariable String email){ return userService.getByEmail(email); }
}