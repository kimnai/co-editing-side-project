package main

import (
	"net/http"

	"github.com/co-editing-side-project/backend/datastore/postgres"
	"github.com/co-editing-side-project/backend/router/user"

	"github.com/gin-gonic/gin"
)

var (
	router = gin.Default()
)

func mapUrls() {

	router.GET("/ping", func(c *gin.Context) {
		c.String(http.StatusOK, "pong")
	})

	router.GET("/test/database-connection", func(c *gin.Context) {
		currentDate, err := postgres.GetToday()
		if err != nil {
			c.String(http.StatusBadRequest, "Database error")
		} else {
			c.String(http.StatusOK, currentDate)
		}
	})

	router.POST("/user/create", user.CreateUserHandler)
}

func main() {
	mapUrls()

	router.Run(":8080")
}
