package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.entity.Role;
import com.keyurpandav.jobber.service.RoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/role")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    @PostMapping
    public Role create(@RequestBody Role role){ return roleService.create(role.getName()); }

    @GetMapping("/{name}")
    public Role byName(@PathVariable String name){ return roleService.getByName(name); }
}