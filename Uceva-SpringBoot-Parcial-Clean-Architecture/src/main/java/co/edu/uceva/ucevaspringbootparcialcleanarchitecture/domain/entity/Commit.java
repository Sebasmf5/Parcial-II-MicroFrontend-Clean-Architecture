package co.edu.uceva.ucevaspringbootparcialcleanarchitecture.domain.entity;

import java.time.LocalDateTime;
import java.util.List;

public class Commit {

	private final String hash;
	private final String message;
	private final String authorName;
	private final String authorEmail;
	private final String branch;
	private final LocalDateTime createdAt;
	private final List<String> files;

	public Commit(
			String hash,
			String message,
			String authorName,
			String authorEmail,
			String branch,
			LocalDateTime createdAt,
			List<String> files) {
		this.hash = hash;
		this.message = message;
		this.authorName = authorName;
		this.authorEmail = authorEmail;
		this.branch = branch;
		this.createdAt = createdAt;
		this.files = List.copyOf(files);
	}

	public String getHash() {
		return hash;
	}

	public String getMessage() {
		return message;
	}

	public String getAuthorName() {
		return authorName;
	}

	public String getAuthorEmail() {
		return authorEmail;
	}

	public String getBranch() {
		return branch;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}

	public List<String> getFiles() {
		return files;
	}

}
