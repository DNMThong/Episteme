package com.episteme.api.exceptions;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ErrorResponse {
    private int codeError;
    private HttpStatus status;
    private String message;
    private LocalDateTime time = LocalDateTime.now();

    public ErrorResponse(HttpStatus status, String message) {
        this.codeError = status.value();
        this.status = status;
        this.message = message;
        this.time = LocalDateTime.now();
    }
}
