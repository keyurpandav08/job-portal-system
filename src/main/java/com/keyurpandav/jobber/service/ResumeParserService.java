package com.keyurpandav.jobber.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service

public class ResumeParserService {
    private static final List<String> SKILL_KEYWORDS = Arrays.asList(
            "java", "spring", "spring boot", "hibernate", "sql",
            "postgresql", "mysql", "react", "angular", "docker",
            "kubernetes", "aws", "git", "rest", "microservices"
    );

    public String extractSkills(MultipartFile resumeFile) {
        try (InputStream is = resumeFile.getInputStream();
             PDDocument document = PDDocument.load(is)) {

            PDFTextStripper stripper = new PDFTextStripper();
            String text = stripper.getText(document).toLowerCase();

            return SKILL_KEYWORDS.stream()
                    .filter(text::contains)
                    .distinct()
                    .collect(Collectors.joining(", "));

        } catch (Exception e) {
            throw new RuntimeException("Failed to parse resume PDF", e);
        }
    }
    
}
