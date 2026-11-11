package com.weddingly;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.web.servlet.MockMvc;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** Runs with -Pintegration against an explicitly configured PostgreSQL database. */
@SpringBootTest
@AutoConfigureMockMvc
class DatabaseConnectivityIT {

    @Autowired
    private JdbcTemplate jdbc;

    @Autowired
    private MockMvc mvc;

    @Test
    void startsFullApplicationAndAppliesFlywayMigration() throws Exception {
        assertThat(jdbc.queryForObject("SELECT 1", Integer.class)).isEqualTo(1);
        assertThat(jdbc.queryForObject(
                "SELECT success FROM weddingly.flyway_schema_history WHERE version = '1'", Boolean.class)).isTrue();
        mvc.perform(get("/api/health"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"));
    }
}
