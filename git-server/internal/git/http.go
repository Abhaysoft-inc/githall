package gitops

import (
	"bufio"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/exec"
	"strconv"
	"strings"

	"github.com/Abhaysoft-inc/githall/git-server/internal/config"
)

func GitHTTPBackend(w http.ResponseWriter, r *http.Request) {
	cmd := exec.Command("git", "http-backend")

	cmd.Env = append(os.Environ(),
		"GIT_PROJECT_ROOT="+config.RepoRoot,
		"GIT_HTTP_EXPORT_ALL=1",
		"PATH_INFO="+r.URL.Path,
		"REQUEST_METHOD="+r.Method,
		"QUERY_STRING="+r.URL.RawQuery,
		"CONTENT_TYPE="+r.Header.Get("Content-Type"),
		"REMOTE_USER="+r.Header.Get("X-Remote-User"),
		"REMOTE_ADDR="+r.RemoteAddr,
		"HTTP_CONTENT_ENCODING="+r.Header.Get("Content-Encoding"),
	)

	cmd.Stdin = r.Body
	stdout, err := cmd.StdoutPipe()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	stderr, err := cmd.StderrPipe()
	if err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	if err := cmd.Start(); err != nil {
		http.Error(w, err.Error(), 500)
		return
	}

	// Read and log stderr in background
	go func() {
		scanner := bufio.NewScanner(stderr)
		for scanner.Scan() {
			fmt.Fprintf(os.Stderr, "git-http-backend: %s\n", scanner.Text())
		}
	}()

	// Parse CGI response
	reader := bufio.NewReader(stdout)

	// Read headers
	for {
		line, err := reader.ReadString('\n')
		if err != nil {
			http.Error(w, "Failed to read CGI headers", 500)
			return
		}

		line = strings.TrimSpace(line)
		if line == "" {
			break // End of headers
		}

		// Parse header
		parts := strings.SplitN(line, ":", 2)
		if len(parts) == 2 {
			key := strings.TrimSpace(parts[0])
			value := strings.TrimSpace(parts[1])

			if strings.EqualFold(key, "Status") {
				// Parse status code
				statusParts := strings.SplitN(value, " ", 2)
				if len(statusParts) > 0 {
					if code, err := strconv.Atoi(statusParts[0]); err == nil {
						w.WriteHeader(code)
					}
				}
			} else {
				w.Header().Set(key, value)
			}
		}
	}

	// Copy body
	io.Copy(w, reader)
	cmd.Wait()
}
