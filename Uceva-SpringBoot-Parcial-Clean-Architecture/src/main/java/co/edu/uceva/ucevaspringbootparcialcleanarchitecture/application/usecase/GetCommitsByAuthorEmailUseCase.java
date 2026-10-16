package co.edu.uceva.ucevaspringbootparcialcleanarchitecture.application.usecase;

import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.entity.Commit;
import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.repository.CommitRepository;

import java.util.List;

public class GetCommitsByAuthorEmailUseCase {
    private final CommitRepository commitRepository;

    public GetCommitsByAuthorEmailUseCase(CommitRepository commitRepository) {
        this.commitRepository = commitRepository;
    }

    public List<Commit> execute(String authorEmail) {
        if (authorEmail == null || authorEmail.isEmpty()) {
            throw new IllegalArgumentException("El email es obligatorio");
        }
        return commitRepository.getCommitsByAuthorEmail(authorEmail);
    }

}
