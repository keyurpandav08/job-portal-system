package com.keyurpandav.jobber.service;

import com.keyurpandav.jobber.entity.Role;
import com.keyurpandav.jobber.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public Role create(String name){
        Role r = new Role();
        r.setName(name);
        return roleRepository.save(r);
    }

    public Role getByName(String name){
        return roleRepository.findByName(name).orElse(null);
    }
}