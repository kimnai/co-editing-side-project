package user

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"

	"github.com/co-editing-side-project/backend/data"
	"github.com/co-editing-side-project/backend/service"
)

func CreateUserHandler(c *gin.Context) {
	var user data.User
	if err := c.ShouldBindJSON(&user); err != nil {
		log.Print("Failed to bind json from request", c.Request.Body)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid user information",
		})
		return
	}

	if !user.CheckCreate() {
		log.Print("The attribute of user is missing", user)
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "Invalid user information",
		})
		return
	}

	if err := service.UserService.CreateUser(user); err != nil {
		log.Print("User service failed to create user")
		c.JSON(err.StatusCode, gin.H{
			"error": err.Error.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"error": "",
	})
}
