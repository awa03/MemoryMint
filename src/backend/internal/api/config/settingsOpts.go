package config

import (
  "encoding/json"
  "main/internal/models/jsonmodels"
  "net/http"
  "os"
  "github.com/labstack/echo/v4"
)

func GetSettings(c echo.Context) error {
  jsonData, err := jsonmodels.GetSettingsJson(); 
  if err != nil {
    return c.JSON(http.StatusNotAcceptable, map[string]string {
      "error": err.Error(),
    })
  }

  return c.JSON(http.StatusOK, jsonData)
}

func SetSetting(c echo.Context) error {
  var jsonData jsonmodels.SettingsJSON 
  if err := c.Bind(&jsonData); err != nil {
    return c.JSON(http.StatusNotAcceptable, map[string]string {
      "error": "Invalid JSON Binding",
    })
  }

  data, err := json.MarshalIndent(jsonData, "", "\t")
  if err != nil {
    return c.JSON(http.StatusInternalServerError, map[string]string {
      "error": "Failed to Indent JSON Data",
    })
  }

  err = os.WriteFile("./config/settings.json", data, 0644)
  if err != nil {
    return c.JSON(http.StatusInternalServerError, map[string]string {
      "error": "Failed to Write to File",
    })
  }

  return c.JSON(http.StatusOK, map[string]string {
    "success": "Data Written Successfully",
  })
}

