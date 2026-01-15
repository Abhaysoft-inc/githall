package api

import (
	"net/http"

	"github.com/Abhaysoft-inc/githall/git-server/internal/config"
	gitops "github.com/Abhaysoft-inc/githall/git-server/internal/git"
	"github.com/Abhaysoft-inc/githall/git-server/internal/utils"
	"github.com/gin-gonic/gin"
)

// creates bare repo

func CreateRepo(c *gin.Context) {
	// request body
	var body struct {
		User string `json:"user`
		Repo string `json:"repo`
	}

	if err := c.BindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return

	}

	// generate path
	path := utils.SafeRepoPath(config.RepoRoot, body.User, body.Repo)

	// create bare repo on `path`
	err := gitops.CreateBareRepo(path)

	// if something went wrong
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
	}

	// if successfull, repo created
	c.JSON(201, gin.H{"status": "repo created"})

}

// list branches
func ListBranches(c *gin.Context) {
	user := c.Param("user")
	repo := c.Param("repo")

	path := utils.SafeRepoPath(config.RepoRoot, user, repo)
	branches, err := gitops.ListBranches(path)

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"branches": branches})
}
