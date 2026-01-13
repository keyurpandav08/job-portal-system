package com.keyurpandav.jobber.config;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import io.github.bucket4j.Refill;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Rate limiting configuration using Bucket4j
 * Implements token bucket algorithm for API rate limiting
 */
@Configuration
public class RateLimitConfig {

    private final ConcurrentHashMap<String, Bucket> buckets = new ConcurrentHashMap<>();

    /**
     * Create rate limiting buckets for different endpoints
     */
    @Bean
    public ConcurrentHashMap<String, Bucket> rateLimitBuckets() {
        return buckets;
    }

    /**
     * Get or create a rate limit bucket for login endpoint
     * Allows 5 login attempts per minute per IP
     */
    public Bucket getLoginBucket(String clientId) {
        return buckets.computeIfAbsent("login:" + clientId, this::createLoginBucket);
    }

    /**
     * Get or create a rate limit bucket for registration endpoint
     * Allows 3 registration attempts per hour per IP
     */
    public Bucket getRegistrationBucket(String clientId) {
        return buckets.computeIfAbsent("register:" + clientId, this::createRegistrationBucket);
    }

    /**
     * Get or create a rate limit bucket for job application endpoint
     * Allows 10 job applications per hour per user
     */
    public Bucket getApplicationBucket(String clientId) {
        return buckets.computeIfAbsent("apply:" + clientId, this::createApplicationBucket);
    }

    /**
     * Get or create a rate limit bucket for general API endpoints
     * Allows 100 requests per minute per IP
     */
    public Bucket getGeneralBucket(String clientId) {
        return buckets.computeIfAbsent("general:" + clientId, this::createGeneralBucket);
    }

    private Bucket createLoginBucket(String clientId) {
        Bandwidth limit = Bandwidth.classic(5, Refill.intervally(5, Duration.ofMinutes(1)));
        return Bucket4j.builder()
                .addLimit(limit)
                .build();
    }

    private Bucket createRegistrationBucket(String clientId) {
        Bandwidth limit = Bandwidth.classic(3, Refill.intervally(3, Duration.ofHours(1)));
        return Bucket4j.builder()
                .addLimit(limit)
                .build();
    }

    private Bucket createApplicationBucket(String clientId) {
        Bandwidth limit = Bandwidth.classic(10, Refill.intervally(10, Duration.ofHours(1)));
        return Bucket4j.builder()
                .addLimit(limit)
                .build();
    }

    private Bucket createGeneralBucket(String clientId) {
        Bandwidth limit = Bandwidth.classic(100, Refill.intervally(100, Duration.ofMinutes(1)));
        return Bucket4j.builder()
                .addLimit(limit)
                .build();
    }
}