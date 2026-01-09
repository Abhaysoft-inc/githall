package utils

import (
	"path/filepath"
	"strings"
)

func SafeRepoPath(root, user, repo string) string {

	cleanUser := filepath.Clean(user)
	cleanRepo := filepath.Clean(repo)

	cleanRepo = strings.TrimSuffix(cleanRepo, ".git")

	return filepath.Join(root, cleanUser, cleanRepo+".git") // this will gen a repo path where to store the files

}
