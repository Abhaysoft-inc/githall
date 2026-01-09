package gitops

import (
	"os"
	"path/filepath"
	"time"

	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing/object"
)

func CommitFile(repoPath, filePaths, content, message string) error {
	tmp, err := os.MkdirTemp("", "repo-*")
	if err != nil {
		return err
	}
	defer os.RemoveAll(tmp)

	r, err := git.PlainClone(tmp, false, &git.CloneOptions{
		URL: repoPath,
	})

	if err != nil {
		return err
	}

	wt, _ := r.Worktree()

	fullPath := filepath.Join(tmp, filePaths)
	os.MkdirAll(filepath.Dir(fullPath), 0755)
	os.WriteFile(fullPath, []byte(content), 0644)
	wt.Add(filePaths)

	_, err = wt.Commit(message, &git.CommitOptions{
		Author: &object.Signature{
			Name:  "API Bot",
			Email: "bot@git-server",
			When:  time.Now(),
		},
	})
	if err != nil {
		return err
	}

	return r.Push(&git.PushOptions{})

}
