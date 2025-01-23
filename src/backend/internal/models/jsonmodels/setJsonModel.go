package jsonmodels
import (
	"gorm.io/gorm"
  "main/internal/models"
  "errors"
)


type SetJSON struct {
    ID          uint   `json:"id,omitempty"`
    Title       string `json:"title"`
    Description string `json:"description,omitempty"`
    Cards       []uint `json:"card_ids,omitempty"`  // Array of Card IDs
    CreatedAt   string `json:"created_at,omitempty"`
    UpdatedAt   string `json:"updated_at,omitempty"`
}

func (s *SetJSON) Verify() error {
    if s.Title == "" {
        return errors.New("set title cannot be empty")
    }
    return nil
}

func (s *SetJSON) ToDB() interface{} {
    return &models.Set{
        Model: gorm.Model{ID: s.ID},
        Title: s.Title,
        Description: s.Description,
    }
}
