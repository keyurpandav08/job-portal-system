package com.keyurpandav.jobber.config;

import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.List;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("Loading user by username: {}", username);
        
        User user = userRepository.findByUsername(username)
            .orElseThrow(() -> {
                log.error("User not found with username: {}", username);
                return new UsernameNotFoundException("User not found: " + username);
            });

        if (user.getRole() == null) {
            log.error("User {} has no role assigned", username);
            throw new UsernameNotFoundException("User has no role assigned: " + username);
        }

        String roleName = user.getRole().getName();
        String role = roleName.trim().toUpperCase(); // EMPLOYER or APPLICANT (trimmed)
        String authority = "ROLE_" + role;
        log.info("User {} loaded - Role name from DB: '{}', Normalized: '{}', Authority: '{}'", 
                username, roleName, role, authority);
        
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getUsername())
                .password(user.getPassword())
                .authorities(List.of(new SimpleGrantedAuthority(authority)))
                .build();
    }
}
