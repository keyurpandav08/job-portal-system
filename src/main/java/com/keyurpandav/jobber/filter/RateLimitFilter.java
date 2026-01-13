package com.keyurpandav.jobber.filter;

import com.keyurpandav.jobber.config.RateLimitConfig;
import io.github.bucket4j.Bucket;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/**
 * Rate limiting filter that applies different rate limits based on endpoint
 */
@Component
@RequiredArgsConstructor
@Slf4j
@Order(1)
public class RateLimitFilter extends OncePerRequestFilter {

    private final RateLimitConfig rateLimitConfig;

    @Override
    protected void doFilterInternal(HttpServletRequest request, 
                                  HttpServletResponse response, 
                                  FilterChain filterChain) throws ServletException, IOException {
        
        String clientIp = getClientIpAddress(request);
        String requestUri = request.getRequestURI();
        String method = request.getMethod();
        
        Bucket bucket = getBucketForRequest(clientIp, requestUri, method);
        
        if (bucket.tryConsume(1)) {
            // Request allowed
            filterChain.doFilter(request, response);
        } else {
            // Rate limit exceeded
            log.warn("Rate limit exceeded for IP: {} on endpoint: {} {}", clientIp, method, requestUri);
            handleRateLimitExceeded(response, requestUri);
        }
    }

    private Bucket getBucketForRequest(String clientIp, String requestUri, String method) {
        // Apply specific rate limits based on endpoint
        if (requestUri.contains("/login") && "POST".equals(method)) {
            return rateLimitConfig.getLoginBucket(clientIp);
        } else if (requestUri.contains("/register") && "POST".equals(method)) {
            return rateLimitConfig.getRegistrationBucket(clientIp);
        } else if (requestUri.contains("/applications/apply") && "POST".equals(method)) {
            return rateLimitConfig.getApplicationBucket(clientIp);
        } else {
            return rateLimitConfig.getGeneralBucket(clientIp);
        }
    }

    private void handleRateLimitExceeded(HttpServletResponse response, String requestUri) throws IOException {
        response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        
        String errorMessage;
        if (requestUri.contains("/login")) {
            errorMessage = "{\"error\":\"Too many login attempts. Please try again in 1 minute.\"}";
        } else if (requestUri.contains("/register")) {
            errorMessage = "{\"error\":\"Too many registration attempts. Please try again in 1 hour.\"}";
        } else if (requestUri.contains("/applications/apply")) {
            errorMessage = "{\"error\":\"Too many job applications. Please try again in 1 hour.\"}";
        } else {
            errorMessage = "{\"error\":\"Rate limit exceeded. Please try again later.\"}";
        }
        
        response.getWriter().write(errorMessage);
    }

    private String getClientIpAddress(HttpServletRequest request) {
        // Check for various headers that might contain the real IP
        String[] headerNames = {
            "X-Forwarded-For",
            "X-Real-IP", 
            "Proxy-Client-IP",
            "WL-Proxy-Client-IP",
            "HTTP_X_FORWARDED_FOR",
            "HTTP_X_FORWARDED",
            "HTTP_X_CLUSTER_CLIENT_IP",
            "HTTP_CLIENT_IP",
            "HTTP_FORWARDED_FOR",
            "HTTP_FORWARDED",
            "HTTP_VIA",
            "REMOTE_ADDR"
        };
        
        for (String headerName : headerNames) {
            String value = request.getHeader(headerName);
            if (value != null && !value.isEmpty() && !"unknown".equalsIgnoreCase(value)) {
                // In case of multiple IPs, take the first one
                return value.split(",")[0].trim();
            }
        }
        
        return request.getRemoteAddr();
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        String path = request.getRequestURI();
        // Skip rate limiting for static resources
        return path.startsWith("/css/") || 
               path.startsWith("/js/") || 
               path.startsWith("/images/") ||
               path.startsWith("/favicon.ico") ||
               path.startsWith("/swagger-ui/") ||
               path.startsWith("/v3/api-docs/");
    }
}