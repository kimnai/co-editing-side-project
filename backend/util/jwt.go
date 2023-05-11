package util

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
)

var secretToken = []byte("TODO_put_this_to_a_safe_path")

func GenerateJwtToken(userName, userEmail string) (string, error) {
	expirationTime := time.Now().Add(15 * time.Minute).Unix()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": userName,
		"email":    userEmail,
		"exp":      expirationTime,
	})

	tokenString, err := token.SignedString(secretToken)
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func AuthenticateToken(tokenString string) error {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Invalid signing method")
		}
		return secretToken, nil
	})
	if err != nil || !token.Valid {
		return fmt.Errorf("Unauthorized token")
	}
	fmt.Print(token)
	return nil
}

func GenerateRefreshToken() string {
	b := make([]byte, 24)
	if _, err := rand.Read(b); err != nil {
		panic(err)
	}
	return base64.URLEncoding.EncodeToString(b)
}
