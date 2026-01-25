package api

import (
	"net/http"
	"os/exec"
	"strings"

	"github.com/Abhaysoft-inc/githall/git-server/internal/config"
	"github.com/Abhaysoft-inc/githall/git-server/internal/utils"
	"github.com/gin-gonic/gin"
)

type TreeEntry struct {
	Mode string `json:"mode"`
	Type string `json:"type"`
	Hash string `json:"hash"`
	Path string `json:"path"`
}

func GetRepoTree(c *gin.Context) {
	user := c.Param("user")
	repo := c.Param("repo")
	ref := c.DefaultQuery("ref", "HEAD")

	path := utils.SafeRepoPath(config.RepoRoot, user, repo)

	cmd := exec.Command("git", "ls-tree", "-r", ref)
	cmd.Dir = path

	output, err := cmd.Output()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Parse the output into structured data
	lines := strings.Split(strings.TrimSpace(string(output)), "\n")
	tree := make([]TreeEntry, 0, len(lines))

	for _, line := range lines {
		if line == "" {
			continue
		}

		// Format: <mode> <type> <hash>\t<path>
		parts := strings.Fields(line)
		if len(parts) < 3 {
			continue
		}

		// Split on tab to get hash and path
		hashPath := strings.SplitN(line, "\t", 2)
		if len(hashPath) != 2 {
			continue
		}

		tree = append(tree, TreeEntry{
			Mode: parts[0],
			Type: parts[1],
			Hash: parts[2],
			Path: hashPath[1],
		})
	}

	c.JSON(http.StatusOK, gin.H{
		"user":  user,
		"repo":  repo,
		"ref":   ref,
		"count": len(tree),
		"tree":  tree,
	})
}
