package co.edu.uceva.ucevaspringbootparcialcleanarchitecture.application.usecase;

import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.entity.Commit;
import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.repository.CommitRepository;

import java.util.List;

public class GetAllCommitsUseCase {
    private final CommitRepository commitRepository;

    public GetAllCommitsUseCase(CommitRepository commitRepository) {
        this.commitRepository = commitRepository;
    }

    public List<Commit> execute() {
        return commitRepository.getAllCommits();
    }
}
