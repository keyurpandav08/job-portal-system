package com.keyurpandav.jobber.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendAcceptanceMail(String to, String jobTitle) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("🎉 Job Application Accepted");
        message.setText(
                "Congratulations!\n\n" +
                "Your application for the position of '" + jobTitle + "' has been ACCEPTED.\n\n" +
                "Best of luck!\nCareerLink Team"
        );
        mailSender.send(message);
    }
}