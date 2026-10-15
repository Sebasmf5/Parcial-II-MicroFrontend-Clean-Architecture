package co.edu.uceva.ucevaspringbootparcialcleanarchitecture.infrastructure.repository;

import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.entity.Commit;
import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.repository.CommitRepository;
import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.infrastructure.datasource.CommitDatasource;

import java.util.List;

public class CommitRepositoryImpl extends CommitRepository {

    private final CommitDatasource commitDatasource;
    public CommitRepositoryImpl(CommitDatasource commitDatasource) {
        this.commitDatasource = commitDatasource;
    }


    @Override
    public List<Commit> getAllCommits() {
        return commitDatasource.getAllCommits();
    }

    @Override
    public Commit getCommitByHash(String hash) {
        return commitDatasource.getCommitByHash(hash);
    }

    @Override
    public List<Commit> getCommitsByAuthorEmail(String authorEmail) {
        return commitDatasource.getCommitsByAuthorEmail(authorEmail);
    }
}
