# Security & Validation Enhancements

This document outlines the security and validation improvements implemented in the Job Portal System.

## 🔐 Security Features Implemented

### 1. Input Validation with @Valid Annotations

- **Enhanced DTOs**: Created dedicated DTOs for all API endpoints with comprehensive validation:
  - `ApplicationRequestDto` - For job applications
  - `LoginRequestDto` - For user login
  - `JobStatusUpdateDto` - For job status updates
- **Validation Rules**:
  - Required field validation (`@NotNull`, `@NotBlank`)
  - Size constraints (`@Size`)
  - Pattern matching (`@Pattern`)
  - Email validation (`@Email`)
- **Global Error Handling**: Consistent error response format across all endpoints

### 2. Password Security Enhancements

- **BCrypt Strength**: Increased BCrypt strength to 12 for better security
- **Consistent Encoding**: All passwords are encrypted using BCrypt before storage
- **Secure Password Validation**: Minimum 6 characters with proper validation

### 3. Rate Limiting Implementation

- **Bucket4j Integration**: Token bucket algorithm for rate limiting
- **Endpoint-Specific Limits**:
  - Login: 5 attempts per minute per IP
  - Registration: 3 attempts per hour per IP
  - Job Applications: 10 applications per hour per user
  - General API: 100 requests per minute per IP
- **Real IP Detection**: Handles proxy headers for accurate client identification

### 4. JWT Token Management

- **Dual Token System**: Access tokens (24h) and refresh tokens (7 days)
- **Enhanced Security**:
  - Secure secret key configuration
  - Token validation and expiration handling
  - Automatic token refresh mechanism
- **Rich Claims**: Tokens include user ID, role, email, and full name
- **Comprehensive Validation**: Token signature, expiration, and format validation

### 5. CORS Configuration

- **Enhanced CORS**: Comprehensive CORS setup for production use
- **Security Headers**: Proper header configuration
- **Origin Control**: Configurable allowed origins for different environments

## 🛡️ Security Components

### Exception Handling

```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    // Handles validation errors, constraint violations, and security exceptions
    // Provides consistent error response format
}
```

### Rate Limiting

```java
@Component
public class RateLimitFilter extends OncePerRequestFilter {
    // Applies different rate limits based on endpoint
    // Returns 429 status when limits exceeded
}
```

### JWT Authentication

```java
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    // Processes JWT tokens in Authorization header
    // Sets security context for authenticated requests
}
```

## 📊 API Endpoints

### Authentication Endpoints

- `POST /auth/login` - User login with rate limiting
- `POST /auth/refresh` - Token refresh
- `POST /auth/logout` - User logout
- `GET /auth/validate` - Token validation

### Enhanced Validation

- All `@PostMapping` endpoints now use `@Valid` annotations
- Comprehensive error messages for validation failures
- Consistent error response format

## 🔧 Configuration

### JWT Properties (application.yml)

```yaml
jwt:
  secret: myVerySecureSecretKey123456789012345678901234567890ABCDEFGHIJK
  access-token-expiration: 86400000 # 24 hours
  refresh-token-expiration: 604800000 # 7 days
```

### Security Configuration

- Stateless session management
- JWT filter integration
- Role-based access control
- Enhanced CORS configuration

## 🚀 Usage Examples

### Frontend Integration

```javascript
// Login request
const response = await fetch("/auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "user@example.com",
    password: "password123",
  }),
});

// Using JWT token
const apiCall = await fetch("/api/protected-endpoint", {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```

### Error Handling

All endpoints now return consistent error responses:

```json
{
  "timestamp": "2026-01-13T10:30:00",
  "status": 400,
  "error": "Validation Failed",
  "message": "Input validation errors",
  "path": "/auth/login",
  "validationErrors": {
    "username": "Username is required",
    "password": "Password must be at least 6 characters"
  }
}
```

## 🛠️ Dependencies Added

### JWT Support

```xml
<dependency>
    <groupId>io.jsonwebtoken</groupId>
    <artifactId>jjwt-api</artifactId>
    <version>0.12.3</version>
</dependency>
```

### Rate Limiting

```xml
<dependency>
    <groupId>com.bucket4j</groupId>
    <artifactId>bucket4j-core</artifactId>
    <version>8.7.0</version>
</dependency>
```

## 📈 Security Benefits

1. **Input Validation**: Prevents injection attacks and data corruption
2. **Rate Limiting**: Protects against brute force and DoS attacks
3. **JWT Security**: Stateless authentication with secure token management
4. **Password Security**: Strong encryption with configurable strength
5. **CORS Protection**: Prevents unauthorized cross-origin requests
6. **Error Standardization**: Consistent security response handling

## 🔄 Migration Notes

### Existing API Clients

- Update to use JWT authentication instead of session-based
- Handle new error response format
- Implement token refresh logic
- Respect rate limiting constraints

### Database

- No schema changes required
- Existing password hashes remain compatible
- Enhanced security without breaking changes

## 🧪 Testing

### Security Testing

- Test rate limiting with automated tools
- Validate JWT token expiration and refresh
- Verify input validation for all endpoints
- Test CORS configuration with different origins

### Integration Testing

- Authentication flow testing
- Error handling validation
- Performance testing with rate limits
- Security header verification

This comprehensive security enhancement provides a robust foundation for the job portal system with industry-standard security practices.
