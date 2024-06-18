package com.emprendev.controller;

import lombok.SneakyThrows;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
public class LoggingController {

    private static final Logger logger = LoggerFactory.getLogger(LoggingController.class);
    private final String LogsRepository = "src/test/resources/logs.txt";

    @SneakyThrows
    public LoggingController() {
        // Log a message to test
        logger.info("LoggingController initialized");
        createLoggerRepository();
    }

    @SneakyThrows
    @RequestMapping("/warningLog")
    public void warningLogs() {
        String log = "Este log es de warning";
        writeInLoggerRepository(log);
    }

    @SneakyThrows
    @RequestMapping("/infoLog")
    public void infoLogs() {
        String log = "Este log es de info";
        writeInLoggerRepository(log);
    }

    private void createLoggerRepository() throws IOException {
        Path newFilePath = Paths.get(LogsRepository);
        if (Files.notExists(newFilePath)) {
            Files.createFile(newFilePath);
        }
    }

    private void writeInLoggerRepository(String log) throws IOException {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        String logEntry = String.format("%s - %s", timestamp, log);

        try (BufferedWriter writer = new BufferedWriter(new FileWriter(LogsRepository, true))) {
            writer.write(logEntry);
            writer.newLine(); // To ensure each log is on a new line
        }
    }
}