package models

import (
	"gorm.io/gorm"
)


type Set struct {
  gorm.Model  
  Title       string  `gorm:"not null"`
  Description string
  Cards       []Card  `gorm:"foreignKey:SetID"`
}
