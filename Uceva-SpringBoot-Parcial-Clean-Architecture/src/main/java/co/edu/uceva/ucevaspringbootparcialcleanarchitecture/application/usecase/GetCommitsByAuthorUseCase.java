package co.edu.uceva.ucevaspringbootparcialcleanarchitecture.application.usecase;

import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.entity.Commit;
import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.repository.CommitRepository;

import java.util.List;

public class GetCommitsByAuthor {
    private final CommitRepository commitRepository;

    public GetCommitsByAuthor(CommitRepository commitRepository) {
        this.commitRepository = commitRepository;
    }

    public List<Commit> getCommitsByAuthor(String author) { return commitRepository.getCommitsByAuthor(author);}

}
