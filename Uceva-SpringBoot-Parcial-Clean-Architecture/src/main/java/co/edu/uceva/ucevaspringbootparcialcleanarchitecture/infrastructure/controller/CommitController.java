package co.edu.uceva.ucevaspringbootparcialcleanarchitecture.infrastructure.controller;

import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.application.usecase.GetAllCommitsUseCase;
import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.application.usecase.GetCommitByHashUseCase;
import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.application.usecase.GetCommitsByAuthorEmailUseCase;
import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.entity.Commit;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/commits")
public class CommitController {

    private final GetAllCommitsUseCase getAllCommitsUseCase;
    private final GetCommitByHashUseCase getCommitByHashUseCase;
    private final GetCommitsByAuthorEmailUseCase getCommitsByAuthorEmailUseCase;

    public CommitController(GetAllCommitsUseCase getAllCommitsUseCase, GetCommitByHashUseCase getCommitByHashUseCase, GetCommitsByAuthorEmailUseCase getCommitsByAuthorEmailUseCase) {
        this.getAllCommitsUseCase = getAllCommitsUseCase;
        this.getCommitByHashUseCase = getCommitByHashUseCase;
        this.getCommitsByAuthorEmailUseCase = getCommitsByAuthorEmailUseCase;
    }

    @GetMapping
    public List<Commit> getAllCommits() {
        return getAllCommitsUseCase.execute();
    }

    @GetMapping("/{hash}")
    public ResponseEntity<Commit> getCommitByHash(@PathVariable String hash) {
        try {
            Commit commit = getCommitByHashUseCase.execute(hash);
            return commit == null
                    ? ResponseEntity.notFound().build()
                    : ResponseEntity.ok(commit);
        } catch (IllegalArgumentException exception) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/author/{authorEmail}")
    public List<Commit> getCommitsByAuthorEmail(@PathVariable String authorEmail) {
        return getCommitsByAuthorEmailUseCase.execute(authorEmail);
    }
}

