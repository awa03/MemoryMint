package json

import (
  "errors"
	"gorm.io/gorm"
  "main/internal/models"
)

type DBModel interface {
    Verify() error
    ToDB() interface{}
}

type ClassJSON struct {
    ID          uint   `json:"id,omitempty"`
    Name        string `json:"name"`
    Description string `json:"description,omitempty"`
    Sets        []uint `json:"set_ids,omitempty"`  // Array of Set IDs
    CreatedAt   string `json:"created_at,omitempty"`
    UpdatedAt   string `json:"updated_at,omitempty"`
}

func (c *ClassJSON) Verify() error {
    if c.Name == "" {
        return errors.New("class name cannot be empty")
    }
    return nil
}

func (c *ClassJSON) ToDB() interface{} {
    return &models.Class{
        Model: gorm.Model{ID: c.ID},
        Name: c.Name,
        Description: c.Description,
    }
}
