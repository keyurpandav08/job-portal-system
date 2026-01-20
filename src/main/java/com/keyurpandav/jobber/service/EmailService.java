package com.keyurpandav.jobber.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    /* =========================================================
       JOB ALERT EMAIL
       ========================================================= */
    public void sendJobAlertEmail(
            String toEmail,
            String userName,
            String jobTitle,
            String companyName,
            String jobLink
    ) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("try.keyurpandav@gmail.com");
            helper.setTo(toEmail);
            helper.setSubject("🚀 New Job Alert: " + jobTitle + " at " + companyName);
            helper.setText(
                    buildJobAlertTemplate(userName, jobTitle, companyName, jobLink),
                    true
            );

            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send job alert email", e);
        }
    }

    /* =========================================================
       APPLICATION CONFIRMATION EMAIL  ✅ FIXED
       ========================================================= */
    public void sendApplicationConfirmation(
            @NotBlank @Email String email,
            @NotBlank @Size(min = 3, max = 100) String jobTitle
    ) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper =
                    new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom("try.keyurpandav@gmail.com");
            helper.setTo(email);
            helper.setSubject("✅ Application Submitted Successfully");
            helper.setText(
                    buildApplicationConfirmationTemplate(jobTitle),
                    true
            );

            mailSender.send(message);

        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send application confirmation email", e);
        }
    }

    /* =========================================================
       HTML TEMPLATE – JOB ALERT
       ========================================================= */
    private String buildJobAlertTemplate(
            String userName,
            String jobTitle,
            String companyName,
            String jobLink
    ) {
        return """
            <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px">
                <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:8px;padding:30px">
                    
                    <h2 style="color:#1f2937">Hello %s 👋</h2>

                    <p style="font-size:16px;color:#374151">
                        A new job opportunity matching your profile is available!
                    </p>

                    <div style="margin:20px 0;padding:20px;background:#f9fafb;border-left:4px solid #2563eb">
                        <h3 style="margin:0;color:#111827">%s</h3>
                        <p style="margin:5px 0;color:#2563eb;font-weight:600">%s</p>
                    </div>

                    <a href="%s"
                       style="display:inline-block;padding:12px 24px;
                              background:#2563eb;color:white;
                              text-decoration:none;border-radius:6px;
                              font-weight:bold">
                        View Job
                    </a>

                    <hr style="margin:30px 0">

                    <p style="font-size:14px;color:#6b7280">
                        You are receiving this email because you subscribed to job alerts on
                        <strong>CareerLink</strong>.
                    </p>

                    <p style="font-size:13px;color:#9ca3af">
                        © 2026 CareerLink. All rights reserved.
                    </p>

                </div>
            </div>
        """.formatted(userName, jobTitle, companyName, jobLink);
    }

    /* =========================================================
       HTML TEMPLATE – APPLICATION CONFIRMATION
       ========================================================= */
    private String buildApplicationConfirmationTemplate(String jobTitle) {
        return """
            <div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px">
                <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:8px;padding:30px">
                    
                    <h2 style="color:#16a34a">Application Submitted 🎉</h2>

                    <p style="font-size:16px;color:#374151">
                        Thank you for applying!
                    </p>

                    <p style="font-size:15px;color:#374151">
                        Your application for the position of
                        <strong>%s</strong> has been successfully submitted.
                    </p>

                    <p style="margin-top:20px;color:#4b5563">
                        Our team will review your profile and get back to you if your
                        qualifications match the requirements.
                    </p>

                    <hr style="margin:30px 0">

                    <p style="font-size:14px;color:#6b7280">
                        Best wishes,<br>
                        <strong>CareerLink Team</strong>
                    </p>

                </div>
            </div>
        """.formatted(jobTitle);
    }
}
