package co.edu.uceva.ucevaspringbootparcialcleanarchitecture.config;

import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.application.usecase.GetAllCommitsUseCase;
import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.application.usecase.GetCommitByHashUseCase;
import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.application.usecase.GetCommitsByAuthorEmailUseCase;
import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.repository.CommitRepository;
import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.infrastructure.datasource.CommitDatasource;
import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.infrastructure.repository.CommitRepositoryImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    CommitDatasource commitDatasource() { return new CommitDatasource(); }

    @Bean
    CommitRepository commitRepository(CommitDatasource commitDatasource) { return new CommitRepositoryImpl(commitDatasource);
    }

    @Bean
    GetAllCommitsUseCase getAllCommitsUseCase(CommitRepository commitRepository) { return  new GetAllCommitsUseCase(commitRepository); }

    @Bean
    GetCommitByHashUseCase getCommitByHashUseCase(CommitRepository commitRepository) { return  new GetCommitByHashUseCase(commitRepository); }

    @Bean
    GetCommitsByAuthorEmailUseCase getCommitsByAuthorEmailUseCase(CommitRepository commitRepository) { return  new GetCommitsByAuthorEmailUseCase(commitRepository); }

}
