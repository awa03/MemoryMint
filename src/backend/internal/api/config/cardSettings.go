package config

import (
  "main/internal/models/jsonmodels"
  "net/http"
  "github.com/labstack/echo/v4"
)

func GetCardSettings(c echo.Context) error {
  jsonData, err := jsonmodels.GetSettingsJson(); 
  if err != nil {
    return c.JSON(http.StatusNotAcceptable, map[string]string {
      "error": err.Error(),
    })
  }

	return c.JSON(http.StatusOK, jsonData.Cards)
}

func GetCardFont(c echo.Context) error {
  jsonData, err := jsonmodels.GetSettingsJson(); 
  if err != nil {
    return c.JSON(http.StatusNotAcceptable, map[string]string {
      "error": err.Error(),
    })
  }

	return c.JSON(http.StatusOK, jsonData.Cards.Font)
}

func GetCardOrder(c echo.Context) error {
  jsonData, err := jsonmodels.GetSettingsJson(); 
  if err != nil {
    return c.JSON(http.StatusNotAcceptable, map[string]string {
      "error": err.Error(),
    })
  }

	return c.JSON(http.StatusOK, jsonData.Cards.Order)
}

func GetCardDifficulty(c echo.Context) error {
  jsonData, err := jsonmodels.GetSettingsJson(); 
  if err != nil {
    return c.JSON(http.StatusNotAcceptable, map[string]string {
      "error": err.Error(),
    })
  }

	return c.JSON(http.StatusOK, jsonData.Cards.Difficulty)
}


