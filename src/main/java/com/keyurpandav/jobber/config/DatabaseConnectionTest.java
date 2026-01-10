package com.keyurpandav.jobber.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.DatabaseMetaData;

@Configuration
public class DatabaseConnectionTest {
    
    private static final Logger logger = LoggerFactory.getLogger(DatabaseConnectionTest.class);
    
    @Bean
    CommandLineRunner testDatabaseConnection(DataSource dataSource) {
        return args -> {
            try (Connection connection = dataSource.getConnection()) {
                DatabaseMetaData metaData = connection.getMetaData();
                
                logger.info("=================================================");
                logger.info("DATABASE CONNECTION TEST");
                logger.info("=================================================");
                logger.info("✅ Database connection successful!");
                logger.info("Database Product: {}", metaData.getDatabaseProductName());
                logger.info("Database Version: {}", metaData.getDatabaseProductVersion());
                logger.info("Database URL: {}", metaData.getURL());
                logger.info("Database User: {}", metaData.getUserName());
                logger.info("Driver Name: {}", metaData.getDriverName());
                logger.info("Driver Version: {}", metaData.getDriverVersion());
                logger.info("=================================================");
                
            } catch (Exception e) {
                logger.error("=================================================");
                logger.error("❌ DATABASE CONNECTION FAILED!");
                logger.error("=================================================");
                logger.error("Error Type: {}", e.getClass().getSimpleName());
                logger.error("Error Message: {}", e.getMessage());
                logger.error("=================================================");
                logger.error("Troubleshooting Steps:");
                logger.error("1. Check if PostgreSQL is running on localhost:5432");
                logger.error("2. Verify database 'jobberdb' exists");
                logger.error("3. Confirm username 'postgres' and password 'admin' are correct");
                logger.error("4. Check PostgreSQL logs for connection attempts");
                logger.error("=================================================");
                throw e;
            }
        };
    }
}
