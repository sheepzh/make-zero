package main

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"os/user"
	"strings"
	"time"
)

// CORS
func Cors(f http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token")
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("content-type", "application/json;charset=UTF-8")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		f(w, r)
	}
}

func saveFeedback(w http.ResponseWriter, req *http.Request) {
	if req.Method == "PUT" {

		now := time.Now()

		year := now.Year()
		month := now.Month()
		day := now.Day()

		fileName := fmt.Sprintf("feedback-%d-%d-%d.txt", year, month, day)

		u, _ := user.Current()
		fileDir := u.HomeDir + "/"

		for _, arg := range os.Args {
			if strings.HasPrefix(arg, "-fbd=") {
				fileDir = arg[5:] + "/"
			}
		}
		os.MkdirAll(fileDir, 0644)
		filePath := fileDir + fileName
		f, err := os.OpenFile(fileDir+fileName, os.O_WRONLY, 0644)
		if err != nil && os.IsNotExist(err) {
			os.Create(filePath)
		}

		content, _ := ioutil.ReadAll(req.Body)
		n, _ := f.Seek(0, 2)
		_, err = f.WriteAt([]byte(content), n)

		defer f.Close()
		w.WriteHeader(200)
	} else {
		w.WriteHeader(404)
	}
}

func main() {
	http.HandleFunc("/feedback", Cors(saveFeedback))

	err := http.ListenAndServe(":9876", nil)

	if err != nil {
		panic(err.Error())
	}
}
