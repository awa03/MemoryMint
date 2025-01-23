package config

import (
	"main/internal/models/jsonmodels"
	"net/http"

	"github.com/labstack/echo/v4"
)

func GetAnimationsSettings(c echo.Context) error {
  jsonData, err := jsonmodels.GetSettingsJson(); 
  if err != nil {
    return c.JSON(http.StatusNotAcceptable, map[string]string {
      "error": err.Error(),
    })
  }

	return c.JSON(http.StatusOK, jsonData.Animations)
}

func GetAnimationsShow(c echo.Context) error {
  jsonData, err := jsonmodels.GetSettingsJson(); 
  if err != nil {
    return c.JSON(http.StatusNotAcceptable, map[string]string {
      "error": err.Error(),
    })
  }

	return c.JSON(http.StatusOK, jsonData.Animations.Show)
}

func GetAnimationsSpeed(c echo.Context) error {
  jsonData, err := jsonmodels.GetSettingsJson(); 
  if err != nil {
    return c.JSON(http.StatusNotAcceptable, map[string]string {
      "error": err.Error(),
    })
  }

	return c.JSON(http.StatusOK, jsonData.Animations.Speed)
}
