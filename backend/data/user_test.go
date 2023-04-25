package data

import (
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func Test_UserCreate_Success(t *testing.T) {
	user := User{
		Email: "new@gmail.com",
	}

	err := user.Create()

	assert.Nil(t, err)
}

func Test_UserCreate_Exist(t *testing.T) {
	user := User{
		Email: "exist@gmail.com",
	}

	err := user.Create()

	assert.NotNil(t, err)
	assert.Equal(t, err.StatusCode, http.StatusConflict)
}

func Test_UserCreate_InteralError(t *testing.T) {
	user := User{
		Email: "mock_internal_error@gmail.com",
	}

	err := user.Create()

	assert.NotNil(t, err)
	assert.Equal(t, err.StatusCode, http.StatusInternalServerError)
}
