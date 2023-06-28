package user

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func PingUserHandler(c *gin.Context) {
	token_name, err := c.Cookie("refresh_token")
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "Cookie is expired",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"refresh_token": token_name,
	})
}
