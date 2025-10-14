package com.keyurpandav.jobber.repository;

import com.keyurpandav.jobber.entity.Job;
import com.keyurpandav.jobber.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {
    List<Job> findByEmployer(User employer);


}