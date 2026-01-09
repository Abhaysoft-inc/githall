package gitops

import (
	"os"
	"os/exec"

	"github.com/go-git/go-git/v5"
)

// create bare repo

func CreateBareRepo(path string) error {
	if err := os.MkdirAll(path, 0755); err != nil {
		return err
	}

	_, err := git.PlainInit(path, true) // this will create the repo from go-git
	if err != nil {
		return err
	}

	// Enable receive-pack for HTTP push
	cmd := exec.Command("git", "config", "http.receivepack", "true")
	cmd.Dir = path
	if err := cmd.Run(); err != nil {
		return err
	}

	return nil
}

func DeleteRepo(path string) error {
	return os.RemoveAll(path)
}
