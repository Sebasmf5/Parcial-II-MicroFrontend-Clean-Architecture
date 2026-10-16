package co.edu.uceva.ucevaspringbootparcialcleanarchitecture.infrastructure.datasource;

import com.github.javafaker.Faker;
import co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.entity.Commit;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class CommitDatasource {

    private static final int DEFAULT_COMMIT_COUNT = 20;
    private static final int AUTHOR_COUNT = 5;

    private final Faker faker = new Faker();
    private final Random random = new Random();
    private final List<Commit> commits;

    private final String[] branches = {
            "main",
            "develop",
            "feature/commits",
            "fix/commit-filter"
    };

    private final String[] filePaths = {
            "src/main/java/domain/entity/Commit.java",
            "src/main/java/domain/repository/CommitRepository.java",
            "src/main/java/application/usecase/GetAllCommitsUseCase.java",
            "src/main/java/infrastructure/datasource/CommitDatasource.java",
            "src/main/resources/application.properties"
    };

    public CommitDatasource() {
        this.commits = generateCommits(DEFAULT_COMMIT_COUNT);
    }

    public List<Commit> getAllCommits() {
        return List.copyOf(commits);
    }

    public Commit getCommitByHash(String hash) {
        return commits.stream()
                .filter(commit -> commit.getHash().equals(hash))
                .findFirst()
                .orElse(null);
    }

    public List<Commit> getCommitsByAuthorEmail(String authorEmail) {
        return commits.stream()
                .filter(commit -> commit.getAuthorEmail().equalsIgnoreCase(authorEmail))
                .toList();
    }

    private List<Commit> generateCommits(int countCommits) {
        List<String> authorNames = generateAuthorNames();
        List<String> authorEmails = generateAuthorEmails(authorNames);
        List<Commit> generatedCommits = new ArrayList<>();

        for (int index = 1; index <= countCommits; index++) {
            int authorIndex = (index - 1) % AUTHOR_COUNT; //distribuir por cada autor 4 commit (si son 5 autores)
            generatedCommits.add(generateCommit(
                    index,
                    authorNames.get(authorIndex),
                    authorEmails.get(authorIndex)));
        }

        return generatedCommits;
    }

    private Commit generateCommit(int index, String authorName, String authorEmail) {
        return new Commit(
                String.format("%07x", index), //hash
                faker.lorem().sentence(5),
                authorName,
                authorEmail,
                randomBranch(),
                LocalDateTime.now().minusDays(index),
                randomFiles());
    }
    //genearar 5 nombres de aurotas
    private List<String> generateAuthorNames() {
        List<String> authorNames = new ArrayList<>();
        for (int index = 0; index < AUTHOR_COUNT; index++) {
            authorNames.add(faker.name().fullName());
        }
        return authorNames;
    }

    private List<String> generateAuthorEmails(List<String> authorNames) {
        List<String> authorEmails = new ArrayList<>();
        for (String authorName : authorNames) {
            String cleanUser = authorName.toLowerCase().replace(" ", ".");
            authorEmails.add(faker.internet().emailAddress(cleanUser));
        }
        return authorEmails;
    }

    private String randomBranch() {
        return branches[random.nextInt(branches.length)];
    }

    private List<String> randomFiles() {
        int fileCount = random.nextInt(3) + 1;
        List<String> selectedFiles = new ArrayList<>();

        for (int index = 0; index < fileCount; index++) {
            String filePath = filePaths[random.nextInt(filePaths.length)];
            if (!selectedFiles.contains(filePath)) {
                selectedFiles.add(filePath);
            }
        }

        return selectedFiles;
    }
}
