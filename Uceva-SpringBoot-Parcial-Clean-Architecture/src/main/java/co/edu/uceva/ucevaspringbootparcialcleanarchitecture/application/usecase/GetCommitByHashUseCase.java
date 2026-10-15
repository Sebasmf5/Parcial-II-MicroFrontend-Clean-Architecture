package co.edu.uceva.ucevaspringbootparcialcleanarchitecture.application.usecase;

import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.entity.Commit;
import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.repository.CommitRepository;

public class GetCommitByHashUseCase {
    private final CommitRepository commitRepository;
    public GetCommitByHashUseCase(CommitRepository commitRepository) {
        this.commitRepository = commitRepository;
    }

    public Commit execute(String hash) {
        return commitRepository.getCommitByHash(hash);
    }
}
