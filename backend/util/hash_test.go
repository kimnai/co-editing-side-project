package util

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_Hash_Success(t *testing.T) {
	password := "fakePassword"
	hashedPassword, err := HashPassword(password)
	assert.Equal(t, err, nil, "The error should be nil")

	err = checkPassword(password, hashedPassword)
	assert.Equal(t, err, nil, "The error should be nil")
}

func Test_Hash_Failure(t *testing.T) {
	password := ""
	_, err := HashPassword(password)
	assert.NotEqual(t, err, nil, "The error should not be nil")
}
