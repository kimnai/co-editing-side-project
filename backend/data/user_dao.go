package data

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"

	"github.com/co-editing-side-project/backend/datastore/postgres"
	"github.com/co-editing-side-project/backend/util"
)

const (
	queryIsExist            = "SELECT email FROM user_info WHERE email=$1;"
	queryUserIdentity       = "SELECT password, source FROM user_info WHERE email=$1;"
	queryCreate             = "INSERT INTO user_info(user_name, email, password, date_created, source) VALUES ($1, $2, $3, $4, $5);"
	queryCreateRefreshToken = "UPDATE user_info SET refresh_token=$1 WHERE email=$2;"
)

func (user *User) Create() *util.HttpError {
	tx, err := postgres.Client.Begin()
	if err != nil {
		log.Print("Postgres failed to begin transaction when creating user")
		return &util.HttpError{
			StatusCode: http.StatusInternalServerError,
			Error:      fmt.Errorf("Internal Server Error"),
		}
	}
	defer tx.Rollback()

	resultRow := tx.QueryRow(queryIsExist, user.Email)
	var emailBuffer string
	if err := resultRow.Scan(&emailBuffer); err != nil {
		if err != sql.ErrNoRows {
			log.Printf("Postgres failed to query \"%s\" when creating user\n", queryIsExist)
			return &util.HttpError{
				StatusCode: http.StatusInternalServerError,
				Error:      fmt.Errorf("Internal Server Error"),
			}
		}
	} else {
		return &util.HttpError{
			StatusCode: http.StatusConflict,
			Error:      fmt.Errorf("Email already existed"),
		}
	}

	result, err := tx.Exec(queryCreate, user.UserName, user.Email, user.Password, user.DateCreated, user.Source)
	if err != nil {
		log.Printf("Postgres failed to execute %s when creating user\n", queryCreate)
		log.Print(err)
		return &util.HttpError{
			StatusCode: http.StatusInternalServerError,
			Error:      fmt.Errorf("Internal Server Error"),
		}
	}

	count, err := result.RowsAffected()
	if err != nil || count != 1 {
		log.Print("Postgres failed to check the affected rows after creating user")
		return &util.HttpError{
			StatusCode: http.StatusInternalServerError,
			Error:      fmt.Errorf("Internal Server Error"),
		}
	}

	if err := tx.Commit(); err != nil {
		log.Print("Postgres failed to commit transaction when creating user")
		return &util.HttpError{
			StatusCode: http.StatusInternalServerError,
			Error:      fmt.Errorf("Internal Server Error"),
		}
	}

	return nil
}

func (user *User) Login(refreshToken string) *util.HttpError {
	tx, err := postgres.Client.Begin()
	if err != nil {
		log.Print("Postgres failed to begin transaction when login")
		return &util.HttpError{
			StatusCode: http.StatusInternalServerError,
			Error:      fmt.Errorf("Internal Server Error"),
		}
	}
	defer tx.Rollback()

	resultRow := tx.QueryRow(queryUserIdentity, user.Email)
	var userIdentity User
	if err := resultRow.Scan(&userIdentity.Password, &userIdentity.Source); err != nil {
		if err != sql.ErrNoRows {
			log.Printf("Postgres failed to query \"%s\" when login\n", queryUserIdentity)
			return &util.HttpError{
				StatusCode: http.StatusInternalServerError,
				Error:      fmt.Errorf("Internal Server Error"),
			}
		}
		log.Printf("Failed to login because the email is not found")
		return &util.HttpError{
			StatusCode: http.StatusUnauthorized,
			Error:      fmt.Errorf("Unauthorized"),
		}
	}

	if user.Source != userIdentity.Source {
		log.Printf("Failed to login because the source is different")
		return &util.HttpError{
			StatusCode: http.StatusConflict,
			Error:      fmt.Errorf("Conflict due to different source"),
		}
	}

	if user.Source == "FirstParty" {
		if err := util.CheckPassword(user.Password, userIdentity.Password); err != nil {
			log.Printf("Failed to login because the password is incorrect")
			return &util.HttpError{
				StatusCode: http.StatusUnauthorized,
				Error:      fmt.Errorf("Unauthorized"),
			}
		}
	}

	result, err := tx.Exec(queryCreateRefreshToken, refreshToken, user.Email)
	if err != nil {
		log.Printf("Postgres failed to execute %s when login \n", queryCreateRefreshToken)
		log.Print(err)
		return &util.HttpError{
			StatusCode: http.StatusInternalServerError,
			Error:      fmt.Errorf("Internal Server Error"),
		}
	}

	count, err := result.RowsAffected()
	if err != nil || count != 1 {
		log.Print("Postgres failed to check the affected rows after creating user")
		return &util.HttpError{
			StatusCode: http.StatusInternalServerError,
			Error:      fmt.Errorf("Internal Server Error"),
		}
	}

	if err := tx.Commit(); err != nil {
		log.Print("Postgres failed to commit transaction when creating user")
		return &util.HttpError{
			StatusCode: http.StatusInternalServerError,
			Error:      fmt.Errorf("Internal Server Error"),
		}
	}

	return nil
}
