package user

import (
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"

	"github.com/co-editing-side-project/backend/data"
)

func CreateUserHandler(c *gin.Context) {
	var user data.User
	if err := c.ShouldBindJSON(&user); err != nil {
		log.Print(c.Request.Body)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid user information",
		})
		return
	}

	user.DateCreated = time.Now().String()
	user.SourceType = "FirstParty"

	if err := user.Create(); err != nil {
		log.Print(err.Error.Error())
		c.JSON(err.StatusCode, gin.H{
			"error": err.Error.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"error": "",
	})
}
