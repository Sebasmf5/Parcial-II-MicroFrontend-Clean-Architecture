package co.edu.uceva.ucevaspringbootparcialcleanarchitecture.application.usecase;

import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.entity.Commit;
import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.repository.CommitRepository;

public class GetCommitByHashUseCase {
    private final CommitRepository commitRepository;
    public GetCommitByHashUseCase(CommitRepository commitRepository) {
        this.commitRepository = commitRepository;
    }

    public Commit execute(String hash) {
        if (hash == null || hash.isBlank()) {
            throw new IllegalArgumentException("El hash no puede ser nulo");
        }
        return commitRepository.getCommitByHash(hash.trim());
    }
}
