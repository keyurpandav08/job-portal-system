package com.keyurpandav.jobber.controller;

import com.keyurpandav.jobber.dto.LoginRequestDto;
import com.keyurpandav.jobber.entity.User;
import com.keyurpandav.jobber.security.JwtUtils;
import com.keyurpandav.jobber.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Authentication controller handling login, logout, and token refresh
 */
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JwtUtils jwtUtils;

    /**
     * User login endpoint
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequestDto loginRequest, 
                                  BindingResult bindingResult,
                                  HttpServletRequest request) {
        
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = new HashMap<>();
            bindingResult.getFieldErrors().forEach(error -> 
                errors.put(error.getField(), error.getDefaultMessage())
            );
            return ResponseEntity.badRequest().body(errors);
        }

        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    loginRequest.getUsername(), 
                    loginRequest.getPassword()
                )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            User user = (User) authentication.getPrincipal();
            
            // Generate tokens
            String accessToken = jwtUtils.generateAccessToken(user);
            String refreshToken = jwtUtils.generateRefreshToken(user);
            
            // Log successful login
            String clientIp = getClientIpAddress(request);
            log.info("User {} logged in successfully from IP: {}", user.getUsername(), clientIp);
            
            // Return response
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("user", Map.of(
                "id", user.getId(),
                "username", user.getUsername(),
                "email", user.getEmail(),
                "fullName", user.getFullName(),
                "role", user.getRole().getName()
            ));
            response.put("accessToken", accessToken);
            response.put("refreshToken", refreshToken);
            response.put("tokenType", "Bearer");
            
            return ResponseEntity.ok(response);
            
        } catch (BadCredentialsException e) {
            String clientIp = getClientIpAddress(request);
            log.warn("Failed login attempt for username: {} from IP: {}", 
                    loginRequest.getUsername(), clientIp);
            
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid username or password"));
        } catch (Exception e) {
            log.error("Login error for username: {}", loginRequest.getUsername(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An error occurred during login"));
        }
    }

    /**
     * Refresh access token using refresh token
     */
    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> request,
                                         HttpServletRequest httpRequest) {
        
        String refreshToken = request.get("refreshToken");
        
        if (refreshToken == null || refreshToken.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Refresh token is required"));
        }

        try {
            if (jwtUtils.validateJwtToken(refreshToken) && !jwtUtils.isTokenExpired(refreshToken)) {
                String username = jwtUtils.extractUsername(refreshToken);
                User user = userService.findByUsername(username);
                
                if (user != null) {
                    String newAccessToken = jwtUtils.generateAccessToken(user);
                    
                    Map<String, Object> response = new HashMap<>();
                    response.put("accessToken", newAccessToken);
                    response.put("tokenType", "Bearer");
                    
                    String clientIp = getClientIpAddress(httpRequest);
                    log.info("Token refreshed for user: {} from IP: {}", username, clientIp);
                    
                    return ResponseEntity.ok(response);
                }
            }
            
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Invalid or expired refresh token"));
            
        } catch (Exception e) {
            log.error("Token refresh error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("error", "Token refresh failed"));
        }
    }

    /**
     * Logout endpoint
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        try {
            SecurityContextHolder.clearContext();
            
            String clientIp = getClientIpAddress(request);
            log.info("User logged out from IP: {}", clientIp);
            
            return ResponseEntity.ok(Map.of("message", "Logout successful"));
        } catch (Exception e) {
            log.error("Logout error: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Logout failed"));
        }
    }

    /**
     * Validate current token
     */
    @GetMapping("/validate")
    public ResponseEntity<?> validateToken(HttpServletRequest request) {
        String token = parseJwt(request);
        
        if (token != null && jwtUtils.validateJwtToken(token) && !jwtUtils.isTokenExpired(token)) {
            String username = jwtUtils.extractUsername(token);
            Long userId = jwtUtils.extractUserId(token);
            String role = jwtUtils.extractRole(token);
            
            Map<String, Object> response = new HashMap<>();
            response.put("valid", true);
            response.put("username", username);
            response.put("userId", userId);
            response.put("role", role);
            response.put("shouldRefresh", jwtUtils.shouldRefreshToken(token));
            
            return ResponseEntity.ok(response);
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("valid", false, "error", "Invalid or expired token"));
    }

    /**
     * Extract JWT token from Authorization header
     */
    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        
        if (headerAuth != null && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }
        
        return null;
    }

    /**
     * Get client IP address from request
     */
    private String getClientIpAddress(HttpServletRequest request) {
        String[] headerNames = {
            "X-Forwarded-For", "X-Real-IP", "Proxy-Client-IP", "WL-Proxy-Client-IP",
            "HTTP_X_FORWARDED_FOR", "HTTP_X_FORWARDED", "HTTP_X_CLUSTER_CLIENT_IP",
            "HTTP_CLIENT_IP", "HTTP_FORWARDED_FOR", "HTTP_FORWARDED", "HTTP_VIA", "REMOTE_ADDR"
        };
        
        for (String headerName : headerNames) {
            String value = request.getHeader(headerName);
            if (value != null && !value.isEmpty() && !"unknown".equalsIgnoreCase(value)) {
                return value.split(",")[0].trim();
            }
        }
        
        return request.getRemoteAddr();
    }
}