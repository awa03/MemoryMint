package api

import (
    "log"
    "net/http"
    "main/internal/api/config"
    "github.com/labstack/echo/v4"
    "github.com/labstack/echo/v4/middleware"
)

func Run() {
    e := echo.New()
    
    // e.Use(middleware.Logger())
    
    e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
        AllowOrigins: []string{"http://localhost:5173"},
        AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
        AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
    }))

    e.GET("api/settings", config.GetSettings);

    e.GET("/backendOn", func(c echo.Context) error {
        return c.JSON(http.StatusOK, map[string]string{
            "success": "Connected",
        })
    })

    log.Printf("Server starting on port 5000")
    e.Logger.Fatal(e.Start(":5000"))
}
