package config

import (
  "main/internal/models/jsonmodels"
  "net/http"
  "github.com/labstack/echo/v4"
)

func GetUserSettings(c echo.Context) error {
  jsonData, err := jsonmodels.GetSettingsJson(); 
  if err != nil {
    return c.JSON(http.StatusNotAcceptable, map[string]string {
      "error": err.Error(),
    })
  }

	return c.JSON(http.StatusOK, jsonData.User)
}

func GetUserFont(c echo.Context) error {
  jsonData, err := jsonmodels.GetSettingsJson(); 
  if err != nil {
    return c.JSON(http.StatusNotAcceptable, map[string]string {
      "error": err.Error(),
    })
  }

	return c.JSON(http.StatusOK, jsonData.User.Font)
}

func GetUserColorScheme(c echo.Context) error {
  jsonData, err := jsonmodels.GetSettingsJson(); 
  if err != nil {
    return c.JSON(http.StatusNotAcceptable, map[string]string {
      "error": err.Error(),
    })
  }

	return c.JSON(http.StatusOK, jsonData.User.ColorScheme)
}

func GetUserNotifications(c echo.Context) error {
  jsonData, err := jsonmodels.GetSettingsJson(); 
  if err != nil {
    return c.JSON(http.StatusNotAcceptable, map[string]string {
      "error": err.Error(),
    })
  }

	return c.JSON(http.StatusOK, jsonData.User.Notifications)
}
