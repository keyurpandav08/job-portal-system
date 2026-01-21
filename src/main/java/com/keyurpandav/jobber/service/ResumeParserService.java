package com.keyurpandav.jobber.service;

import org.apache.tika.Tika;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ResumeParserService {

    private final Tika tika = new Tika();

    public String extractContent(MultipartFile file) {
        try {
            return tika.parseToString(file.getInputStream());
        } catch (IOException | org.apache.tika.exception.TikaException e) {
            throw new RuntimeException("Failed to parse resume content", e);
        }
    }
}