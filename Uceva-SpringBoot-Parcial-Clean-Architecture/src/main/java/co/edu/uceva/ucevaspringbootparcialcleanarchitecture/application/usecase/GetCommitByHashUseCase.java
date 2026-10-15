package co.edu.uceva.ucevaspringbootparcialcleanarchitecture.application.usecase;

import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.entity.Commit;
import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.repository.CommitRepository;

public class GetCommitByHash {
    private final CommitRepository commitRepository;
    public GetCommitByHash(CommitRepository commitRepository) {
        this.commitRepository = commitRepository;
    }

    public Commit getCommitByHash(String hash) { return commitRepository.getCommitByHash(hash); }
}
