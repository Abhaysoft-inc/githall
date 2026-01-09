package gitops

import (
	"github.com/go-git/go-git/v5"
	"github.com/go-git/go-git/v5/plumbing"
)

func ListBranches(repoPath string) ([]string, error) {
	r, err := git.PlainOpen(repoPath)
	if err != nil {
		return nil, err
	}

	iter, err := r.Branches()

	if err != nil {
		return nil, err
	}

	var branches []string

	iter.ForEach(func(r *plumbing.Reference) error {
		branches = append(branches, r.Name().Short())
		return nil
	})

	return branches, nil

}
