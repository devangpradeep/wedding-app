package com.weddingly.shared.error;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.not;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ApiExceptionHandlerTest.TestController.class)
@Import({ApiExceptionHandler.class, ApiExceptionHandlerTest.TestController.class})
class ApiExceptionHandlerTest {

    @Autowired
    private MockMvc mvc;

    @Test
    void reportsFieldValidationWithoutEchoingRejectedValues() throws Exception {
        mvc.perform(post("/api/test/validation")
                        .contentType(MediaType.APPLICATION_JSON).content("{\"name\":\"\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.title").value("Validation failed"))
                .andExpect(jsonPath("$.errors[0].field").value("name"))
                .andExpect(jsonPath("$.errors[0].message").value("A name is required."))
                .andExpect(jsonPath("$.errors[0].rejectedValue").doesNotExist());
    }

    @Test
    void hidesUnexpectedExceptionDetails() throws Exception {
        mvc.perform(get("/api/test/failure"))
                .andExpect(status().isInternalServerError())
                .andExpect(content().contentTypeCompatibleWith(MediaType.APPLICATION_PROBLEM_JSON))
                .andExpect(jsonPath("$.detail").value("An unexpected error occurred. Please try again later."))
                .andExpect(content().string(not(containsString("internal-secret"))))
                .andExpect(jsonPath("$.trace").doesNotExist());
    }

    @RestController
    static class TestController {

        @PostMapping("/api/test/validation")
        ValidatedRequest validate(@Valid @RequestBody ValidatedRequest request) {
            return request;
        }

        @GetMapping("/api/test/failure")
        void fail() {
            throw new IllegalStateException("internal-secret");
        }
    }

    record ValidatedRequest(@NotBlank(message = "A name is required.") String name) {
    }
}
