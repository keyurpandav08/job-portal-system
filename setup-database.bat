@echo off
echo ========================================
echo PostgreSQL Database Setup for Job Portal
echo ========================================
echo.

REM Set PostgreSQL bin path (adjust if needed)
set PGBIN=C:\Program Files\PostgreSQL\16\bin
set PGPASSWORD=admin

echo Creating database 'jobberdb'...
echo.

"%PGBIN%\psql.exe" -U postgres -c "CREATE DATABASE jobberdb;"

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo SUCCESS! Database 'jobberdb' created!
    echo ========================================
    echo.
    echo You can now run the Spring Boot application with:
    echo   .\mvnw.cmd spring-boot:run
    echo.
) else (
    echo.
    echo ========================================
    echo ERROR: Failed to create database
    echo ========================================
    echo.
    echo Please check:
    echo 1. PostgreSQL is installed
    echo 2. PostgreSQL service is running
    echo 3. Password is correct (default: admin)
    echo 4. PostgreSQL bin path is correct
    echo.
)

pause
