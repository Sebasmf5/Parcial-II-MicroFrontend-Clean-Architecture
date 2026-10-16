package co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.repository;

import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.entity.Commit;

import java.util.List;


public abstract class CommitRepository {
    //contrato con los métodos que necesitan sus 3 casos de uso.
    public abstract List<Commit> getAllCommits();
    public abstract Commit getCommitByHash(String hash);
    public abstract List<Commit> getCommitsByAuthorEmail(String authorEmail);
}
