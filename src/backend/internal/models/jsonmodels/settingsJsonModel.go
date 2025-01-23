package jsonmodels
import (
	"encoding/json"
	"errors"
	"fmt"
	"os"
)

type SettingsJSON struct {
  User            UserSettingsJSON      `json:"user"`
  Cards            CardSettingsJSON      `json:"cards"`
  Animations       AnimationSettingsJSON `json:"animations"`
  Audio           AudioSettingsJSON     `json:"audio"`
}

type UserSettingsJSON struct {
  ColorScheme     string  `json:"colorscheme"`
  Font            string  `json:"font"`
  Notifications   bool    `json:"notifications"`
}

type CardSettingsJSON struct {
  Order           string  `json:"order"`
  Font            string  `json:"font"`
  Difficulty      string  `json:"difficulty"`
}

type AnimationSettingsJSON struct {
  Show            bool    `json:"show"`
  Speed           int     `json:"speed"`
}

type AudioSettingsJSON struct {
  On              bool    `json:"on"`      // is volume on
  Volume          int     `json:"volume"`  // Volume level
  Correct         string  `json:"correct"` // Sound file path
  Incorrect       string  `json:"incorrect"` // Sound file path
}


func GetSettingsJson() (*SettingsJSON, error) {
	fileContent, err := os.ReadFile("./config/settings.json")
	if err != nil {
		return nil, fmt.Errorf("failed to read file: %w", err)
	}

	var jsonData SettingsJSON
	if err := json.Unmarshal(fileContent, &jsonData); err != nil {
		return nil, errors.New("failed to parse JSON")
	}

	return &jsonData, nil
}

