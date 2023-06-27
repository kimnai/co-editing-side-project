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
	LoginUser(data.User) (string, string, *util.HttpError)
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

func (s *userServiceImp) LoginUser(user data.User) (string, string, *util.HttpError) {
	jwtToken, err := util.GenerateJwtToken(user.UserName, user.Email)
	if err != nil {
		return "", "", &util.HttpError{
			StatusCode: http.StatusInternalServerError,
			Error:      fmt.Errorf("Failed to create JWT token"),
		}
	}

	refreshToken := util.GenerateRefreshToken()

	if err := user.Login(refreshToken); err != nil {
		return "", "", err
	}

	return jwtToken, refreshToken, nil
}
