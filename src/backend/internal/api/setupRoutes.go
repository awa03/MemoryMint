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
    
    e.Use(middleware.Logger())
    
    e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
        AllowOrigins: []string{"http://localhost:5173"},
        AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
        AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
    }))


    e.GET("/backendOn", func(c echo.Context) error {
        return c.JSON(http.StatusOK, map[string]string{
            "success": "Connected",
        })
    })

    e.GET("/api/settings", config.GetSettings);

    e.GET("/api/settings/users", config.GetUserSettings);
    e.GET("/api/settings/users/font", config.GetUserFont);
    e.GET("/api/settings/users/colorscheme", config.GetUserColorScheme);
    e.GET("/api/settings/users/notifications", config.GetUserNotifications);

    e.GET("/api/settings/animations", config.GetAnimationsSettings);
    e.GET("/api/settings/animations/show", config.GetAnimationsShow);
    e.GET("/api/settings/animations/speed", config.GetAnimationsSpeed);

    e.GET("/api/settings/audio", config.GetAudioSettings);
    e.GET("/api/settings/audio/on", config.GetAudioOn);
    e.GET("/api/settings/audio/correct", config.GetAudioCorrect);
    e.GET("/api/settings/audio/incorrect", config.GetAudioIncorrect);

    e.GET("/api/settings/cards", config.GetCardSettings);
    e.GET("/api/settings/cards/on", config.GetCardFont);
    e.GET("/api/settings/cards/correct", config.GetCardOrder);
    e.GET("/api/settings/cards/incorrect", config.GetCardDifficulty);

    e.PUT("/api/settings", config.SetSetting);

    log.Printf("Server starting on port 5000")
    e.Logger.Fatal(e.Start(":5000"))
}
