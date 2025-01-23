package config

import (
  "main/internal/models/jsonmodels"
  "net/http"
  "github.com/labstack/echo/v4"
)

func GetAudioSettings(c echo.Context) error {
  jsonData, err := jsonmodels.GetSettingsJson(); 
  if err != nil {
    return c.JSON(http.StatusNotAcceptable, map[string]string {
      "error": err.Error(),
    })
  }

	return c.JSON(http.StatusOK, jsonData.Audio)
}

func GetAudioVolume(c echo.Context) error {
  jsonData, err := jsonmodels.GetSettingsJson(); 
  if err != nil {
    return c.JSON(http.StatusNotAcceptable, map[string]string {
      "error": err.Error(),
    })
  }

	return c.JSON(http.StatusOK, jsonData.Audio.Volume)
}

func GetAudioCorrect(c echo.Context) error {
  jsonData, err := jsonmodels.GetSettingsJson(); 
  if err != nil {
    return c.JSON(http.StatusNotAcceptable, map[string]string {
      "error": err.Error(),
    })
  }

	return c.JSON(http.StatusOK, jsonData.Audio.Correct)
}

func GetAudioIncorrect(c echo.Context) error {
  jsonData, err := jsonmodels.GetSettingsJson(); 
  if err != nil {
    return c.JSON(http.StatusNotAcceptable, map[string]string {
      "error": err.Error(),
    })
  }

	return c.JSON(http.StatusOK, jsonData.Audio.Incorrect)
}

func GetAudioOn(c echo.Context) error {
  jsonData, err := jsonmodels.GetSettingsJson(); 
  if err != nil {
    return c.JSON(http.StatusNotAcceptable, map[string]string {
      "error": err.Error(),
    })
  }

	return c.JSON(http.StatusOK, jsonData.Audio.On)
}
