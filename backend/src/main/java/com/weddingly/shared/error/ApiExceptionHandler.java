package com.weddingly.shared.error;

import java.net.URI;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class ApiExceptionHandler extends ResponseEntityExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(ApiExceptionHandler.class);

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException exception, HttpHeaders headers,
            HttpStatusCode status, WebRequest request) {
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(status, "Please check the submitted fields.");
        problem.setTitle("Validation failed");
        List<FieldViolation> violations = exception.getBindingResult().getFieldErrors().stream()
                .map(error -> new FieldViolation(error.getField(), error.getDefaultMessage()))
                .toList();
        problem.setProperty("errors", violations);
        return handleExceptionInternal(exception, problem, headers, status, request);
    }

    @Override
    protected ResponseEntity<Object> handleExceptionInternal(
            Exception exception, Object body, HttpHeaders headers,
            HttpStatusCode status, WebRequest request) {
        Object responseBody = body;
        if (!(body instanceof ProblemDetail)) {
            HttpStatus knownStatus = HttpStatus.resolve(status.value());
            String detail = knownStatus == null ? "The request could not be completed." : knownStatus.getReasonPhrase();
            responseBody = ProblemDetail.forStatusAndDetail(status, detail);
        }
        if (responseBody instanceof ProblemDetail problem && request instanceof ServletWebRequest servletRequest) {
            problem.setInstance(URI.create(servletRequest.getRequest().getRequestURI()));
        }
        return super.handleExceptionInternal(exception, responseBody, headers, status, request);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<Object> handleUnexpectedException(Exception exception, WebRequest request) {
        LOGGER.error("Unexpected error while handling an API request", exception);
        ProblemDetail problem = ProblemDetail.forStatusAndDetail(
                HttpStatus.INTERNAL_SERVER_ERROR, "An unexpected error occurred. Please try again later.");
        return handleExceptionInternal(exception, problem, new HttpHeaders(), HttpStatus.INTERNAL_SERVER_ERROR, request);
    }

    public record FieldViolation(String field, String message) {
    }
}
