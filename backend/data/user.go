package data

import (
	"fmt"
	"net/http"

	"github.com/co-editing-side-project/backend/util"
)

type User struct {
	Name        string `json:"name"`
	Email       string `json:"email"`
	Password    string `json:"password"`
	DateCreated string `json:"date_created,omitempty"`
	SourceType  string `json:"source_type,omitempty"`
}

func (user *User) Create() *util.HttpError {
	if user.Email == "exist@gmail.com" {
		return &util.HttpError{
			StatusCode: http.StatusConflict,
			Error:      fmt.Errorf("The email already exists."),
		}

	} else if user.Email == "mock_internal_error@gmail.com" {
		return &util.HttpError{
			StatusCode: http.StatusInternalServerError,
			Error:      fmt.Errorf("Internal Server Error"),
		}
	}
	return nil
}
