package main

import (
	"log"
	"net/http"

	"github.com/Abhaysoft-inc/githall/git-server/internal/api"
	"github.com/Abhaysoft-inc/githall/git-server/internal/config"
	gitops "github.com/Abhaysoft-inc/githall/git-server/internal/git"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	r.POST("/repos", api.CreateRepo)
	r.GET("/repos/:user/:repo/branches", api.ListBranches)

	// Git HTTP protocol endpoints (for git clone, push, pull)
	// Must come after specific API routes to avoid conflicts
	gitHandler := gin.WrapH(http.HandlerFunc(gitops.GitHTTPBackend))
	r.GET("/:user/:repo.git/info/refs", gitHandler)
	r.POST("/:user/:repo.git/git-upload-pack", gitHandler)
	r.POST("/:user/:repo.git/git-receive-pack", gitHandler)

	log.Printf("Server is running on port %s", config.ServerPort)

	r.Run(config.ServerPort)

}
