package api

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func Run() {
	e := echo.New()

	e.GET("/backendOn", func(c echo.Context) error {
		return c.String(http.StatusOK, "Yep Im On")
	})

	e.Logger.Fatal(e.Start(":5000"))
}
