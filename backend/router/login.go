package router

import "github.com/gin-gonic/gin"

func loginHandler(c *gin.Context) {
	var loginRequest loginRequest
	if err := c.ShouldBindJSON()
}