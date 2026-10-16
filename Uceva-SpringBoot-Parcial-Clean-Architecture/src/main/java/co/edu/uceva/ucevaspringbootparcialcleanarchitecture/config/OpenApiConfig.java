package co.edu.uceva.ucevaspringbootparcialcleanarchitecture.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI commitsOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Git Commits API")
                        .description("API para consultar commits generados en memoria con JavaFaker.")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Equipo Microfrontends")
                                .email("equipo@example.com")));
    }
}
