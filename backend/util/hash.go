package util

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func HashPassword(password string) (string, error) {
	if password == "" {
		return "", fmt.Errorf("The password should not be nil")
	}
	passwordBinary := []byte(password)
	hashedPasswordBinary, err := bcrypt.GenerateFromPassword(passwordBinary, bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPasswordBinary), nil
}

func checkPassword(password, hashedPassword string) error {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err
}
