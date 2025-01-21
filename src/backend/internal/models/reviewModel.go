package models

import (
  "gorm.io/gorm"
  "time"
)

type SetReview struct {
    gorm.Model
    SetID     uint       `gorm:"not null"`
    Set      Set         `gorm:"foreignKey:SetID"`
    Score     int        `gorm:"not null"` 
    Duration  int       
    ReviewedAt time.Time
}
