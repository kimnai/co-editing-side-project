package service

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/co-editing-side-project/backend/data"
	"github.com/co-editing-side-project/backend/util"
)

var (
	UserService userServiceInterface = &userServiceImp{}
)

type userServiceImp struct{}

type userServiceInterface interface {
	CreateUser(data.User) *util.HttpError
}

func (s *userServiceImp) CreateUser(user data.User) *util.HttpError {

	user.DateCreated = time.Now().String()
	if user.Source == "FirstParty" {
		password, err := util.HashPassword(user.Password)
		if err != nil {
			log.Print("Failed to hash password when creating user")
			return &util.HttpError{
				StatusCode: http.StatusInternalServerError,
				Error:      fmt.Errorf("Internal Server Error"),
			}
		}
		user.Password = password
	}

	if err := user.Create(); err != nil {
		return err
	}

	return nil
}
